import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

// registerApplication({
//   name: "@zuri/music-plugin",
//   app: () => System.import("http://localhost:8080/zuri-music-plugin.js"),
//   activeWhen: ["/"],
// });

customRegister("dev"); // change argument to dev for development and back to prod before you push

function customRegister(env: "dev" | "prod") {
  if (env === "dev") {
    registerApplication({
      name: "@zuri/music-plugin",
      app: () => System.import("//localhost:8000/static/zuri-music-plugin.js"),
      activeWhen: ["/"],
    });
  } else {
    registerApplication({
      name: "@zuri/music-plugin",
      app: () =>
        System.import("https://music.zuri.chat/static/zuri-music-plugin.js"),
      activeWhen: ["/"],
    });
  }

  start({
    urlRerouteOnly: true,
  });
}
