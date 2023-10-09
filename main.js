// // Function to update the chart with new data
// const updateChart = (labels, data) => {
//   const myChart = new Chart(document.querySelector(".my-chart"), {
//     type: "doughnut",
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: "Holding Popularity",
//           data: data,
//         },
//       ],
//     },
//     options: {
//       borderWidth: 10,
//       borderRadius: 2,
//       hoverBorderWidth: 0,
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//     },
//   });
// };

// // Function to populate the list with new data
// const populateUl = (labels, data) => {
//   const ul = document.querySelector(".holdings-stats .details ul");
//   ul.innerHTML = ""; // Clear the existing list items

//   labels.forEach((label, i) => {
//     const li = document.createElement("li");
//     li.innerHTML = `${label}: <span class='percentage'>${data[i]}%</span>`;
//     ul.appendChild(li);
//   });
// };

// // Function to fetch data from your API
// const fetchDataFromAPI = async () => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/holdings"); // Replace with your API URL
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const apiData = await response.json();

//     // Extract labels and data from the API response
//     const labels = Object.keys(apiData);
//     const data = Object.values(apiData);

//     // Update the chart and list with the fetched data
//     updateChart(labels, data);
//     populateUl(labels, data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// // Call the function to fetch data when your page loads or whenever you need it
// fetchDataFromAPI();






















// Function to update the chart with new data
const updateChart = (labels, data) => {
  const myChart = new Chart(document.querySelector(".my-chart"), {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "  Holding Popularity",
          data: data,
        },
      ],
    },
    options: {
      borderWidth: 10,
      borderRadius: 2,
      hoverBorderWidth: 0,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

// Function to populate the list with new data
const populateUl = (labels, data) => {
  const ul = document.querySelector(".holdings-stats .details ul");
  ul.innerHTML = ""; // Clear the existing list items

  labels.forEach((label, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${label}: <span class='percentage'>${data[i]}%</span>`;
    ul.appendChild(li);
  });
};

// Static data
const staticData = {
  "Hive": 90,
  "Eds": 6,
  "Bro": 4
};

// Extract labels and data from the static data
const labels = Object.keys(staticData);
const data = Object.values(staticData);

// Initial update with static data
updateChart(labels, data);
populateUl(labels, data);



