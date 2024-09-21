import express, { Express, Request, Response } from 'express';
import { db } from 'models';
import { apiProjects } from 'models/schema';

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;


app.get('/', async (req: Request, res: Response) => {
  const projects = await db.select().from(apiProjects).limit(10)
  res.json({ message: projects });
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});