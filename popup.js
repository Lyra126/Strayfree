//switching between tabs
function openTab(evt, tabName) {
  const tabContent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tabs");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.getElementsByClassName("tabs");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", function(evt) {
      const tabName = this.getAttribute("data-tab");
      openTab(evt, tabName);
    });
  }

  // pet tab is the default tab
  document.getElementById("Pet").style.display = "block";
  tabButtons[0].classList.add("active");

  //stats tab
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
  