import { registerApplication, start } from "single-spa"

declare global {
  interface Window {
    local: boolean
  }
}

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

// registerApplication({
//   name: "@zuri/zuri-music-plugin",
//   app: () => System.import("http://localhost:8080/zuri-music-plugin.js"),
//   activeWhen: ["/"],
// });

// change argument to dev for development and back to prod before you push
customRegister(window.local ? "dev" : "prod")

function customRegister(env: "dev" | "prod") {
  console.log("env check:", { local: window.local, env })

  if (env === "dev") {
    registerApplication({
      name: "@zuri/zuri-music-plugin",
      app: () => System.import("//localhost:8000/static/zuri-music-plugin.js"),
      activeWhen: ["/"]
    })
  } else {
    registerApplication({
      name: "@zuri/zuri-plugin-music",
      app: () =>
        System.import("https://music.zuri.chat/static/zuri-music-plugin.js"),
      activeWhen: ["/"]
    })
  }

  start({
    urlRerouteOnly: true
  })
}
