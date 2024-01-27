const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send({
    status: "Running",
    message: "Hello from backend api app!"
  });
});

app.get('/endpoint', (req, res) => {
  res.send({
    path: "/api/endpoint",
    status: "Running",
    message: "Endpoint content"
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
