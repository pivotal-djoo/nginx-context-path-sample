import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: "Running",
    message: "Hello from backend api app!"
  });
});

app.get('/endpoint', (req: Request, res: Response) => {
  res.send({
    path: "/api/endpoint",
    status: "Running",
    message: "Endpoint content"
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
