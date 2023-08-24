const spinner = document.getElementById('spinner');

const hiveKeychain = 'https://api.hive-keychain.com/hive/delegators/bdvoter';

// Function to populate table rows
function populateTable(tableBody, data) {
    tableBody.innerHTML = "";
    data.forEach((row, index) => {
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td class="px-4 py-2">${index + 1}</td>
        <td class="px-4 py-2">${row.delegator}</td>
        <td class="px-4 py-2">${row.vesting_shares.toFixed(3)}</td>
        <td class="px-4 py-2">${row.delegation_date}</td>
      `;
    });
  }
  
  
  // Pagination variables
  let currentPage = 1;
  let currentTableData = [];


const rowsPerPage = 10; // Define the number of rows per page

// Function to update pagination UI
function updatePagination(totalRows) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    document.getElementById("currentPage").textContent = currentPage;
    document.getElementById("totalPages").textContent = totalPages;
  
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  let sortedDataTop = [];
  let sortedDataNew = [];

  // Keep track of the initially loaded data
let initialDataLoaded = false;
  
// Function to fetch and populate the tables
function fetchDataAndPopulateTable() {

    spinner.style.display = "block";

    fetch(hiveKeychain)
      .then(res => res.json())
      .then(data => {
        const filteredData = data.filter(entry => entry.vesting_shares > 0);
  
        sortedDataTop = filteredData.slice().sort((a, b) => b.vesting_shares - a.vesting_shares);
        sortedDataNew = filteredData.slice().sort((a, b) => new Date(b.delegation_date) - new Date(a.delegation_date));
  
        currentTableData = sortedDataTop; // Set initial currentTableData to sortedDataTop
  
        // Populate the table with the first set of rowsPerPage data
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const initialDisplayData = currentTableData.slice(startIndex, endIndex);
        populateTable(document.getElementById("topTableBody"), initialDisplayData);
  
        updatePagination(currentTableData.length);
  
        initialDataLoaded = true; // Mark the initial data as loaded

        // Hide the spinner after data is loaded
        spinner.style.display = "none";
      })
      .catch(error => {
        // Handle error and hide the spinner
        console.error("Error loading data:", error);
        spinner.style.display = "none";
      });
  }
  // Call the function to fetch and populate the top table initially
  fetchDataAndPopulateTable();


// Function to switch table data
function switchTable(tableData) {
    currentTableData = tableData;
    currentPage = 1;
    updateTable();
    updatePagination(currentTableData.length);
}

// Handle table buttons
document.getElementById("topTableButton").addEventListener("click", () => {
    if (initialDataLoaded) {
      currentTableData = sortedDataTop;
      currentPage = 1;
      topTableButton.classList.add('bg-blue-500', 'text-white');
      newTableButton.classList.remove('bg-blue-500', 'text-white');
  
      // Update the table with the first set of rowsPerPage data
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const initialDisplayData = currentTableData.slice(startIndex, endIndex);
      populateTable(document.getElementById("topTableBody"), initialDisplayData);
  
      updatePagination(currentTableData.length);
    }
  });
    
  document.getElementById("newTableButton").addEventListener("click", () => {
    if (initialDataLoaded) {
      currentTableData = sortedDataNew;
      currentPage = 1;
      newTableButton.classList.add('bg-blue-500', 'text-white');
      topTableButton.classList.remove('bg-blue-500', 'text-white');
  
      // Update the table with the first set of rowsPerPage data
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const initialDisplayData = currentTableData.slice(startIndex, endIndex);
      populateTable(document.getElementById("topTableBody"), initialDisplayData);
  
      updatePagination(currentTableData.length);
    }
  });



// Handle search
document.getElementById("searchButton").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    
    // Check for empty search input
    if (!searchInput) {
        document.getElementById("emptySearchWarning").classList.remove("hidden");
        document.getElementById("noResultsWarning").classList.add("hidden");
        return;
    }

    const matchedRows = currentTableData.filter((row) =>
        row.delegator.toLowerCase().includes(searchInput)
    );

    const tableBody = document.getElementById("topTableBody"); // Assuming you are using top table for search results
    populateTable(tableBody, matchedRows);

    if (matchedRows.length === 0) {
        document.getElementById("noResultsWarning").classList.remove("hidden");
        document.getElementById("emptySearchWarning").classList.add("hidden");
    } else {
        document.getElementById("noResultsWarning").classList.add("hidden");
        document.getElementById("emptySearchWarning").classList.add("hidden");
    }

    currentPage = 1;
    updatePagination(matchedRows.length);
});



// Handle pagination
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(currentTableData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
    }
});

// Function to update the displayed table
function updateTable() {
    const tableBody = document.getElementById("topTableBody"); // Assuming you are using top table for pagination
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedData = currentTableData.slice(startIndex, endIndex);
    populateTable(tableBody, displayedData);
    updatePagination(currentTableData.length);
}

// Initial table setup
updateTable();
