const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});