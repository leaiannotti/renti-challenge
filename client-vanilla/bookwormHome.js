let searchType = "";

function showSearchBox(type) {
    searchType = type;
    document.getElementById("search-results").innerHTML = null
    document.getElementById("search-input").value = "";
    document.getElementById("search-container").style.display = "block";
}

function openLendPopup(){
    let aBooksID = getBooksToLend();
    if(aBooksID.length > 0)
        $("#lendModal").modal();
    else
        alert('Please select at least one book')
}

function getBooksToLend(){
    const checkboxes = document.querySelectorAll('.chkBorrowBook');
    const checkedValues = Array.from(checkboxes)
                            .filter(checkbox => checkbox.checked)
                            .map(checkbox => Number(checkbox.value));
    return checkedValues
}

function lendBooks(){
    let aBooksID = getBooksToLend();
    let url = `https://renti-library-api.herokuapp.com/loans`;
    let token = localStorage.getItem('token');
    fetch(url, {
        headers: {Authorization: `Bearer ${token}`},
        method: 'POST',
        body: JSON.stringify({
            booksID: aBooksID,
            returnDate: returndateInput.value == '' ? null: returndateInput.value  ,
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
        $('#lendModal').modal('hide');
      })
      .catch((error) => {
        console.log(error);
      });
}
function search() {
    let searchValue = document.getElementById("search-input").value;
    let url = "";

    url = `https://renti-library-api.herokuapp.com/books`;
    if(searchValue != "")
        url+=`?title=${searchValue}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.length > 0)
            {
                let searchResults = "";
                data.forEach(item => {
                    searchResults += `<div class="m-1 border border-dark card-body"><h2 class="bg-secondary card-title">${item.title} - <i>${item.author}</i> <span class="${item.borrowed ? 'text-danger':''}">${item.borrowed ? 'Borrowed':''}</span> </h2>${!item.borrowed ? `<input type="checkbox" class="chkBorrowBook" id="${item._id}" name="${item._id}" value="${item.bookid}">` : '' } ${item.synopsis}</div>`;
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
            alert("An error occurred while searching. Please try again later.");
        });
}
