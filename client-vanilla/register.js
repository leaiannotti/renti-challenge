const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    fetch('http://localhost:61535/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, firstname, lastname })
    })
    .then(response => {
        if(response.status == 400){//Bad request
            response.json().then((data) => {
                alert(data.message);
                return
            })
        }
        else{
           alert("succcess");
           window.location.href="login.html";
        }
    })
    .catch(error => {
        alert(error.response.data.message);
    });
});
