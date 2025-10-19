let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let key = "YOUR_API_KEY"; // replace with your OMDB API key

let getMovie = () => {
    let movieName = movieNameRef.value.trim();
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if(movieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Please Enter A movie Name</h3>`;
        return;
    }

    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            if(data.Response === "False"){
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                return;
            }

            let genres = data.Genre.split(",").map(g => `<div>${g.trim()}</div>`).join("");

            result.innerHTML = `
                <div class="info">
                    <img src="${data.Poster}" class="poster" alt="Poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.png" alt="Rating Star">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            ${genres}
                        </div>
                    </div>
                </div>
                <h3>Plot :</h3>
                <p>${data.Plot}</p>
                <h3>Cast :</h3>
                <p>${data.Actors}</p>
            `;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Error fetching data</h3>`;
        });
}

// Search button click
searchBtn.addEventListener("click", getMovie);

// Press Enter to search
movieNameRef.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        getMovie();
    }
});

// Load default movie on page load
window.addEventListener("load", getMovie);
