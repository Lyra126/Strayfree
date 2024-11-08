const unproductiveSites = ["facebook.com", "youtube.com", "reddit.com"]; // Add more sites as needed

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const url = new URL(tab.url);
    const domain = url.hostname.replace("www.", "");

    // Classify and store site visit
    chrome.storage.local.get(["trackedSites"], (data) => {
      const trackedSites = data.trackedSites || {};
      trackedSites[domain] = (trackedSites[domain] || 0) + 1;

      chrome.storage.local.set({ trackedSites });

      // Check if site is unproductive
      if (unproductiveSites.includes(domain)) {
        chrome.storage.local.get(["unproductiveTime"], (data) => {
          const unproductiveTime = (data.unproductiveTime || 0) + 1;
          chrome.storage.local.set({ unproductiveTime });
        });
      }
    });
  }
});
