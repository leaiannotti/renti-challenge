const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    debugger;
    fetch('http://localhost:61535/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('token', data.token);
    })
    .catch(error => {
        alert(error.response.data.message);
    });
});

btnRegister.addEventListener('click', async (event) => {
    window.location.href="register.html";
});