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




// Api


const apiTableBody = document.getElementById('apiTableBody');

// Function to fetch API data and populate the table
async function fetchAndPopulateData() {
    const apiUrl = 'https://api.hive-engine.com/rpc/contracts';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Origin': 'https://he.dtools.dev',
                'Connection': 'keep-alive',
                'Referer': 'https://he.dtools.dev/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site'
            },
            body: JSON.stringify({
                'jsonrpc': '2.0',
                'id': 1692187530638,
                'method': 'find',
                'params': {
                    'contract': 'tokens',
                    'table': 'balances',
                    'query': {
                        'symbol': 'SPS'
                    },
                    'offset': 0,
                    'limit': 1000
                }
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const rows = data.result;

        apiTableBody.innerHTML = ''; // Clear existing rows

        // Populate the table with fetched data
        rows.forEach((row, index) => {
            const newRow = `
                <tr>
                    <td class="py-2 px-4">${index + 1}</td>
                    <td class="py-2 px-4 user-name-cell">${row.user}</td>
                    <td class="py-2 px-4">${row.amount}</td>
                </tr>
            `;

            apiTableBody.insertAdjacentHTML('beforeend', newRow);
        });

    } catch (error) {
        console.error('Error fetching API data:', error);
    }
}

// Call the function to fetch and populate data
fetchAndPopulateData();

