document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = document.getElementById('query').value;
    const response = await fetch('/search-reff', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
    });

    const results = await response.json();
    console.log(results);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Create and append the heading just once
    const heading = document.createElement("h2");
    heading.className = "mb-4 mt-5 text-lg font-semibold text-center sora";
    heading.textContent = "Mungkin ini yang anda cari:";
    resultsDiv.appendChild(heading);

    const rowContainer = document.createElement('div');
    rowContainer.className = "row";

    // Iterate through results and create a card for each song
    results.forEach((result, index) => {
        // Create the card container
        const cardContainer = document.createElement('div');
        cardContainer.className = "col-lg-4 col-md-12 mb-3";

        const card = document.createElement('div');
        card.className = "card";

        // Create an image row and column
        const rowImg = document.createElement('div');
        rowImg.className = "row"; // Use div instead of row
        const colImg = document.createElement('div');
        colImg.className = "col";
        colImg.style.maxWidth = "10.5rem"; // To match your image size requirement

        const img = document.createElement('img');
        img.id = "unsplashImage" + index; // Unique ID for each image
        img.style.cssText = "width: 10.5rem; padding: 0.5rem;";

        // Fetch an image from Unsplash API for each result
        fetch(`https://api.unsplash.com/search/photos?query=music&client_id=VTYo6yEZYA0WwowdBCe3jXqsALliNXzgBIN7GSwCBm0`)
            .then((response) => response.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    const resultImage = data.results[index].urls.regular; // Get the first image URL
                    img.src = resultImage;
                } else {
                    img.src = "default-image-url.jpg"; // Fallback image if no results found
                }
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
                img.src = "default-image-url.jpg"; // Fallback image in case of an error
            });

        // Append the image to the column and row
        colImg.appendChild(img);
        rowImg.appendChild(colImg);

        const colBody = document.createElement('div');
        colBody.className = "col";

        // Create the card body
        const cardBody = document.createElement('div');
        cardBody.className = "card-body";

        colBody.appendChild(cardBody);
        rowImg.appendChild(colBody);

        // Create the title, artist, and lyric content
        const title = document.createElement('div');
        title.className = "card-title";
        title.innerHTML = result.judul;

        const artist = document.createElement('div');
        artist.className = "text-muted";
        artist.innerHTML = result.artist;

        const divButton = document.createElement('div');
        divButton.className = "d-flex justify-content-end";

        const lyricButton = document.createElement('button');
        lyricButton.className = "btn-ly btn text-white";
        lyricButton.style.cssText = "background-color: #A394F9";
        lyricButton.textContent = "Lyric";
        lyricButton.onclick = () => {
            window.location.href = `/lyric?title=${encodeURIComponent(result.judul)}&artist=${encodeURIComponent(result.artist)}&lyric=${encodeURIComponent(result.lyric)}`;
        };

        // Append the title, artist, and button to the card body
        cardBody.appendChild(title);
        cardBody.appendChild(artist);
        cardBody.appendChild(divButton);
        divButton.appendChild(lyricButton);

        // Append the rowImg (containing colImg and colBody) to the card
        card.appendChild(rowImg);

        // Append the card to the card container
        cardContainer.appendChild(card);
        rowContainer.appendChild(cardContainer);
    });

    // Append the row container to the results section
    resultsDiv.appendChild(rowContainer);
});
