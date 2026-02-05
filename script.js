let input = document.getElementById("movie");
let button = document.getElementById("searchBtn");
let result = document.getElementById("result");
button.addEventListener("click", getMovie);
input.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        getMovie();
    }
});
function getMovie(){
    let movie = input.value.trim();
    if(movie === ""){
        result.innerText = "Please enter a movie name";
        return
    }
    let apiKey = "LET_YOUR_API_KEY"
    let url = `https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.Response === "False"){
                result.innerText = "Movie not found";
                return;
            }
            result.innerHTML = `<h3>${data.Title} (${data.Year})</h3>
                <img src="${data.Poster}" width="240">
                <p><b>IMDB:</b> ${data.imdbRating}</p>
                <p>${data.Plot}</p>
                <button onclick="watchTrailer('${data.Title}')">
                    🎬 Watch Trailer
                </button>`;
        })
        .catch(() => {
            result.innerText = "Error fetching movie!!!";
        });
}
       function watchTrailer(movieName){
    let url = `https://www.youtube.com/results?search_query=${movieName}+trailer`;
    window.open(url, "_blank");
}
