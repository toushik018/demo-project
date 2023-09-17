// const newButton = document.getElementById('newButton');
// const totalButton = document.getElementById('totalButton');
// const tableContainer = document.getElementById('tableContainer');
// const totalContainer = document.getElementById('totalContainer');
// const paginationSection = document.getElementById('pagination-section');
// const searchButton = document.getElementById('searchButton');

// newButton.addEventListener('click', () => {
//     tableContainer.style.display = 'block';
//     totalContainer.style.display = 'none';
//     paginationSection.style.display = 'flex';

//     newButton.classList.add('bg-blue-500', 'text-white');
//     totalButton.classList.remove('bg-blue-500', 'text-white');
// });

// totalButton.addEventListener('click', () => {
//     tableContainer.style.display = 'none';
//     totalContainer.style.display = 'block';
//     paginationSection.style.display = 'none';

//     totalButton.classList.add('bg-blue-500', 'text-white');
//     newButton.classList.remove('bg-blue-500', 'text-white');
// });

// // Sample data
// const sampleData = {
//     "result": [
//         {"username": "sourovaf", "token": "deca", "amount": 100.0, "date": "14/12/12"},
//         {"username": "toushik", "token": "bee", "amount": 200.0, "date": "14/12/12"},
//         {"deca": 100.0, "bee": 200.0}
//     ]
// };

// function populateTable(data) {
//     const tableBody = document.getElementById('tableBody');
//     tableBody.innerHTML = '';

//     const newTableData = [];
//     const totalTableData = [];

//     if (data.result && Array.isArray(data.result)) {
//         data.result.forEach((item) => {
//             if ("username" in item && "token" in item && "amount" in item && "date" in item) {
//                 newTableData.push(item);
//             } else {
//                 totalTableData.push(item);
//             }
//         });

//         // Populate the "New" table
//         newTableData.forEach((item, index) => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td class="py-2 px-4">${index + 1}</td>
//                 <td class="py-2 px-4">${item.username || ''}</td>
//                 <td class="py-2 px-4">${item.token || ''}</td>
//                 <td class="py-2 px-4">${item.amount || ''}</td>
//                 <td class="py-2 px-4">${item.date || ''}</td>
//             `;
//             tableBody.appendChild(row);
//         });

//         // Update tableRows after populating the "New" table
//         tableRows = document.querySelectorAll('tbody tr');

//         // Populate the stats container with data from the last object in the "Total" table
//         const totalContainer = document.getElementById('totalContainer');
//         if (totalTableData.length > 0) {
//             const lastObject = totalTableData[totalTableData.length - 1];
//             totalContainer.innerHTML = `
//                  <div class="bg-white p-10 rounded-t-3xl shadow-lg text-center">
//                      <h2 class="text-xl font-bold mb-2">Total Stats</h2>
//                      <ul class="font-semibold">
//                     ${Object.entries(lastObject).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
//                 </ul>
//                  </div>
//              `;
//         } else {
//             totalContainer.innerHTML = '';
//         }
//     } else {
//         // Handle cases where the data structure doesn't match
//         console.error("Invalid data format. 'result' should be an array.");
//     }
// }

// // For rewards

// // For Pagination
// const rowsPerPage = 8;
// let currentPage = 1;
// let tableRows = document.querySelectorAll('tbody tr'); // Move this here
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');
// const currentPageElement = document.getElementById('currentPage');
// const totalPagesElement = document.getElementById('totalPages');

// function showPage(pageNumber) {
//     const startIdx = (pageNumber - 1) * rowsPerPage;
//     const endIdx = startIdx + rowsPerPage;

//     tableRows.forEach((row, index) => {
//         row.style.display = (index >= startIdx && index < endIdx) ? 'table-row' : 'none';
//     });
// }

// function updatePagination() {
//     currentPageElement.textContent = currentPage;
//     totalPagesElement.textContent = Math.ceil(tableRows.length / rowsPerPage);

//     prevBtn.disabled = currentPage === 1;
//     nextBtn.disabled = currentPage === Math.ceil(tableRows.length / rowsPerPage);
// }

// prevBtn.addEventListener('click', () => {
//     if (currentPage > 1) {
//         currentPage--;
//         showPage(currentPage);
//         updatePagination();
//     }
// });

// nextBtn.addEventListener('click', () => {
//     if (currentPage < Math.ceil(tableRows.length / rowsPerPage)) {
//         currentPage++;
//         showPage(currentPage);
//         updatePagination();
//     }
// });

// // Initial setup
// populateTable(sampleData);
// showPage(currentPage);
// updatePagination();

// /// For search functionality
// searchButton.addEventListener("click", searchUser);

// function searchUser() {
//     var searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
//     var rows = document.querySelectorAll("tbody tr");
//     var found = false;

//     for (var i = 0; i < rows.length; i++) {
//         var userName = rows[i].querySelector("td:nth-child(2)").textContent.trim().toLowerCase();
//         if (userName === searchValue) {
//             rows[i].classList.add("matched");
//             rows[i].style.display = 'table-row'; // Show the matching row
//             found = true;
//         } else {
//             rows[i].classList.remove("matched");
//             rows[i].style.display = 'none'; // Hide non-matching rows
//         }
//     }

//     if (found) {
//         // If found, reset pagination and display the first page
//         currentPage = 1;
//         updatePagination();
//     } else {
//         // If not found, show a message and reset pagination
//         currentPage = 1;
//         updatePagination();
//         alert("User not found.");
//     }
// }







const newButton = document.getElementById('newButton');
const totalButton = document.getElementById('totalButton');
const tableContainer = document.getElementById('tableContainer');
const totalContainer = document.getElementById('totalContainer');
const paginationSection = document.getElementById('pagination-section');
const searchButton = document.getElementById('searchButton');

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

function populateTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const newTableData = [];
    const totalTableData = [];

    if (data.result && Array.isArray(data.result)) {
        data.result.forEach((item) => {
            if ("username" in item && "token" in item && "amount" in item && "date" in item) {
                newTableData.push(item);
            } else {
                totalTableData.push(item);
            }
        });

        // Populate the "New" table
        newTableData.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2 px-4">${index + 1}</td>
                <td class="py-2 px-4">${item.username || ''}</td>
                <td class="py-2 px-4">${item.token || ''}</td>
                <td class="py-2 px-4">${item.amount || ''}</td>
                <td class="py-2 px-4">${item.date || ''}</td>
            `;
            tableBody.appendChild(row);
        });

        // Update tableRows after populating the "New" table
        tableRows = document.querySelectorAll('tbody tr');

        // Populate the stats container with data from the last object in the "Total" table
        const totalContainer = document.getElementById('totalContainer');
        if (totalTableData.length > 0) {
            const lastObject = totalTableData[totalTableData.length - 1];
            totalContainer.innerHTML = `
                 <div class="bg-white p-10 rounded-t-3xl shadow-lg text-center">
                     <h2 class="text-xl font-bold mb-2">Total Stats</h2>
                     <ul class="font-semibold">
                    ${Object.entries(lastObject).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
                </ul>
                 </div>
             `;
        } else {
            totalContainer.innerHTML = '';
        }
    } else {
        // Handle cases where the data structure doesn't match
        console.error("Invalid data format. 'result' should be an array.");
    }
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
// Fetch all data initially
fetch('http://127.0.0.1:8000/api/rewards_history', {
    method: 'POST',
    body: new URLSearchParams({
        'username': '$all'
    })
})
    .then(response => response.json())
    .then(data => {
        populateTable(data);
        showPage(currentPage);
        updatePagination();
    })
    .catch(error => console.error('Error fetching all data:', error));

// For search functionality
searchButton.addEventListener("click", searchUser);

function searchUser() {
    var searchValue = document.getElementById("searchInput").value.trim().toLowerCase();

    if (searchValue === "") {
        // If the search input is empty, fetch all data
        fetch('http://127.0.0.1:8000/api/rewards_history', {
            method: 'POST',
            body: new URLSearchParams({
                'username': '$all'
            })
        })
            .then(response => response.json())
            .then(data => {
                populateTable(data);
                showPage(currentPage);
                updatePagination();
            })
            .catch(error => console.error('Error fetching all data:', error));
    } else {
        // If there's a search query, fetch data for that specific user
        fetch('http://127.0.0.1:8000/api/rewards_history', {
            method: 'POST',
            body: new URLSearchParams({
                'username': searchValue
            })
        })
            .then(response => response.json())
            .then(data => {
                populateTable(data);
                showPage(currentPage);
                updatePagination();
            })
            .catch(error => console.error('Error fetching specific data:', error));
    }
}

