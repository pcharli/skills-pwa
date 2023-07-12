if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js", {
        scope: "./",
      })
      .then((registration) => {
        let serviceWorker;
        if (registration.installing) {
          serviceWorker = registration.installing;
          console.log("installing");
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
          console.log("waiting");
        } else if (registration.active) {
          serviceWorker = registration.active;
          console.log("active");
        }
        if (serviceWorker) {
          // logState(serviceWorker.state);
          serviceWorker.addEventListener("statechange", (e) => {
            // logState(e.target.state);
          });
        }
      })
      .catch((error) => {
        // Something went wrong during registration. The service-worker.js file
        // might be unavailable or contain a syntax error.
      });
  } else {
    // The current browser doesn't support service workers.
    // Perhaps it is too old or we are not in a Secure Context.
  }


  //add notifications
  function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else  {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

  if (Notification.permission !== "granted") {
    if (confirm('Recevoir notifications ?')) {
      notifyMe()
    }
  }
  