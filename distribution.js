
// First card's js'


const investment = [
    { token: "eds", acc: { div: 50, opt: 30 } },
    { token: "hive", acc: { opt: 10 } }
    // Add more data as needed
];

// Initialize token names in the <p> tags
document.getElementById('TokenSetting1').textContent = investment[0].token;
document.getElementById('TokenSetting2').textContent = investment[1].token;

function openModal(index) {
    // Find the investment data for the specified index
    const investmentData = investment[index - 1]; // Subtract 1 to match the array index

    if (investmentData) {
        // Populate the modal with investment data
        document.getElementById('modalTokenNameLabel').textContent = "Token Name: " + investmentData.token;
        document.getElementById('modalTokenName').textContent = investmentData.token;

        // Clear existing input fields in the modal
        const modalInputsContainer = document.getElementById('modalInputsContainer');
        modalInputsContainer.innerHTML = ''; // Clear existing content

        // Create and append input fields for each value in acc
        for (const key in investmentData.acc) {
            if (Object.hasOwnProperty.call(investmentData.acc, key)) {
                const value = investmentData.acc[key];
                const inputField = document.createElement('div');
                inputField.className = 'text-center p-1 flex items-center gap-2';
                inputField.innerHTML = `
                    <label class="block text-gray-700 dark:text-gray-100 font-semibold mb-2">${key}:</label>
                    <input type="number" id="modalToken${key}" name="modalToken${key}" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500" value="${value}" required>
                    <i class="fas fa-percent"></i>
                `;
                modalInputsContainer.appendChild(inputField);
            }
        }

        document.getElementById('myModal').classList.remove('hidden');
    }
}


// data from api

// function openModal(tokenName, index) {
//     // Fetch investment data from the API using the provided tokenName
//     fetch(`api/investment/${tokenName}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Populate the modal with investment data
//             document.getElementById('modalTokenNameLabel').textContent = "Token Name: " + data.token;
//             document.getElementById('modalTokenName').textContent = data.token;

//             // Clear existing input fields in the modal
//             const modalInputsContainer = document.getElementById('modalInputsContainer');
//             modalInputsContainer.innerHTML = ''; // Clear existing content

//             // Create and append input fields for each value in acc
//             for (const key in data.acc) {
//                 if (Object.hasOwnProperty.call(data.acc, key)) {
//                     const value = data.acc[key];
//                     const inputField = document.createElement('div');
//                     inputField.className = 'text-center p-1 flex items-center gap-2';
//                     inputField.innerHTML = `
//                         <label class="block text-gray-700 font-semibold mb-2">${key}:</label>
//                         <input type="number" id="modalToken${key}" name="modalToken${key}" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500" value="${value}" required>
//                         <i class="fas fa-percent"></i>
//                     `;
//                     modalInputsContainer.appendChild(inputField);
//                 }
//             }

//             document.getElementById('myModal').classList.remove('hidden');
//         })
//         .catch(error => {
//             console.error('Error fetching investment data:', error);
//             // Handle the error as needed (e.g., show an error message to the user)
//         });
// }




function closeModal() {
    document.getElementById('myModal').classList.add('hidden');
}

function saveToken() {
    const tokenName = document.getElementById('modalTokenName').textContent;

    // Access and parse the input fields based on their IDs
    const divValueInput = document.getElementById('modalTokendiv');
    const optValueInput = document.getElementById('modalTokenopt');
    

    // Check if either div or opt input field is not null
    if (divValueInput || optValueInput) {
        let divValue, optValue;

        // Get the values from the input fields if they exist
        if (divValueInput) {
            divValue = parseInt(divValueInput.value);
        }
        if (optValueInput) {
            optValue = parseInt(optValueInput.value);
        }

        // Check if parsing was successful and values are not NaN
        if ((!isNaN(divValue) || !isNaN(optValue)) && (divValue >= 0 || optValue >= 0)) {
            // Create a payload object with the parsed values to send to the API
            const payload = {};

            if (!isNaN(divValue) && divValue >= 0) {
                payload.div = divValue;
            }

            if (!isNaN(optValue) && optValue >= 0) {
                payload.opt = optValue;
            }

            // Send a POST request to the API with the payload
            fetch(`/api/investment/${tokenName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => {
                if (response.ok) {
                  
                    console.log(`Successfully saved ${tokenName} settings.`);
                } else {
                   
                    console.error(`Failed to save ${tokenName} settings.`);
                }
            })
            .catch(error => {
                console.error('An error occurred while saving settings:', error);
                
            });
        } else {
            
            console.error('Invalid input. Please enter valid non-negative numbers for Div and Opt values.');
        }
    } else {
        
        console.error('Both Div and Opt input fields are missing.');
    }

    closeModal();
}












// Function to open the add entry modal
function openAddEntryModal() {
    document.getElementById('addEntryModal').classList.remove('hidden');
}

// Function to close the add entry modal
function closeAddEntryModal() {
    document.getElementById('addEntryModal').classList.add('hidden');
}


//  object to store the entries
const entries = {};

// Function to add a new entry
function addNewEntry() {
    const newName = document.getElementById('newEntryName').value.trim();
    const newValue = document.getElementById('newEntryValue').value.trim();

    if (newName !== '' && newValue !== '') {
        // Add the new entry to the entries object
        entries[newName] = parseFloat(newValue);

        // Create a new entry container with a unique class
        const newEntryContainer = document.createElement('div');
        const uniqueClass = `entry-${new Date().getTime()}`; // Generate a unique class
        newEntryContainer.className = `flex items-center gap-2 ${uniqueClass}`;
        newEntryContainer.innerHTML = `
            <label for="${uniqueClass}" class="block text-gray-700 font-semibold mb-2">${newName}</label>
            <input type="number" id="${uniqueClass}" name="${uniqueClass}" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500" value="${newValue}" required>
            <div class="text-gray-500 py-2 px-2 flex gap-3">
                <i class="fas fa-percent"></i>
                <i class="fas fa-times cursor-pointer" onclick="removeEntry('${uniqueClass}')"></i>
            </div>
        `;

        // Append the new entry container to the appropriate div
        const entriesContainer = document.querySelector('.entryContainer');
        entriesContainer.appendChild(newEntryContainer);

        // Reset the form elements
        document.getElementById('newEntryName').value = '';
        document.getElementById('newEntryValue').value = '';

        closeAddEntryModal();
    } else {
        alert('Both Name and Value fields must be filled.');
    }
}

// Function to remove an entry by its unique class
function removeEntry(uniqueClass) {
    // Find the entry container with the specified unique class
    const entryContainer = document.querySelector(`.${uniqueClass}`);
    
    if (entryContainer) {
        // Remove the entry container from the DOM
        entryContainer.remove();
    }
}



// Function to save entries to the API
function saveEntries() {
    // Show the confirmation modal
    document.getElementById('confirmationModal').classList.remove('hidden');
}

// Function to confirm the save operation
function confirmSave(confirmed) {
    // Hide the confirmation modal
    document.getElementById('confirmationModal').classList.add('hidden');

    if (confirmed) {
        // Convert the entries object to JSON
        const jsonEntries = JSON.stringify(entries);

        // Send a POST request to the API with the JSON data
        fetch('/api/management', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonEntries,
        })
            .then(response => {
                if (response.ok) {
                    // Request was successful
                    console.log('Successfully saved entries to the API.');
                } else {
                    // Handle errors or show a message to the user
                    console.error('Failed to save entries to the API.');
                }
            })
            .catch(error => {
                console.error('An error occurred while saving entries:', error);
                // You can display an error message to the user
            });
    } else {
        // User canceled the save operation
        console.log('Save operation canceled by the user.');
    }
}





















// Function to open the add entry modal 2
function openAddEntryModal2() {
    document.getElementById('addEntryModal2').classList.remove('hidden');
}

// Function to close the add entry modal
function closeAddEntryModal2() {
    document.getElementById('addEntryModal2').classList.add('hidden');
}

//  object to store the entries
const entries2 = {};

// Function to add a new entry for the second section
function addNewEntry2() {
    const newName = document.getElementById('newEntryName2').value.trim();
    const newValue = document.getElementById('newEntryValue2').value.trim();

    if (newName !== '' && newValue !== '') {
        // Add the new entry to the entries2 object
        entries2[newName] = parseFloat(newValue);

        // Create a new entry container with a unique class
        const newEntryContainer = document.createElement('div');
        const uniqueClass = `entry2-${new Date().getTime()}`; // Generate a unique class
        newEntryContainer.className = `flex items-center gap-2 ${uniqueClass}`;
        newEntryContainer.innerHTML = `
            <label for="${uniqueClass}" class="block text-gray-700 font-semibold mb-2">${newName}</label>
            <input type="number" id="${uniqueClass}" name="${uniqueClass}" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500" value="${newValue}" required>
            <div class="text-gray-500 py-2 px-2 flex gap-3">
                <i class="fas fa-percent"></i>
                <i class="fas fa-times cursor-pointer" onclick="removeEntry2('${uniqueClass}')"></i>
            </div>
        `;

        // Append the new entry container to the appropriate div for the second section
        const entriesContainer = document.querySelector('.entryContainer2');
        entriesContainer.appendChild(newEntryContainer);

        // Reset the form elements
        document.getElementById('newEntryName2').value = '';
        document.getElementById('newEntryValue2').value = '';

        closeAddEntryModal2();
    } else {
        alert('Both Name and Value fields must be filled.');
    }
}

// Function to remove an entry from the second section by its unique class
function removeEntry2(uniqueClass) {
    // Find the entry container with the specified unique class for the second section
    const entryContainer = document.querySelector(`.${uniqueClass}`);
    
    if (entryContainer) {
        // Remove the entry container from the DOM
        entryContainer.remove();
    }
}




function saveEntries2() {
    // Show the confirmation modal
    document.getElementById('confirmationModal2').classList.remove('hidden');
}




// Function to confirm the save operation
function confirmSave2(confirmed) {
    // Hide the confirmation modal
    document.getElementById('confirmationModal2').classList.add('hidden');

    if (confirmed) {
        // Convert the entries object to JSON
        const jsonEntries = JSON.stringify(entries2);

        // Send a POST request to the API with the JSON data
        fetch('/api/management', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonEntries,
        })
            .then(response => {
                if (response.ok) {
                    // Request was successful
                    console.log('Successfully saved entries to the API.');
                } else {
                    // Handle errors or show a message to the user
                    console.error('Failed to save entries to the API.');
                }
            })
            .catch(error => {
                console.error('An error occurred while saving entries:', error);
                // You can display an error message to the user
            });
    } else {
        // User canceled the save operation
        console.log('Save operation canceled by the user.');
    }
}


// // Function to save entries to the API
// function saveEntries2() {
//     // Convert the entries object to JSON
//     const jsonEntries = JSON.stringify(entries2);

//     // Send a POST request to the API with the JSON data
//     fetch('/api/management', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: jsonEntries,
//     })
//         .then(response => {
//             if (response.ok) {
//                 // Request was successful
//                 console.log('Successfully saved entries to the API.');
//             } else {
//                 // Handle errors or show a message to the user
//                 console.error('Failed to save entries to the API.');
//             }
//         })
//         .catch(error => {
//             console.error('An error occurred while saving entries:', error);
//             // You can display an error message to the user
//         });
// }






// Distribute functionality

function distributeTokens() {
    fetch('/api/distribute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ distribute: true }),
    })
        .then(response => {
            if (response.ok) {
                // Distribution successful, refresh the page
                window.location.reload();
            } else {
                // Handle errors or show a message to the user
                console.error('Failed to distribute tokens.');
                // You can display an error message here
            }
        })
        .catch(error => {
            console.error('An error occurred while distributing tokens:', error);
            // You can display an error message here
        });
}


// function distributeTokens() {
//     // Simulate distributing tokens by setting a variable to true
//     const distributeData = { distribute: true };

//     // Refresh the page
//     window.location.reload();
// }
