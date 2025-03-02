const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'films_info',
    password: '2108',
    port: 5432,
});

client.connect()
    .then(() => console.log("Подключено к PostgreSQL"))
    .catch(err => console.error("Ошибка подключения:", err));

app.get('/movies', async (req, res) => {
    try {
        const result = await client.query("SELECT title, release_year, director, box_office, country FROM films");
        res.json(result.rows);
    } catch (err) {
        console.error("Ошибка запроса:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));
