
// // Function to toggle dark mode
// function toggleDarkMode() {
//     var body = document.body;
//     var toggleLabel = document.getElementById("toggle-label");
  
//     // Toggle the "dark" class on the body
//     body.classList.toggle("dark");
  
//     // Update the button label text
//     if (body.classList.contains("dark")) {
//       toggleLabel.textContent = "Light Mode";
//       // Store the current mode in local storage or cookies
//       localStorage.setItem("darkMode", "enabled");
//     } else {
//       toggleLabel.textContent = "Dark Mode";
//       // Store the current mode in local storage or cookies
//       localStorage.setItem("darkMode", "disabled");
//     }
//   }
  
//   // Check for the current mode in local storage
//   var currentMode = localStorage.getItem("darkMode");
  
//   // If currentMode is not set in local storage, set it to "disabled" (light mode)
//   if (!currentMode) {
//     currentMode = "disabled";
//   }
  
//   // Set the initial mode based on local storage
//   if (currentMode === "enabled") {
//     toggleDarkMode();
//   }
  
//   // Get the dark mode toggle button by its ID
//   var darkModeToggle = document.getElementById("dark-mode-toggle");
  
//   // Add a click event listener to the button
//   darkModeToggle.addEventListener("click", toggleDarkMode);
  



// // Function to toggle dark mode
// function toggleDarkMode() {
//     var html = document.documentElement;
//     var toggleLabel = document.getElementById("toggle-label");

//     // Toggle the "dark" class on the html element
//     html.classList.toggle("dark");

//     // Update the button label text
//     if (html.classList.contains("dark")) {
//         toggleLabel.textContent = "Light";
//         // Store the current mode in local storage or cookies
//         localStorage.setItem("darkMode", "enabled");
//     } else {
//         toggleLabel.textContent = "Dark";
//         // Store the current mode in local storage or cookies
//         localStorage.setItem("darkMode", "disabled");
//     }
// }

// // Check for the current mode in local storage
// var currentMode = localStorage.getItem("darkMode");

// // Set the initial mode based on local storage
// if (currentMode === "enabled") {
//     toggleDarkMode();
// } else if (currentMode === "disabled") {
//     // Optionally, you can add logic here to disable dark mode if needed
// }

// // Get the dark mode toggle button by its ID
// var darkModeToggle = document.getElementById("dark-mode-toggle");

// // Add a click event listener to the button
// darkModeToggle.addEventListener("click", toggleDarkMode);



// Function to toggle dark mode
function toggleDarkMode() {
    var html = document.documentElement;
    var toggleLabel = document.getElementById("toggle-label");
    var darkIcon = document.getElementById("dark-icon");
    var lightIcon = document.getElementById("light-icon");

    // Toggle the "dark" class on the html element
    html.classList.toggle("dark");

    // Toggle the visibility of moon and sun icons
    darkIcon.classList.toggle("hidden");
    lightIcon.classList.toggle("hidden");

    // Update the button label text
    if (html.classList.contains("dark")) {
        toggleLabel.textContent = "";
        // Store the current mode in local storage or cookies
        localStorage.setItem("darkMode", "enabled");
    } else {
        toggleLabel.textContent = "";
        // Store the current mode in local storage or cookies
        localStorage.setItem("darkMode", "disabled");
    }
}

// Check for the current mode in local storage
var currentMode = localStorage.getItem("darkMode");

// Set the initial mode based on local storage
if (currentMode === "enabled") {
    toggleDarkMode();
} else if (currentMode === "disabled") {
    // Optionally, you can add logic here to disable dark mode if needed
}

// Get the dark mode toggle button by its ID
var darkModeToggle = document.getElementById("dark-mode-toggle");

// Add a click event listener to the button
darkModeToggle.addEventListener("click", toggleDarkMode);
