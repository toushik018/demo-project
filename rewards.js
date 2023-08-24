const newButton = document.getElementById('newButton');
const totalButton = document.getElementById('totalButton');
const tableContainer = document.getElementById('tableContainer');
const totalContainer = document.getElementById('totalContainer');
const paginationSection = document.getElementById('pagination-section');

newButton.addEventListener('click', () => {
    tableContainer.style.display = 'block';
    totalContainer.style.display = 'none';
    paginationSection.style.display = 'flex';

    newButton.classList.add('bg-blue-500', 'text-white');
    totalButton.classList.remove('bg-blue-500', 'text-white');
});

totalButton.addEventListener('click', () => {
    tableContainer.style.display = 'none';
    totalContainer.style.display = 'block';
    paginationSection.style.display = 'none';

    totalButton.classList.add('bg-blue-500', 'text-white');
    newButton.classList.remove('bg-blue-500', 'text-white');
});

// sample data
const sampleData = [
    { 'id': 1, 'username': 'sourov', 'token': 'dec', 'amount': 1000.0, 'date': '12/12/12' },
    { 'id': 2, 'username': 'sourov', 'token': 'dec', 'amount': 1000.0, 'date': '12/12/12' },
    { 'id': 3, 'username': 'sourov', 'token': 'dec', 'amount': 2000.0, 'date': '12/12/12' },
    { 'id': 4, 'username': 'john', 'token': 'btc', 'amount': 1500.0, 'date': '11/10/21' },
    { 'id': 5, 'username': 'jane', 'token': 'eth', 'amount': 800.0, 'date': '10/09/20' },
    { 'id': 6, 'username': 'alice', 'token': 'bnb', 'amount': 500.0, 'date': '09/08/19' },
    { 'id': 7, 'username': 'bob', 'token': 'xrp', 'amount': 1200.0, 'date': '08/07/18' },
    { 'id': 8, 'username': 'david', 'token': 'ltc', 'amount': 900.0, 'date': '07/06/17' },
    { 'id': 9, 'username': 'emily', 'token': 'doge', 'amount': 700.0, 'date': '06/05/16' },
    { 'id': 10, 'username': 'frank', 'token': 'ada', 'amount': 1100.0, 'date': '05/04/15' },
    { 'id': 11, 'username': 'grace', 'token': 'dot', 'amount': 1800.0, 'date': '04/03/14' },
    { 'id': 12, 'dec': 3000.0, 'sps': 1000.0 }
];



function populateTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4">${item.id}</td>
            <td class="py-2 px-4">${item.username}</td>
            <td class="py-2 px-4">${item.token}</td>
            <td class="py-2 px-4">${item.amount}</td>
            <td class="py-2 px-4">${item.date}</td>
        `;
        tableBody.appendChild(row);
    });

    // Update tableRows after populating the table
    tableRows = document.querySelectorAll('tbody tr');

    // Populate the stats container with data from the last object
    const lastObject = data[data.length - 1];
    const totalContainer = document.getElementById('totalContainer');
    totalContainer.innerHTML = `
         <div class="bg-white p-10 rounded-t-3xl shadow-lg text-center">
             <h2 class="text-lg font-semibold mb-2">Total Stats</h2>
             <p>dec: ${lastObject.dec}</p>
             <p>sps: ${lastObject.sps}</p>
         </div>
     `;

}



// For rewards

// For Pagination
const rowsPerPage = 4;
let currentPage = 1;
let tableRows = document.querySelectorAll('tbody tr'); // Move this here
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageElement = document.getElementById('currentPage');
const totalPagesElement = document.getElementById('totalPages');

function showPage(pageNumber) {
    const startIdx = (pageNumber - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;

    tableRows.forEach((row, index) => {
        row.style.display = (index >= startIdx && index < endIdx) ? 'table-row' : 'none';
    });
}

function updatePagination() {
    currentPageElement.textContent = currentPage;
    totalPagesElement.textContent = Math.ceil(tableRows.length / rowsPerPage);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(tableRows.length / rowsPerPage);
}

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

// Initial setup
populateTable(sampleData);
showPage(currentPage);
updatePagination();

// For search functionality
document.getElementById("searchButton").addEventListener("click", searchUser);

function searchUser() {
    var searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
    var rows = document.querySelectorAll("tbody tr");
    var found = false;

    for (var i = 0; i < rows.length; i++) {
        var userName = rows[i].querySelector("td:nth-child(1)").textContent.trim().toLowerCase();
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