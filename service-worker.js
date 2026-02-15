self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("jft-cache").then(cache =>
      cache.addAll(["/","index.html"])
    )
  );
});
