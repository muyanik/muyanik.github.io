'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "a3533b1de968eeeccedec790c4a2cb67",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/images/clear-textures-icon.png": "3d25a320a58c7eb8b08a2c4fa93ec6e9",
"assets/images/dirty-floor-tiles%2520-%2520Kopya.png": "e1ff84da24cd0c09aee9aebcde941e02",
"assets/images/dirty-floor-tiles.png": "58ac1fcd6cd526f368f8958f86bb7bd1",
"assets/images/dirty-floor-tiles.svg": "f141634b024e12e0460c9893aa915fb7",
"assets/images/door_open.png": "2540010e130814ea0a1744477d2726ac",
"assets/images/floors-default-icon.png": "9057f50c80a269f3dd0f699664cc7a76",
"assets/images/floor_I.png": "7e567f6bb76ff987e353cad3727b48bc",
"assets/images/floor_L.png": "eb432b5a77e274950d2153d68bc54387",
"assets/images/floor_O.png": "277e87b1ce41cccaa56cc63ccfb67821",
"assets/images/floor_T.png": "eedd96ef8cc9becddb8c5cace7338d13",
"assets/images/floor_U.png": "818abcd5a1d5c8402645e0aff616e097",
"assets/images/hexagon-floor-tiles.png": "e6e7240a0998c602e239b254ad438c58",
"assets/images/icon_90_degree.png": "3338fe960a9c5b8a26a1dd59a8ef108e",
"assets/images/icon_circle_blue.png": "14db54d06a7baddf8ffa40bd9c08b3d9",
"assets/images/icon_circle_purple.png": "c60d8996cd95d4b5cda96b84cd48f91b",
"assets/images/icon_drag_free.png": "288bd4ce0456856cc986712e09af5be8",
"assets/images/icon_drag_freee.png": "b3fa6a7ebfd214d08e86ffa85943c19a",
"assets/images/icon_resize.png": "7ff3586a364458a6b6de700d58e3adf9",
"assets/images/icon_rotate.png": "a6c10f7864b6645cf1cf4109636dc3aa",
"assets/images/layout%2520-%2520Kopya.png": "1b8dcc64bf5f5066872b1a85d8ff20fa",
"assets/images/layout.png": "5493b77e8742553f9bed2d9feddfc982",
"assets/images/pentagon_tabview.png": "2aa834dcf51ccf3688a92e33a875fc05",
"assets/images/pub_chair.png": "4752fbaf837ea5bba74fc3b61a75f625",
"assets/images/pub_chair2.jpg": "e46378a6e2f74478702eea1aa52915de",
"assets/images/pub_table.png": "911722aab020dafca5773fc640a1ae79",
"assets/images/pub_table1.png": "170b587a3b514649fa2696090a9235e5",
"assets/images/rectangle_tabview.png": "057677be7bf3979e984e4407ee4c03c1",
"assets/images/rotate_double_arrow.png": "2194fafce9fb58341c15cac0d562e4ca",
"assets/images/square_tabview.png": "e769884aac2c046e4be6a1e37a223e40",
"assets/images/table.png": "1b464fe2c7756dbe909fb38be365a466",
"assets/images/table2.png": "3a1feb8016f9e30625cc21bc58e6c481",
"assets/images/table3.png": "a2f45e84beeb93eeb7f914d3ec175fc6",
"assets/images/table4.png": "c92f956b87d160a81033a9a71a76b929",
"assets/images/table5.png": "a1d88099788286750739d2b1aac12a4d",
"assets/images/table6.png": "6f90aabd56f23dafced5753b599ad061",
"assets/images/table6X.png": "2d414c1fcb5ebab48964c3c202d00e53",
"assets/images/trapezoid_tabview.png": "40443472df05a374397284636569d031",
"assets/images/wall_texture.png": "5ba1854ba7e1cc5f3a276f86871ac18f",
"assets/NOTICES": "d8a344c88ef696b42701b743078ad126",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "0e5f644d850199fdca26deb1a1a87fa9",
"/": "0e5f644d850199fdca26deb1a1a87fa9",
"main.dart.js": "8149ee6e4294c9afd97f1d879d5e57c6",
"manifest.json": "37f26fd7bdf757c7370ef9aa60029a1b",
"version.json": "f6bfcdb023a81b7e402b51ac1497c941"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
