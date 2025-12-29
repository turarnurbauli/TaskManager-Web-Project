const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware для раздачи статических файлов из папки public
app.use(express.static('public'));

// Middleware для обработки данных форм (POST запросы)
app.use(express.urlencoded({ extended: true }));

// ============================================
// CUSTOM LOGGER MIDDLEWARE
// ============================================
// Логирует HTTP метод и URL каждого запроса
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Передает управление следующему middleware/маршруту
});

// ============================================
// МАРШРУТЫ (ROUTES)
// ============================================

// Главная страница (Home)
app.get('/', (req, res) => { 
  res.sendFile(__dirname + '/views/index.html');
});

// Страница "О проекте" (About)
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

// Страница "Контакты" - GET (показать форму)
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Страница "Контакты" - POST (обработать форму)
app.post('/contact', (req, res) => {
  // Получаем данные из формы
  const { name, email, message } = req.body;
  
  // ВАЛИДАЦИЯ: Проверяем наличие обязательных полей
  if (!name || !email || !message) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - TaskManager</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <header>
          <nav>
            <div class="logo">
              <h1>TaskManager</h1>
            </div>
            <ul class="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <div class="error-message">
            <h2>Error 400: Bad Request</h2>
            <p>Please fill in all required fields (name, email, message).</p>
            <a href="/contact" class="btn-primary">Back to Contact Form</a>
          </div>
        </main>
      </body>
      </html>
    `);
  }
  
  // Выводим данные формы в консоль для отладки
  console.log('Form data received:', req.body);
  
  // Создаем объект с данными сообщения
  const contactData = {
    name: name,
    email: email,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  // Сохранение данных в JSON файл
  const dataFilePath = path.join(__dirname, 'messages.json');
  
  // Читаем существующие сообщения (если файл существует)
  let messages = [];
  if (fs.existsSync(dataFilePath)) {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      messages = JSON.parse(data);
    } catch (error) {
      console.error('Error reading messages file:', error);
    }
  }
  
  // Добавляем новое сообщение
  messages.push(contactData);
  
  // Сохраняем обновленные сообщения в файл
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 2), 'utf8');
    console.log('Message saved to messages.json');
  } catch (error) {
    console.error('Error saving message:', error);
  }
  
  // Отправляем ответ пользователю
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - TaskManager</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <header>
        <nav>
          <div class="logo">
            <h1>TaskManager</h1>
          </div>
          <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <div class="success-message">
          <h2>Thank you, ${name}!</h2>
          <p>Your message has been received successfully.</p>
          <p>We will get back to you at <strong>${email}</strong> as soon as possible.</p>
          <a href="/" class="btn-primary">Return to Home</a>
        </div>
      </main>
    </body>
    </html>
  `);
});

// ============================================
// НОВЫЕ МАРШРУТЫ ДЛЯ ASSIGNMENT 2 PART 1
// ============================================

// Маршрут /search с query параметром q
app.get('/search', (req, res) => {
  const query = req.query.q; // Получаем query параметр q
  
  // ВАЛИДАЦИЯ: Если параметр q отсутствует, возвращаем 400
  if (!query || query.trim() === '') {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - TaskManager</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <header>
          <nav>
            <div class="logo">
              <h1>TaskManager</h1>
            </div>
            <ul class="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <div class="error-message">
            <h2>Error 400: Bad Request</h2>
            <p>Missing required query parameter 'q'.</p>
            <p>Usage: <code>/search?q=your_search_term</code></p>
            <a href="/" class="btn-primary">Return to Home</a>
          </div>
        </main>
      </body>
      </html>
    `);
  }
  
  // Если параметр есть, отправляем страницу с результатами поиска
  res.sendFile(__dirname + '/views/search.html');
});

// Маршрут /item/:id с route параметром id
app.get('/item/:id', (req, res) => {
  const itemId = req.params.id; // Получаем route параметр id
  
  // ВАЛИДАЦИЯ: Если параметр id отсутствует, возвращаем 400
  if (!itemId || itemId.trim() === '') {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - TaskManager</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <header>
          <nav>
            <div class="logo">
              <h1>TaskManager</h1>
            </div>
            <ul class="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <div class="error-message">
            <h2>Error 400: Bad Request</h2>
            <p>Missing required route parameter 'id'.</p>
            <p>Usage: <code>/item/:id</code></p>
            <a href="/" class="btn-primary">Return to Home</a>
          </div>
        </main>
      </body>
      </html>
    `);
  }
  
  // Если параметр есть, отправляем страницу с информацией об элементе
  res.sendFile(__dirname + '/views/item.html');
});

// API endpoint /api/info - возвращает JSON
app.get('/api/info', (req, res) => {
  // Возвращаем информацию о проекте в формате JSON
  res.json({
    project: {
      name: 'TaskManager',
      version: '2.0.0',
      description: 'A simple and intuitive web application for task management',
      team: [
        {
          name: 'Turar Nurbauli',
          group: 'SE2425',
          role: 'Developer & Project Manager'
        },
        {
          name: 'Alkhan Almas',
          group: 'SE2425',
          role: 'Developer & UI/UX Designer'
        }
      ],
      technologies: [
        'Node.js',
        'Express.js',
        'HTML5',
        'CSS3',
        'JavaScript'
      ],
      routes: [
        { method: 'GET', path: '/', description: 'Home page' },
        { method: 'GET', path: '/about', description: 'About page' },
        { method: 'GET', path: '/contact', description: 'Contact form page' },
        { method: 'POST', path: '/contact', description: 'Submit contact form' },
        { method: 'GET', path: '/search?q=...', description: 'Search with query parameter' },
        { method: 'GET', path: '/item/:id', description: 'Item details by ID' },
        { method: 'GET', path: '/api/info', description: 'Project information (JSON)' }
      ],
      timestamp: new Date().toISOString()
    }
  });
});

// 404 страница (для всех неизвестных маршрутов)
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html');
});

// Запуск сервера на порту 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

