const loginForm = document.getElementById('btnLogin');
btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    debugger;
    try {
        const response = await axios.post('https://renti-library-api.herokuapp.com/auth/login', { username, password });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // redirect to protected page or home page
    } catch (err) {
        alert(err.response.data.message);
    }
});