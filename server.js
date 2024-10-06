import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";
import corsMiddlware from "./middlewares/cors.js";

export const app = express();
app.use(express.json());

app.use('/', corsMiddlware, publicRoutes);
app.use('/', corsMiddlware, auth, privateRoutes);

app.listen(5000, ()=>{
    console.log(`Server is running.`);
});