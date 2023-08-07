# Tauri.Desktop.App
This project proposes to explore the potential of Tauri as an alternative for Electron in the Rocket.Chat Desktop App. However, Tauri is currently not mature enough to be used as a replacement for Electron. Therefore, this project aims to test the current capabilities of Tauri by comparing it to the existing Electron- based app and analyzing its limitations, by implementing the same functionalities as that of the electron app and also some of the functionalities that we couldn’t approach in the electron app but with the support of Rust is possible with the Tauri Application.

The project will involve building a prototype of the Rocket.Chat Desktop App using Tauri, implementing all the current features that the Rocket.Chat Desktop App currently has such as notifications, download manager, auto updater, settings manager, trayicon etc and comparing its performance to that of the Electron- based app. The project team will also analyze the current limitations of Tauri and identify areas where improvements can be made.

## Goals
During the Google Summer of Code Period, My Primary Focus would be on the following goals
1. Testing Tauri’s Cross Platform Download Functionality by Implementing the Download Manager View same as Rocket.Chat Electron.
2. Implementing notifications for incomming messages, download completions update notification & mentions testing out Tauri’s Event System and Notifications.
3. Implementing Settings Panel and analyse if all the setting can be implemented or not, that are provided in the Rocket.Chat Electron App.
4. ( Extra ) Launching and Handling Video Chat Windows for various Call States ( Picked Up, Hang Up, New Call )
5. Testing out Tauri’s Tray Icons
( Extra ) Testing out if we can come up with a menu-bar app, that can render a chat’s UI and can be used as a hovering window for Mac, along with showing basic information such as number of unreads and unreads from whom.
6. Evaluate the performance of the app, including its speed, memory usage, and stability.
7. Identify any areas where Tauri outperforms ElectronJS and leverage them to improve the user
experience.
8. Distributing the app for MacOS.

# Dependencies
```
yarn
node.js 16 or above
rust and cargo
```
For installing rust follow the following [documentation](https://www.rust-lang.org/tools/install)

## Running the Project
### Installing Dependencies
```
yarn
```
### Running the Project
```
yarn run tauri dev
```
if you ran into any issue, try running ``yarn run tauri build``

