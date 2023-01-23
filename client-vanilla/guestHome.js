let searchType = "";

function showSearchBox(type) {
    searchType = type;
    document.getElementById("search-container").style.display = "block";
}

function search() {
    let searchValue = document.getElementById("search-input").value;
    let url = "";

    if (searchType === "book") {
        url = `https://renti-library-api.herokuapp.com/books?title=${searchValue}`;
    } else if (searchType === "author") {
        url = `https://renti-library-api.herokuapp.com/authors?name=${searchValue}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let searchResults = "";
            data.forEach(item => {
                searchResults += `<p>${item.title}</p>`;
            });
            document.getElementById("search-results").innerHTML = searchResults;
        })
        .catch(error => {
            console.log(error);
            alert("An error occurred while searching. Please try again later.");
        });
}
