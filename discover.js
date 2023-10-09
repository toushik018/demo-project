console.log("Script is running");

const data = {
    "newhlblog": {
        "author": "sourovafrin",
        "title": "This is title for the first card 1",
        "thumbnail": "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        "post_link": "https://hive.blog/x/@anomadsoul/hey-hive-wanna-rally"
    },
    "newexclusive": {
        "author": "zaku",
        "title": "This is title for the second card 2",
        "thumbnail": "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        "post_link": "https://hive.blog/x/@anomadsoul/hey-hive-wanna-rally"
    },
    "oldhlblog": {
        "author": "solominer",
        "title": "This is title for the third card 3",
        "thumbnail": "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        "post_link": "https://hive.blog/x/@anomadsoul/hey-hive-wanna-rally"
    },
    "oldexclusive": {
        "author": "louis88",
        "title": "This is title for the fourth card 4",
        "thumbnail": "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        "post_link": "https://hive.blog/x/@anomadsoul/hey-hive-wanna-rally"
    }
};


// Update the card elements with data from the `data` object
function updateCardsWithData() {
    Object.keys(data).forEach((key) => {
        const card = document.querySelector(`[data-card="${key}"]`);
        if (card) {
            const cardTitleElement = card.querySelector('.cardTitle');
            const cardUserNameElement = card.querySelector('.user-name');
            const cardImageElement = card.querySelector('.cardImage');
            const cardLinkElement = card; 

            if (cardTitleElement) {
                cardTitleElement.textContent = data[key].title;
            }
            if (cardUserNameElement) {
                cardUserNameElement.textContent = data[key].author;
            }
            if (cardImageElement) {
                cardImageElement.src = data[key].thumbnail;
            }
            if (cardLinkElement) {
                cardLinkElement.href = data[key].post_link; 
            }
        }
    });
}
window.addEventListener('load', updateCardsWithData);


// API implementation


// Initialize data object
// let data = {};

// // Function to fetch data from the API and update the data object
// function fetchDataAndUpdateData() {
//   fetch("http://127.0.0.1:8000/api/discover_posts")
//     .then((response) => response.json())
//     .then((apiData) => {
//       // Update the data object with the fetched data
//       data = apiData;

//       // Now, call the function to update the cards with the new data
//       updateCardsWithData();
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }

// // Call the function to fetch and update data when the page is loaded
// window.addEventListener("load", fetchDataAndUpdateData);

// Update the card elements with data from the `data` object
function updateCardsWithData() {
  Object.keys(data).forEach((key) => {
    const card = document.querySelector(`[data-card="${key}"]`);
    if (card) {
      const cardTitleElement = card.querySelector('.cardTitle');
      const cardUserNameElement = card.querySelector('.user-name');
      const cardImageElement = card.querySelector('.cardImage');
      const cardLinkElement = card; 

      if (cardTitleElement) {
        cardTitleElement.textContent = data[key].title;
      }
      if (cardUserNameElement) {
        cardUserNameElement.textContent = data[key].author;
      }
      if (cardImageElement) {
        cardImageElement.src = data[key].thumbnail;
      }
      if (cardLinkElement) {
        cardLinkElement.href = data[key].post_link;
      }
    }
  });
}
window.addEventListener('load', updateCardsWithData);



// Update the Avatars function to fetch author data
function updateAvatars() {
    const avatarImages = document.querySelectorAll('.avatar-image');
  
    // Loop through images and author
    avatarImages.forEach((avatarImage, index) => {
      const cardKey = Object.keys(data)[index]; 
      const authorName = data[cardKey].author; 
  
      
      fetch('https://api.deathwing.me/', {
        method: 'POST',
        body: JSON.stringify({
          'id': 0,
          'jsonrpc': '2.0',
          'method': 'condenser_api.get_accounts',
          'params': [
            [authorName] 
          ]
        })
      })
      .then(response => response.json())
      .then(authorData => {
        console.log(authorData);
  
        
        if (authorData.result.length > 0) {
          const jsonMetadata = JSON.parse(authorData.result[0].json_metadata);
          const profileImageUrl = jsonMetadata.profile.profile_image;
  
          // Check if profileImageUrl is available before updating
          if (profileImageUrl) {
            avatarImage.src = profileImageUrl;
          }
        }
      })
      .catch(error => {
        console.error('Error fetching author data:', error);
      });
    });
  }
  

// Call the updateAvatars function when the page is loaded
window.addEventListener('load', updateAvatars);


