//! if ("serviceWorker" in navigator)

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("./service-worker.js");
}