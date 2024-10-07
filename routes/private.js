import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

router.get('/listar-usuarios', async (req, res)=>{
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ message: "success to list users" });
    } catch (error) {
        res.status(500).json({message: "server error, try again."});
    }
});



//produtos
router.get('/produtos', async (req, res)=>{
    try {
       const products = await prisma.product.findMany(); 
       res.status(200).json({products});
    } catch (error) {
        res.status(500).json({message: "Was not possible, try again."})
    }
})

router.post('/criar-produto', async (req, res)=>{
    try {
        const product = req.body;

        const newProduct = await prisma.product.create({
            data:{
                name: product.name,
                status: product.status,
            },
        });

        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "was not possible to create product."});
    };
});

router.put('/atualizar-produto', async (req, res)=>{
    try {
        const product = req.body

        const updateProduct = await prisma.product.update({where: {id: product.id}, data:{
            status: product.status,
        }});
        res.status(200).json({message: "success to update product.", updateProduct});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "was not possible update this product"});
    };
});

router.delete('/deletar-produto', async (req, res)=>{
    try {
      const product = req.body;
      const productDeleted = await prisma.product.delete({where: {id: product.id}});
      res.status(200).json({message: "Product deleted with success."});  
    } catch (error) {
        res.status(500).json({message: "wasn 't possible delete this product, try again later."});
    };
});

export default router;