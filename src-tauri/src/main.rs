use std::env;
use std::fs;
use tauri::Manager;
use tauri::{
    CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, TitleBarStyle,
    WindowBuilder,
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

fn main() {
    let quit_item = CustomMenuItem::new("quit", "Quit");
    let hide_item = CustomMenuItem::new("hide", "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit_item)
        .add_item(hide_item);

    tauri::Builder::default()
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
        })
        .setup(|app| {
            let script = read_script();

            WindowBuilder::new(app, "core", tauri::WindowUrl::External(format!("https://open.rocket.chat").parse().unwrap()))
            .user_agent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36").title_bar_style(TitleBarStyle::Overlay).title("Rocket.Chat Tauri").inner_size(800 as f64, 600 as f64).initialization_script(script).build()?;

            Ok(())
            
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    
}
