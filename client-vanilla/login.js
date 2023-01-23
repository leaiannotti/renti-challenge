function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('https://renti-library-api.herokuapp.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if(response.status == 401)
            alert("Invalid credentials");
        else{
            response.json()
                .then((data) => 
                    { 
                        localStorage.setItem('token', data.token)
                        var userData = parseJwt(data.token);
                        if (userData.role == "librarian")
                        {
                            window.location.href="librarianHome.html";
                        }
                        else
                        {
                            window.location.href="bookwormHome.html";
                        }
                        
                    });
        }
    })
    .catch(error => {
        alert(error.response.data.message);
    });
});

btnRegister.addEventListener('click', async (event) => {
    window.location.href="register.html";
});

btnGuest.addEventListener('click', async (event) => {
    window.location.href="guestHome.html";
});