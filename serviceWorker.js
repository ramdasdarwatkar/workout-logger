const myApp = "workout-logger-site-v1"
const assets = [
  "/",
  "/index.html",
  "style.css",
  "app.js",
  "icons/cable-fly.png",
  "icons/deadlift.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(myApp).then(cache => {
      cache.addAll(assets)
    })
  )
})