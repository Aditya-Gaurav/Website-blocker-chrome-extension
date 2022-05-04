console.log("hello there!");

// chrome.browserAction.onClicked.addListener(buttonClicked);

// function buttonClicked(tab) {
//     let msg = {
//         txt: "hello"
//     }
//     chrome.tabs.sendMessage(tab.id, msg)
// }

// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//          return {redirectUrl: 'https://www.google.com/'};
//     },
//     {
//         urls: ["https://en.wikipedia.org/*"],
//         types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
//     },
//     ["blocking"]
// );

// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//         console.log('In webRequest');
//         return {cancel: true};
//     }, {
//         urls: ["https://*.google.com/*"]
//     }, ["blocking"]
// );

// chrome.declarativeNetRequest.addDynamicRules({
//     addRules: [{
//       'id': 2,
//       'priority': 1,
//       'action': {
//         'type': 'redirect',
//         'redirect': {
//           url: 'https://www.facebook.com'
//         }
//       },
//       'condition': {
//         'urlFilter': 'https://www.twitter.com',
//         'resourceTypes': [
//           'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script',
//           'stylesheet', 'sub_frame', 'webbundle', 'websocket', 'webtransport', 'xmlhttprequest'
//         ]
//       }
//     }],
//    removeRuleIds: [2]
//   })


// chrome.webRequest.onBeforeRequest.addListener((details) => {
//     console.log("New request detected")
//     console.log("Request URL: " + details.url);
//     if(enabled && !excludedTabs.includes(details.tabId)) {
//         for(let blockedUrl of blockedList) {
//             if(details.url.includes(blockedUrl)) {
//                 console.log("Match detected, redirecting");
//                 chrome.storage.sync.set( {"originalUrl": details.url}, () => {
//                     chrome.runtime.sendMessage("updateOriginalUrl");
//                 });
//                 return {
//                     redirectUrl: chrome.runtime.getURL("blocked.html")
//                 };
//             }
//         }
//     }
// }, {
//     urls: ["<all_urls>"],
//     types: ["main_frame"]
// }, ["blocking"]);

chrome.declarativeNetRequest.updateSessionRules({
    addRules: [
    {
      "id": 2,
      "priority": 1``,
      "action": { "type": "allow" },
      "condition": {"urlFilter": "google.com", 
      'resourceTypes': [
                  'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script',
                  'stylesheet', 'sub_frame', 'webbundle', 'websocket', 'webtransport', 'xmlhttprequest'
                ]
    }
    }
  ]})
