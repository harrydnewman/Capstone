const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001; 

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Camera Wall running at http://localhost:${PORT}`);
});
