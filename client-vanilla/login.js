const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    debugger;
    try {
        const response = await axios.post('/api/login', { username, password });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // redirect to protected page or home page
    } catch (err) {
        alert(err.response.data.message);
    }
});