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

//evolution based on favorability
function getStage(favorability) {
  if (favorability <= 25) {
    return 'egg.png';
  } else if (favorability <= 50) {
    return 'caterpillar.png';
  } else if (favorability <= 75) {
    return 'cocoon.png';
  } else {
    return 'butterfly.png';
  }
}

//update the pet image
function updatePet(imageName) {
  const petImage = document.getElementById('pet-img');
  petImage.src = `assets/${imageName}`;
}

//function to calculate favorability
function calcFavorability(unproductive, productive) {
  const total = unproductive + productive;
  if (total === 0) {
    return 0;
  }
  const favorability = Math.min(100, Math.max(0, Math.round((productive / total) * 100)));
  return favorability;
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

  //update the pet image and progress bar
  chrome.storage.local.get(["unproductiveTime", "productiveTime"], (data) => {
    const unproductiveTime = data.unproductiveTime || 0;
    const productiveTime = data.productiveTime || 0; 
    const favorability = calcFavorability(unproductiveTime, productiveTime);

    const stage = getStage(favorability);
    updatePet(stage);

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = favorability + '%';

    const progressText = document.getElementById('progress-text');
    progressText.textContent = `${favorability}%`;
    
    //motivation messages
    const petImage = document.getElementById('pet-img');
    petImage.addEventListener('click', () => {
      const motivations = [
        "Keep up the great work!",
        "You're doing amazing!",
        "Stay focused and keep progressing!",
        "Every step counts!",
        "Believe in yourself!"
      ];

      const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
      const messageDiv = document.getElementById('motivation-message');
      messageDiv.textContent = randomMotivation;
      messageDiv.style.display = "block";
      
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 3500);    
    });
  });

  //stats tab
    chrome.storage.local.get(["trackedSites", "unproductiveTime"], (data) => {
      const trackedSitesDiv = document.getElementById("tracked-sites");
      const unproductiveTimeDiv = document.getElementById("unproductive-time");
  
      const sites = data.trackedSites || {};
      const unproductiveTime = data.unproductiveTime || 0;
  
      trackedSitesDiv.innerHTML = "<h3>Visited Sites:</h3>";
      let dropdown = document.createElement("select");

      let defaultOption = document.createElement("option");
      defaultOption.textContent = "Select a site";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      dropdown.appendChild(defaultOption);

      // Populate the dropdown with the sites
      Object.keys(sites).forEach((site) => {
        let option = document.createElement("option");
        option.value = site;
        option.textContent = `${site}: ${sites[site]} visits`;
        dropdown.appendChild(option);
      });

      // Add the dropdown to the div
      trackedSitesDiv.appendChild(dropdown);

      c// Populate saved notes list
    userNotes.forEach((note) => {
      const listItem = document.createElement("li");
      listItem.textContent = note;
      savedNotesList.appendChild(listItem);
    });
  });

  // Add a new note
  const saveInputButton = document.getElementById("save-input");
  saveInputButton.addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim()) {
      chrome.storage.local.get(["userNotes"], (data) => {
        const notes = data.userNotes || [];
        notes.push(userInput); // Add new note to the array
        chrome.storage.local.set({ userNotes: notes }, () => {
          const savedMessage = document.getElementById("saved-message");
          savedMessage.style.display = "block";
          setTimeout(() => {
            savedMessage.style.display = "none";
          }, 2000);

          // Update the displayed list
          const savedNotesList = document.getElementById("saved-notes-list");
          const listItem = document.createElement("li");
          listItem.textContent = userInput;
          savedNotesList.appendChild(listItem);

          // Clear the input field
          document.getElementById("user-input").value = "";
        });
      });
    }

  
      unproductiveTimeDiv.innerHTML = `<h3>Unproductive Time: ${unproductiveTime} minutes</h3>`;
    });
  });
  