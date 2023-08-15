const newButton = document.getElementById('newButton');
const totalButton = document.getElementById('totalButton');
const tableContainer = document.getElementById('newTableContainer');
const totalContainer = document.getElementById('totalTableContainer');

newButton.addEventListener('click', () => {
    tableContainer.style.display = 'block';
    totalContainer.style.display = 'none';

    newButton.classList.add('bg-blue-500', 'text-white');
    totalButton.classList.remove('bg-blue-500', 'text-white');
});

totalButton.addEventListener('click', () => {
    tableContainer.style.display = 'none';
    totalContainer.style.display = 'block';

    totalButton.classList.add('bg-blue-500', 'text-white');
    newButton.classList.remove('bg-blue-500', 'text-white');
});






// For Pagination
const rowsPerPage = 2;
let currentPage = 1;
const tableRows = document.querySelectorAll('tbody tr');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageElement = document.getElementById('currentPage');
const totalPagesElement = document.getElementById('totalPages');

const newTableBody = document.getElementById('topTableBody');
const totalTableBody = document.getElementById('totalTableBody');
let currentTableBody = newTableBody; // Initial table body
let currentTableRows = newTableBody.querySelectorAll('tr');


function showPage(tableBody, pageNumber) {
    const startIdx = (pageNumber - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;

    const tableRows = tableBody.querySelectorAll('tr');
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
        showPage(currentTableBody, currentPage);
        updatePagination();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(currentTableRows.length / rowsPerPage)) {
        currentPage++;
        showPage(currentTableBody, currentPage);
        updatePagination();
    }
});


showPage(currentPage);
updatePagination();




// For search functionality

