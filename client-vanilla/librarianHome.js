let searchType = "";

function showSearchBox(type) {
    searchType = type;
    document.getElementById("search-results").innerHTML = null
    document.getElementById("search-input").value = "";
    document.getElementById("search-container").style.display = "block";
}

function openReturnPopup(){
    $("#returnModal").modal();
}

function returnBook(){
    let bookid = bookidInput.value;
    let url = `https://renti-library-api.herokuapp.com/loans`;
    let token = localStorage.getItem('token');
    fetch(url, {
        headers: {Authorization: `Bearer ${token}`},
        method: 'PATCH',
        body: JSON.stringify({
            bookID: Number(bookid),
        })
      })
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then((json) => {
            alert(json.error);
          });
        }
        return response.json();
      })
      .then((json) => {
        $('#returnModal').modal('hide');
      })
      .catch((error) => {
        console.log(error);
      });
}

function search() {
    let searchValue = document.getElementById("search-input").value;
    let url = "";

    let token = localStorage.getItem('token');

    if (searchType === "borrowed") {
        url = `https://renti-library-api.herokuapp.com/loans`;
    } else if (searchType === "bookworm") {
        url = 'https://renti-library-api.herokuapp.com/bookworms';
        if(searchValue != "")
            url+=`?name=${searchValue}`
    }

    fetch(url,{headers: {Authorization: `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            let searchResults = "";
            data.forEach(item => {
                if (searchType === "bookworm") {
                    searchResults += `<div class="m-1 border border-dark card-body"><h2 class="bg-secondary card-title">${item.username}</h2><h5>${item.firstName}${item.lastName}  <span class="${item.dueToReturn ? 'text-danger':''}">${item.dueToReturn ? 'Due to return':''}</span></h5></h5></div>`;
                }
                else if (searchType === "borrowed") {
                    searchResults += `<div class="m-1 border border-dark card-body"><h2 class="bg-secondary card-title">${item.book.title} - <i>${item.book.author}</i> </h2>${item.book.synopsis}</div>`;
                }
                
            });
            document.getElementById("search-results").innerHTML = searchResults;
        })
        .catch(error => {
            console.log(error);
            alert("An error occurred while searching.");
        });
}
