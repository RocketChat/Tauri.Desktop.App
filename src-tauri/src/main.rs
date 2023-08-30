use std::env;
use std::fs;
use tauri::generate_handler;
use tauri::Manager;
use tauri::Menu;
use tauri::MenuItem;
use tauri::Submenu;
// use notify_rust::Notification;
use tauri::api::notification::Notification;
use tauri::{
    CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, TitleBarStyle, WindowBuilder,
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
fn change_default_server(app: tauri::AppHandle, default_server: String) {
    let window = app.get_window("core").unwrap();
    window
        .eval(&format!("window.location.replace('{}')", default_server))
        .unwrap();
}

#[tauri::command]
fn send_notification(notification_data: serde_json::Value) {
    let title = notification_data["title"].as_str().unwrap();
    let body = notification_data["body"].as_str().unwrap();
    // let tag = notification_data["tag"].as_str().unwrap();
    // let data = notification_data["data"].as_str().unwrap();
    println!(
        "Notificatin Recieved with title {} and body {}",
        title.to_string(),
        body.to_string()
    );

    let notification: Notification = Notification::new("com.rocket.chat.tauri.dev")
        .title(title.to_string())
        .body(body.to_string());

    let result = notification.show().map_err(|e| e.to_string());

    match result {
        Ok(()) => println!("Ok, Notification Shown"),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    // setting up the tray menu
    let quit_item = CustomMenuItem::new("quit", "Quit");
    let hide_item = CustomMenuItem::new("hide", "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit_item)
        .add_item(hide_item);

    // setting up the main menu
    let preferences_menu_item = CustomMenuItem::new("preferences".to_string(), "Preferences");
    let main_menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(preferences_menu_item);

    let app = tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .menu(Menu::new().add_submenu(Submenu::new("Main", main_menu)))
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
        })
        .plugin(tauri_plugin_store::Builder::default().build())
        // .setup(|app| {
        //     Ok({
        //         StoreBuilder::new(app.handle(), "../../store.bin".parse()?).build();
        //         let stores = app.state::<StoreCollection<Wry>>();
        //         let path = PathBuf::from("../../.store.dat");

        //         with_store(app.handle(), stores, path, |store| {
        //             store.insert("a".to_string(), json!("b"));
        //             store.save()
        //         }).unwrap()
                
        //     })
        // })
        .on_menu_event(|event| match event.menu_item_id() {
            "preferences" => {
                let app_handle = event.window().app_handle();
                tauri::WindowBuilder::new(
                    &app_handle,
                    "preferences_window",
                    tauri::WindowUrl::External(
                        format!("http://localhost:1420/settings").parse().unwrap(),
                    ),
                )
                .inner_size(f64::from(600), f64::from(300))
                .resizable(false)
                .transparent(true)
                .decorations(false)
                .build()
                .expect("Preferences window error");
            }
            _ => {}
        })
        .invoke_handler(generate_handler![send_notification, change_default_server])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    let script = read_script();

    WindowBuilder::new(&app, "core", tauri::WindowUrl::External(format!("https://open.rocket.chat").parse().unwrap()))
            .user_agent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15").title_bar_style(TitleBarStyle::Visible).title("Rocket.Chat Tauri").inner_size(800 as f64, 600 as f64).initialization_script(script).build().expect("Not able to launch main window.");

    app.run(|_app_handle, _event| {});
}
