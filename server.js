const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware для раздачи статических файлов из папки public
app.use(express.static('public'));

// Middleware для обработки данных форм (POST запросы)
app.use(express.urlencoded({ extended: true }));

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
  // Выводим данные формы в консоль для отладки
  console.log('Form data received:', req.body);
  
  // Получаем данные из формы
  const { name, email, message } = req.body;
  
  // Создаем объект с данными сообщения
  const contactData = {
    name: name,
    email: email,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  // БОНУС: Сохранение данных в JSON файл
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

// 404 страница (для всех неизвестных маршрутов)
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html');
});

// Запуск сервера на порту 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

