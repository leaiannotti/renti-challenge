let searchType = "";

function showSearchBox(type) {
    searchType = type;
    document.getElementById("search-results").innerHTML = null
    document.getElementById("search-input").value = "";
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
            if(data.length > 0)
            {
                let searchResults = "";
                data.forEach(item => {
                    if(searchType === "author")
                    {
                        searchResults += `<div class="m-1 border border-dark card-body"><h2 class="bg-secondary card-title">${item.title}</h2>${item.biography}</div>`;
                    }
                    else if (searchType === "book") {
                        searchResults += `<div class="m-1 border border-dark card-body"><h2 class="bg-secondary card-title">${item.title} - <i>${item.author}</i> </h2>${item.synopsis}</div>`;
                    }
                });
                document.getElementById("search-results").innerHTML = searchResults;
            }
            else
            {
                document.getElementById("search-results").innerHTML = "<p> No results </p>";
            }
        })
        .catch(error => {
            console.log(error);
            alert("An error occurred while searching.");
        });
}
