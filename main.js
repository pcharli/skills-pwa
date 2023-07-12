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