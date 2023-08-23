const data = {
    'one': 'Sourovafrin',
    'two': 'John Doe',
    'three': 'Jane Smith',
    'four': 'Alice Johnson'
};

// Loop through the data and update user names
Object.keys(data).forEach((key, index) => {
    const cardUserNameElement = document.querySelectorAll('.user-name')[index];
    if (cardUserNameElement) {
        cardUserNameElement.textContent = data[key];
    }
});


// Fetch data from the API and update avatar images
function updateAvatars() {
    let profileImageUrl; // Declare the variable here

    fetch('https://api.deathwing.me/', {
        method: 'POST',
        headers: {
            'authority': 'api.deathwing.me',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'origin': 'https://leofinance.io',
            'referer': 'https://leofinance.io/',
            'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
            'id': 0,
            'jsonrpc': '2.0',
            'method': 'condenser_api.get_accounts',
            'params': [
                [
                    'zaku'
                ]
            ]
        })
    })
        .then(response => response.json())
        .then(data => {


            const jsonMetadata = JSON.parse(data.result[0].json_metadata);
            profileImageUrl = jsonMetadata.profile.profile_image;

            console.log(profileImageUrl);

            const avatarImages = document.querySelectorAll('.avatar-image');

        avatarImages.forEach(avatarImage => {
            avatarImage.src = profileImageUrl;
        });

        })
}

// Call the updateAvatars function when the page is loaded
window.addEventListener('load', updateAvatars);
