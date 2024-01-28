const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send({
    status: "Running",
    message: "Hello from backend api on server 2!"
  });
});

app.get('/anotherEndpoint', (req, res) => {
  res.send({
    path: "/api2/anotherEndpoint",
    status: "Running",
    message: "Endpoint content from server 2"
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
