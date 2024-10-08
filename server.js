import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.listen(5000, ()=>{
    console.log(`Server is running.`);
});