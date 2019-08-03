const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server's running on port ${port}`));
app.get('/', (req, res) => res.send('hello from the mern intro'));
