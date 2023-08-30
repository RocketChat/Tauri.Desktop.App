// Listen for the 'notification' event
const sendNotification = (notificationObj) => {
  const notificationData = { title: notificationObj.title, body: notificationObj.text}
  window.__TAURI__.invoke('send_notification', { notificationData }).then((message) => console.log(message)).catch((e) => console.log("Error Occured", e));
}


self.addEventListener('notification', (event) => {
  event.preventDefault();
  window.__TAURI__.notification.isPermissionGranted().then((isPermissionGranted) => {
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

window.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementsByTagName("a"); // replace with actual button id

  console.log("DOWNLAOD BUTTON FOUND")
  console.log(downloadButton)

  if (downloadButton) {
    downloadButton.addEventListener('click', (event) => {
      // Prevent default behavior
      event.preventDefault();

      // Get download URL
      const url = event.target.href;

      // Send download URL to Rust side
      __TAURI__.invoke('download_file', { url });
    });
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  document.querySelector("body").addEventListener("click", (event) => {
    event.preventDefault();
    console.log("CLICK REGISTERED")
    var target = e.target;
    while(target !== null){
      if (target.matches('a')){
        console.log("Hellonbgjsngs")
      }
    }
  })
})

