import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "1-2 test" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
