use std::env;
use std::fs;
use tauri::Manager;
use tauri::generate_handler;
// use notify_rust::Notification;
use tauri::api::notification::Notification;
use tauri::{
    CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, TitleBarStyle,
    WindowBuilder
};

fn read_script() -> &'static str {
    let mut project_dir = env::current_dir().expect("Failed to get current directory");

    project_dir.pop();

    let file_path = project_dir.join("src/injected/main.js");

    let contents = fs::read_to_string(file_path).expect(
        "No Injected File Found, please run `yarn preload` to generate the preload script.",
    );

    Box::leak(contents.into_boxed_str())
}

#[tauri::command]
fn send_notification(notification_data: serde_json::Value) {
    let title = notification_data["title"].as_str().unwrap();
    let body = notification_data["body"].as_str().unwrap();
    // let tag = notification_data["tag"].as_str().unwrap();
    // let data = notification_data["data"].as_str().unwrap();
    println!("Notificatin Recieved with title {} and body {}", title.to_string(), body.to_string());

    let notification: Notification = Notification::new("com.rocket.chat.tauri.dev").title(title.to_string()).body(body.to_string());

    let result = notification.show().map_err(|e| e.to_string());

match result {
    Ok(()) => println!("Ok, Notification Shown"),
    Err(e) => println!("Error: {}", e),
}
}   

fn main() {
    let quit_item = CustomMenuItem::new("quit", "Quit");
    let hide_item = CustomMenuItem::new("hide", "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit_item)
        .add_item(hide_item);

    let app = tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let main_window = app.get_window("main").unwrap();
                    main_window.hide().unwrap();
                }
                _ => {}
            },
            _ => {}
        }).invoke_handler(generate_handler![send_notification])
        .setup(|app| {
    
            let script = read_script();

            WindowBuilder::new(app, "core", tauri::WindowUrl::External(format!("https://open.rocket.chat").parse().unwrap()))
            .user_agent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15").title_bar_style(TitleBarStyle::Visible).title("Rocket.Chat Tauri").inner_size(800 as f64, 600 as f64).initialization_script(script).build()?;

            Ok(())
            
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

        app.run(|_app_handle, _event| {});
    
}
