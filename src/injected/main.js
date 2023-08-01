// Listen for the 'notification' event
const sendNotification = (notificationObj) => {
  const notificationData = { title: notificationObj.title, body: notificationObj.text}
  window.__TAURI__.invoke('send_notification', { notificationData }).then((message) => console.log(message)).catch((e) => console.log("Error Occured", e));
}


self.addEventListener('notification', (event) => {
  event.preventDefault();
  window.__TAURI__.notification.isPermissionGranted().then((isPermissionGranted) => {
    console.log("Notification Permission", isPermissionGranted)
    if (isPermissionGranted === false) {
      window.__TAURI__.notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
          return;
        }
        sendNotification(event.detail.notification)
      });
    } else {
      sendNotification(event.detail.notification)
    }
  })
});