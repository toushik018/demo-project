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
            console.log(data);

            const jsonMetadata = JSON.parse(data.result[0].json_metadata);
            profileImageUrl = jsonMetadata.profile.profile_image;
            thumbnail = jsonMetadata.profile.cover_image;

            console.log(thumbnail);

            const avatarImages = document.querySelectorAll('.avatar-image');

            avatarImages.forEach(avatarImage => {
                avatarImage.src = profileImageUrl;
            });

        })
}

// Call the updateAvatars function when the page is loaded
window.addEventListener('load', updateAvatars);
