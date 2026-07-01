const API_BASE = "http://localhost:8080/api/v1/auth";

// ---- Tab switching ----
function showForm(type) {
document.getElementById('loginForm').classList.toggle('active', type === 'login');
document.getElementById('registerForm').classList.toggle('active', type === 'register');
document.getElementById('loginTab').classList.toggle('active', type === 'login');
document.getElementById('registerTab').classList.toggle('active', type === 'register');
}

// ---- Helper to show messages ----
function showMessage(elementId, text, isError) {
const el = document.getElementById(elementId);
el.textContent = text;
el.className = 'message ' + (isError ? 'error' : 'success');
}

// ---- LOGIN ----
document.getElementById('loginForm').addEventListener('submit', async function (e) {
e.preventDefault(); // stop the page from reloading on submit

const email = document.getElementById('loginEmail').value.trim();
const password = document.getElementById('loginPassword').value;
const btn = document.getElementById('loginBtn');

btn.disabled = true;
btn.textContent = 'Logging in...';

try {
    const response = await fetch(`${API_BASE}/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
    throw new Error(data.message || 'Invalid email or password');
    }


    // Save token so other pages can use it for authenticated requests
    if(!data.token) {
        throw new Error("Authentication token not")
    }
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('email', email);

    showMessage('loginMessage', 'Login successful! Redirecting...', false);

    // Next step: redirect to a dashboard page based on role.
    // For now, just confirm it worked.
    setTimeout(() => {
    alert('Token saved. Next we will build the dashboard page.');
    }, 500);

} catch (err) {
    showMessage('loginMessage', err.message, true);
} finally {
    btn.disabled = false;
    btn.textContent = 'Login';
}
});

// ---- REGISTER ----
document.getElementById('registerForm').addEventListener('submit', async function (e) {
e.preventDefault();

const firstname = document.getElementById('regFirstname').value;
const lastname = document.getElementById('regLastname').value;
const email = document.getElementById('regEmail').value;
const password = document.getElementById('regPassword').value;
const btn = document.getElementById('registerBtn');

btn.disabled = true;
btn.textContent = 'Creating account...';

try {
    const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstname, lastname, email, password })
    });

    if (!response.ok) {
    throw new Error('Registration failed. Try a different email.');
    }

    const data = await response.json();
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('email', email);

    showMessage('registerMessage', 'Account created! Redirecting...', false);

    // Redirecting after a short pause
    setTimeout(() => {
        window.location.href = "../dashboard/dashboard.html"
    }, 1000);

} catch (err) {
    showMessage('registerMessage', err.message, true);
} finally {
    btn.disabled = false;
    btn.textContent = 'Create account';
}
});