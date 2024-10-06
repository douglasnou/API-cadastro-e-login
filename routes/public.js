import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";

export const prisma = new PrismaClient();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//Cadastro
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body
        const salt = await bcrypt.genSalt(10); //encripta a senha conforme o nível dado
        const hashPassword = await bcrypt.hash(user.password, salt);//cria o hash de senha


        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        })
        res.status(201).json(userDB)
    } catch (error) {
        res.status(500).json("server error, try again.")
    }
});

router.post('/login', async (req, res)=>{
    try {
        const userInfo = req.body

        const user = await prisma.user.findUnique({
            where: {email: userInfo.email},
        })

        if(!user){
            return res.status(404).json({message: 'user not found.'});
        }//compara os email digitado com o email guardado no DB

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "invalid password! try again."});
        }//compara a senha digita com a senha guardada no DB

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json("server error, try again.");
    };
});


//visitors
router.post('/cadastrar-visitor', async (req, res)=>{
    try {
        const visitor = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(visitor.password, salt);

        const newVisitor = await prisma.visitor.create({
            data:{
                name: visitor.name,
                email: visitor.email,
                password: hashPassword,
            },
        });
        res.status(200).json({newVisitor});
    } catch (error) {
        res.status(500).json("server error, try again.");
    }
});

router.post('/login-visitor', async (req, res)=>{
    try {
        const visitorInfo = req.body;

        const visitor = await prisma.visitorInfo.findUnique({
            where: {email: visitorInfo.email},
        });
        if(!visitor){
            return res.status(404).json({message: 'user not found.'});
        };

        const isMatch = await bcrypt.compare(visitorInfo.password, visitor.password);
        if(!isMatch){
            return res.status(400).json({message: "invalid password! try again."});
        }
        const token = await jwt.sign({id: visitor.id}, JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json("server error, try again.");
    }
})

export default router;
