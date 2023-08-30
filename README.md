# Next Generation Desktop Apps Using Tauri

Mentored By Jean Brito & David Allen

<img width="1237" alt="Untitled" src="https://github.com/RocketChat/Tauri.Desktop.App/assets/72302948/16f7ba84-090b-4434-9772-d72bf25654c5">

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

# Google Summer of Code' 23 Synopsis

![GSoC-Horizontal](https://github.com/RocketChat/Tauri.Desktop.App/assets/72302948/3d90bd2e-9e42-45ca-ac6d-132241ebc1f8)


## GSOC'23 Demo Day Video

<a href="https://youtu.be/ZXy7zwdcl_s?si=vTeftX-rxjQxRc1M"><img width="1574" alt="image" src="https://github.com/RocketChat/Tauri.Desktop.App/assets/72302948/d8efa1ec-29bc-4683-8072-c089d694862b"></a>

## Project’s Aim 🎯

This project proposes to **explore the potential of Tauri as an alternative for Electron in the [Rocket.Chat](http://Rocket.Chat) Desktop App**. However, **Tauri is currently not mature enough** to be used as a replacement for Electron. Therefore, this project aims to **test the current capabilities of Tauri** by comparing it to the existing Electron-based app and **analyzing its limitations, by implementing the same functionalities** as that of the electron app and also some of the functionalities that we couldn’t approach in the electron app but with the support of Rust is possible with the Tauri Application.

The project will involve building a prototype of the Rocket.Chat Desktop App using Tauri, implementing all the current features that the Rocket.Chat Desktop App currently has such as **notifications, download manager, auto updater, settings manager, trayicon etc and comparing its performance** to that of the Electron-based app. The project team will also analyze the current limitations of Tauri and identify areas where improvements can be made.

By exploring the use of Tauri for building the Rocket.Chat Desktop App, the community would have the opportunity to **evaluate the benefits of this framework** as an alternative to Electron. Tauri aims to offer similar feature as that of electron and by the means of this project, the community can enjoy the benefit of **testing the stability of tauri’s offerings**.

Rust is designed to prevent common programming errors such as buffer overflows, null pointer dereferences, and data races, which can lead to security vulnerabilities.

## The Goals 🏃🏼

### **Integration and Management of Rocket.Chat Server Windows:**

Implementing and managing multiple server window and provide extensive UI for adding new Servers, along with that taking care of events happening in each server and channel them to Tauri Backend for
taking actions against those events.

### **Feature for Notification Management with Tauri Framework:**

Handling Events from each server and channeling those events to Rust Backend, sharing notifications to the User’s OS with Rust, with custom action buttons for reply and viewing notifications.

### **Feature for a dedicated Download Manager for Managing User Downloads:**

Providing a dedicated download manager in the sidebar, so that user can browse through all of his download, with all the edge cases handled and better management of Download States.

### **Feature for a Settings Panel for the Desktop App:**

Providing a settings panel for managing necessary user preferences such as Automatic Error/Bug Reporting, for various platforms, Toggle for sidebar, providing we work on multi-server project. Toggles for TrayIcon, Hardware Accelaration and Dock Bounce, Toggle for handling video conferencing windows.

### **Providing detailed Performance Analysis and Work on Effienciency:**

Analysing every implemented feature for Tauri and Providing with an analysis of electron’s performance & build sizes and tauri’s performance & build sizes ( though the app is just rendering a webview but as a test project, an analysis could be handy to compare for future implementations )

## Implemented Features 🦋

### Webview Window:

Because of the absence of the Browser View from Electron, we had to make a decision of loading [Rocket.Chat](http://Rocket.Chat) in a Webview Window, the webview is responsible for both of the webview windows that we are loading right now, one is the webview window that loads up the main app and there is a second window that loads up the settings panel, which is responsible for modifying the app preferences.

When we first started with the webview window the main problem that we were encountering was related to Tauri’s Scope Definition, which didn’t allowed any external website or url to load up in the app. Even if the [Rocket.Chat](http://Rocket.Chat) app loads up, it used to stuck at the loading indicator and didn’t use to move forward, which was corrected by adding a user-agent to chrome, which is completely platform dependent.

### Inter-Process Communication

Another brickwall was related to inter-process communication, as we were loading an external website in our tauri app, how do we enable bidirectional communication between the two processes running. We could communicate from the rust process to the tauri process, but how can we communicate from the [Rocket.Chat](http://Rocket.Chat) App to the Tauri App, which is made for several different platforms and have to serve several different environments except tauri. The solution was Tauri’s Global Support, for inter-process-communications for things like web browsers. Global Tauri is a property that associates with the window object of the main app and with that you can invoke messages or trigger commands from the browser itself.

### Message Notifications and Code Injection

Notifications took a lots of time for us to figure out, this is how the plan of action looked like, 

1. **Intercepting the Notification Requests** - The foremost part was to intercept the notifications, after a good amount of research, I figured out that [Rocket.Chat](http://Rocket.Chat) Triggers a notification event for browsers like safari and chrome, which intercept that request and show the notification, which often is not use and is visible to us.
2. **Passing on the notifications to the Global Tauri Object** - We intercepting notifications done, I need to pass the notification data which would be the room and the message to the rust backend and for that I need to be Global Tauri Object, for such a purpose, I came up with a solution, introducing injection script, that gets inside the browser, listen to the notifcations request and respond to them, passing the notification data to global tauri object, widow.__Tauri__.
3. **Communicate the Notification to Rust Backend and Display the Notification** - The last task would be listening to the tauri commands and performing the action of sharing the notiication. Tauri provides internal apis to show notifications, but those can also be done with the help of packages like notify-rust.

### Intercepting Download Events

One of the limitations of Tauri is its current inability to intercept all types of download events. This is primarily due to the fact that Tauri has to manage all types of web engines, including WebKit, Chromium, and WebView 2.0, making it a complex task that requires significant development effort. The team is exploring different approaches to enhance Tauri's ability to intercept download events, including integrating with existing download managers or developing a custom download manager that works seamlessly with Tauri. 

Another major issue was, tauri itself injects js code for handling events on it’s own, one of the event’s was related to the shell apis, which used to open up, safari downloads when a new download triggers up and intercepting those was the major challenge that I was facing while working on the downloads process. 

The key solution to that was to remove all the listeners from the a tag, and defining custom triggers for the downloads, which detects the referenced link in the a tag which needs to be checked for the Initials.

### Settings Panel and Persistence

The settings panel, is the primary hub for controlling the application settings, which provides necessary preferences about allowing notifications and adding new servers into the list, you can add new servers and change the default server for the current app to load up. When the app loads up, the rust process takes up the stored preferences and load the default server that has been saved from the preferences panel. There were several options for storing the preferences such as tauri-sql and sqlite, but those are not shared by the processes at the same time, which was the major issue, that’s why I decided to move on with the tauri-plugin-report.

### Tray Icon and Controls

Tray Icon provides two options for hiding and quiting the app, which has been listened by the app’s context and actions are performed on that basis.

## Conclusion

The project aimed to explore the potential of Tauri as an alternative to Electron for the Rocket.Chat Desktop App. Despite Tauri's current limitations, the project successfully built a prototype of the Rocket.Chat Desktop App using Tauri, implementing all the current features of the Electron-based app. This allowed for a direct comparison of performance and functionality between the two frameworks.

The project also identified areas where Tauri could be improved, such as its ability to intercept all types of download events. Despite these challenges, the project team was able to develop workarounds and solutions, demonstrating the flexibility and potential of Tauri.

The project also provided the community with a valuable opportunity to evaluate Tauri's benefits as an alternative to Electron. By implementing the same functionalities as the Electron app, the project was able to test the stability of Tauri's offerings.

In conclusion, while Tauri is not yet mature enough to replace Electron, this project has demonstrated its potential and identified areas for improvement. The project has also provided valuable insights into the use of Rust in the development of desktop applications, highlighting its ability to prevent common programming errors and potential security vulnerabilities. The project team looks forward to further developments in Tauri and its potential use in future projects.
