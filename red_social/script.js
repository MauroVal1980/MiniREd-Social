// Base de datos de usuarios
const usersDB = [
    { username: "Cesar_C", password: "clave123", name: "Cesar Correa" },
    { username: "maria_g", password: "abc123", name: "Ana Maria" },
    { username: "Sebas_3D", password: "qwerty", name: "Sebas L" },
    { username: "Anita Val", password: "design456", name: "Ana Diseño" },
    { username: "yogui_M", password: "admin123", name: "Lucho M" }
];

// Elementos del DOM
const loginSection = document.getElementById('login-section');
const timelineSection = document.getElementById('timeline-section');
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const welcomeUsername = document.getElementById('welcome-username');
const usernameDisplay = document.getElementById('username-display');
const userInfo = document.getElementById('user-info');
const logoutBtn = document.getElementById('logout-btn');
const postsContainer = document.getElementById('posts-container');

// Ejemplos de posts
const posts = [
    {
        user: "María López",
        time: "Hace 2 horas",
        content: "¡Acabo de terminar mi proyecto de programación! 🎉 #coding #webdev",
        imgSrc: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        user: "Carlos Martínez",
        time: "Hace 5 horas",
        content: "¿Alguien sabe de algún buen tutorial de JavaScript moderno? Estoy tratando de mejorar mis habilidades.",
        imgSrc: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        user: "Ana Torres",
        time: "Ayer",
        content: "Comparto este increíble artículo sobre tendencias en diseño UI/UX para 2023. ¡Muy recomendado! 👇",
        link: "www.design-trends-2023.com",
        imgSrc: "https://randomuser.me/api/portraits/women/44.jpg"
    }
];

// Cargar posts en el timeline
function loadPosts() {
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = "post-card bg-white p-6 rounded-xl shadow-md";
        postCard.innerHTML = `
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="${post.imgSrc}" alt="Usuario">
                </div>
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-900">${post.user}</h3>
                        <p class="text-xs text-gray-500">${post.time}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-700">
                        ${post.content} ${post.link ? `<br><a href="#" class="text-indigo-600 hover:text-indigo-800">${post.link}</a>` : ''}
                    </p>
                    <div class="mt-2 flex space-x-4">
                        <button class="text-xs text-gray-500 hover:text-indigo-600">Me gusta</button>
                        <button class="text-xs text-gray-500 hover:text-indigo-600">Comentar</button>
                        <button class="text-xs text-gray-500 hover:text-indigo-600">Compartir</button>
                    </div>
                </div>
            </div>
        `;
        postsContainer.appendChild(postCard);
    });
}

// Manejar el envío del formulario
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validar usuario y contraseña
    const user = usersDB.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Login exitoso
        loginSuccessful(user);
    } else {
        // Login fallido
        loginFailed();
    }
});

// Función para manejar login exitoso
function loginSuccessful(user) {
    // Ocultar mensaje de error si está visible
    errorMessage.classList.add('hidden');
    
    // Mostrar sección de timeline
    loginSection.classList.add('hidden');
    timelineSection.classList.remove('hidden');
    
    // Mostrar nombre de usuario
    welcomeUsername.textContent = user.name;
    usernameDisplay.textContent = user.name;
    userInfo.classList.remove('hidden');
    
    // Resetear formulario
    loginForm.reset();
    
    // Cargar posts
    loadPosts();
}

// Función para manejar login fallido
function loginFailed() {
    // Mostrar mensaje de error
    errorMessage.classList.remove('hidden');
    
    // Agregar animación de shake al formulario
    loginSection.classList.add('shake');
    setTimeout(() => {
        loginSection.classList.remove('shake');
    }, 500);
    
    // Mantener timeline oculto
    timelineSection.classList.add('hidden');
}

// Manejar logout
logoutBtn.addEventListener('click', function() {
    // Mostrar formulario de login y ocultar timeline
    loginSection.classList.remove('hidden');
    timelineSection.classList.add('hidden');
    userInfo.classList.add('hidden');
});

// Inicializar: asegurar que solo el formulario de login esté visible al cargar
timelineSection.classList.add('hidden');
errorMessage.classList.add('hidden');
userInfo.classList.add('hidden');
