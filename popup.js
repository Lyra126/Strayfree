document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["trackedSites", "unproductiveTime"], (data) => {
      const trackedSitesDiv = document.getElementById("tracked-sites");
      const unproductiveTimeDiv = document.getElementById("unproductive-time");
  
      const sites = data.trackedSites || {};
      const unproductiveTime = data.unproductiveTime || 0;
  
      trackedSitesDiv.innerHTML = "<h3>Visited Sites:</h3>";
      Object.keys(sites).forEach((site) => {
        trackedSitesDiv.innerHTML += `<p>${site}: ${sites[site]} visits</p>`;
      });
  
      unproductiveTimeDiv.innerHTML = `<h3>Unproductive Time: ${unproductiveTime} minutes</h3>`;
    });
  });
  