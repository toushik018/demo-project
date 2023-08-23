// Get references to HTML elements
const topTableButton = document.getElementById("topTableButton");
const newTableButton = document.getElementById("newTableButton");
const topTableContainer = document.getElementById("topTableContainer");
const newTableContainer = document.getElementById("newTableContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const topTableBody = document.getElementById("topTableBody");
const newTableBody = document.getElementById("newTableBody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentPageSpan = document.getElementById("currentPage");
const totalPagesSpan = document.getElementById("totalPages");





// Initial values
let currentTable = "top";
let currentPage = 1;
const itemsPerPage = 10; // Number of items to display per page

// Fetch data from API and populate tables
// Fetch data from API and populate tables
// Fetch data from API and populate tables
const hiveKeychain = 'https://api.hive-keychain.com/hive/delegators/bdvoter';
fetch(hiveKeychain)
    .then(res => res.json())
    .then(data => {
        const nonZeroVestingData = data.filter(item => item.vesting_shares !== 0);
        
        topTableData = nonZeroVestingData.map(item => ({
            userName: item.delegator,
            hpAmount: item.vesting_shares
        }));
        newTableData = nonZeroVestingData.map(item => ({
            userName: item.delegator,
            hpAmount: item.vesting_shares
        }));
        
        // Now that the data is processed, update the table and pagination
        updateTableAndPagination();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to populate table body
function populateTable(tableBody, data) {
    tableBody.innerHTML = "";
    data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="py-2 px-4">${index + 1}</td>
            <td class="py-2 px-4 user-name-cell">${item.userName}</td>
            <td class="py-2 px-4">${item.hpAmount}</td>
        `;
        tableBody.appendChild(row);
    });
}



// Function to update pagination
function updatePagination() {
    const totalItems = currentTable === "top" ? topTableData.length : newTableData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    totalPagesSpan.textContent = totalPages;
    currentPage = Math.min(currentPage, totalPages); // Make sure current page is within bounds
    currentPageSpan.textContent = currentPage;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Event listeners
topTableButton.addEventListener("click", () => {
    currentTable = "top";
    topTableContainer.style.display = "block";
    newTableContainer.style.display = "none";
    topTableButton.classList.add('bg-blue-500', 'text-white');
    newTableButton.classList.remove('bg-blue-500', 'text-white');
    currentPage = 1; // Reset page when switching tables
    updatePagination();
    populateTable(topTableBody, topTableData);
});

newTableButton.addEventListener("click", () => {
    currentTable = "new";
    topTableContainer.style.display = "none";
    newTableContainer.style.display = "block";
    newTableButton.classList.add('bg-blue-500', 'text-white');
    topTableButton.classList.remove('bg-blue-500', 'text-white');
    currentPage = 1; // Reset page when switching tables
    updatePagination();
    populateTable(newTableBody, newTableData);
});




// For search


searchButton.addEventListener("click", searchUser);

function searchUser() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.trim() === "") {
        // Display "Please enter your user name" warning
        displaySearchWarning("Please enter your user name");
        return;
    }

    const data = currentTable === "top" ? topTableData : newTableData;

    let matchedRowIndex = -1;

    for (let i = 0; i < data.length; i++) {
        const userName = data[i].userName.toLowerCase();
        if (userName.includes(searchTerm)) {
            matchedRowIndex = i;
            break;
        }
    }

    if (matchedRowIndex !== -1) {
        const tableBody = currentTable === "top" ? topTableBody : newTableBody;
        const rows = tableBody.querySelectorAll("tr");
        
        // Clear "matched" class from all rows
        for (const row of rows) {
            row.classList.remove("matched");
        }
        
        // Apply "matched" class to the matched row
        rows[matchedRowIndex % itemsPerPage].classList.add("matched");
        
        // Move matched row to the top of its parent
        tableBody.insertBefore(rows[matchedRowIndex % itemsPerPage], tableBody.firstChild);

        clearSearchWarning();
        updatePagination();
    } else {
        displaySearchWarning("User not found!");
    }
}


  
  
  function displaySearchWarning(message) {
    const warningElement = document.getElementById("searchWarning");
    warningElement.textContent = message;
    warningElement.style.display = "block";
  }
  
  // Function to clear any search warnings
  function clearSearchWarning() {
    const warningElement = document.getElementById("searchWarning");
    warningElement.style.display = "none";
  }




prevBtn.addEventListener("click", () => {
    currentPage -= 1;
    populateTableAndApplySearch();
    updatePagination();
});

nextBtn.addEventListener("click", () => {
    currentPage += 1;
    populateTableAndApplySearch();
    updatePagination();
});


function populateTableAndApplySearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const data = currentTable === "top" ? topTableData : newTableData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    const filteredData = paginatedData.filter(item =>
        item.userName.toLowerCase().includes(searchTerm)
    );

    if (currentTable === "top") {
        populateTable(topTableBody, filteredData);
    } else {
        populateTable(newTableBody, filteredData);
    }
}


// Function to update table and pagination based on the current state
function updateTableAndPagination() {
    populateTableAndApplySearch();
    updatePagination();
}

// Initial setup
topTableButton.addEventListener("click", () => {
    currentTable = "top";
    topTableContainer.style.display = "block";
    newTableContainer.style.display = "none";
    currentPage = 1; // Reset page when switching tables
    updateTableAndPagination();
});

newTableButton.addEventListener("click", () => {
    currentTable = "new";
    topTableContainer.style.display = "none";
    newTableContainer.style.display = "block";
    currentPage = 1; // Reset page when switching tables
    updateTableAndPagination();
});

updateTableAndPagination(); // Show initial table and pagination









