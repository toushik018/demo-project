console.log("Script loaded and executed");


// Define the number of rows per page and initial current page
const rowsPerPage = 3;
let currentPage = 1;

// Select all table rows
const tableRows = document.querySelectorAll('tbody tr');

// Get pagination buttons and current page/total pages elements
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageElement = document.getElementById('currentPage');
const totalPagesElement = document.getElementById('totalPages');

// Show the specified page
function showPage(pageNumber) {
    const startIdx = (pageNumber - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;

    tableRows.forEach((row, index) => {
        row.style.display = (index >= startIdx && index < endIdx) ? 'table-row' : 'none';
    });
}

// Update the pagination buttons and current page/total pages elements
function updatePagination() {
    currentPageElement.textContent = currentPage;
    totalPagesElement.textContent = Math.ceil(tableRows.length / rowsPerPage);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(tableRows.length / rowsPerPage);
}

// Attach event listeners to previous and next buttons
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePagination();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(tableRows.length / rowsPerPage)) {
        currentPage++;
        showPage(currentPage);
        updatePagination();
    }
});

// Show the initial page and update pagination
showPage(currentPage);
updatePagination();

// Search functionality
document.getElementById("searchButton").addEventListener("click", searchUser);

function searchUser() {
    var searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
    var rows = document.querySelectorAll("tbody tr");
    var found = false;

    for (var i = 0; i < rows.length; i++) {
        var userName = rows[i].querySelector(".user-name-cell").textContent.trim().toLowerCase();
        if (userName === searchValue) {
            rows[i].classList.add("matched");
            rows[i].parentNode.prepend(rows[i]);
            found = true;
        } else {
            rows[i].classList.remove("matched");
        }
    }

    if (found) {
        // Find and display the page containing the matching user
        for (var page = 1; page <= Math.ceil(rows.length / rowsPerPage); page++) {
            var startIdx = (page - 1) * rowsPerPage;
            var endIdx = startIdx + rowsPerPage;
            var matchedRow = Array.from(rows).find((row, index) => index >= startIdx && index < endIdx && row.classList.contains("matched"));
            if (matchedRow) {
                currentPage = page;
                showPage(currentPage);
                updatePagination();
                break;
            }
        }
    } else {
        // If not found, reset pagination and display the first page
        currentPage = 1;
        showPage(currentPage);
        updatePagination();
    }
}

// Table toggling functionality
const topTableButton = document.getElementById('topTableButton');
const newTableButton = document.getElementById('newTableButton');
const topTableContainer = document.getElementById('topTableContainer');
const newTableContainer = document.getElementById('newTableContainer');

topTableButton.addEventListener('click', () => {
    topTableContainer.style.display = 'block';
    newTableContainer.style.display = 'none';
    currentPage = 1; // Reset current page when toggling tables
    showPage(currentPage);
    updatePagination();
});

newTableButton.addEventListener('click', () => {
    topTableContainer.style.display = 'none';
    newTableContainer.style.display = 'block';
    currentPage = 1; // Reset current page when toggling tables
    showPage(currentPage);
    updatePagination();
});

