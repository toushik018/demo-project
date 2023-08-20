document.addEventListener('DOMContentLoaded', async function () {
    const tableBody = document.getElementById('tableBody');
    
    async function fetchData(offset) {
        const response = await fetch('https://api.hive-engine.com/rpc/contracts', {
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
                    'offset': offset,
                    'limit': 1000
                }
            })
        });
        
        const data = await response.json();
        return data.result;
    }
    
    let offset = 0;
    let newData;
    
    do {
        newData = await fetchData(offset);

        console.log(newData);
        
        newData.forEach((balance, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="py-2 px-4">${index + 1 + offset}</td>
                <td class="py-2 px-4 user-name-cell">${balance.account}</td>
                <td class="py-2 px-4">${balance.balance}</td>
                <td class="py-2 px-4">${balance.stake}</td>
                <td class="py-2 px-4">${balance.balance + balance.stake}</td>
            `;
            tableBody.appendChild(newRow);
        });
        
        offset += 1000;
    } while (newData.length > 0);




// For Pagination
const rowsPerPage = 50;
let currentPage = 1;
const tableRows = document.querySelectorAll('tbody tr');
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

showPage(currentPage);
updatePagination();



// For search functionality

document.getElementById("searchButton").addEventListener("click", searchUser);

function searchUser() {
    var searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
    // console.log(searchValue);
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

});