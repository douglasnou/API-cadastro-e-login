import cors from "cors";
import { app } from "../server.js";

const corsMiddlware = (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "Content-Type");

    app.use(cors());

    next();
};

export default corsMiddlware;