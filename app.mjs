import {database} from './db.mjs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit-form', (req, res) => {
    const name = req.body.name;
    const db = new database();
    db.init(name);
    console.log(`Received input: Name - ${name}`);
    res.send(`<h1>Thank you, ${name}!<\h1>`);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
