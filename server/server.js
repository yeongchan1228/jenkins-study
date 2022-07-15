const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send(200);
});

app.listen(port, () => {
    console.log('listening...');
});