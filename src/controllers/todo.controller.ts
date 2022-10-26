import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const all = async (req:Request, res:Response) => {
    const list = await prisma.todo.findMany();
    res.json({ list });
}


export const add = async (req:Request, res:Response) => {
    if(req.body.title){
        let newTodo = await prisma.todo.create({
            data : {
                title: req.body.title,
                done: Boolean(req.body.done) ? true : false
            }
        })

        res.status(201).json({item: newTodo});
    }
    else{
        res.json({error: 'Dados não enviados'})
    }
}


export const update = async (req:Request, res:Response) => {
    let id:number =  parseInt(req.params.id)
    let task = await prisma.todo.findFirst({
        where: {
            id: id
        }
    })
    if(task){
        if(req.body.title){
            task = await prisma.todo.update({
                where: {
                    id: id
                },
                data : {
                    title: req.body.title
                }
            })
        }

        if(req.body.done){
            switch(req.body.done.toLowerCase()){
                case 'true':
                case '1':
                    task = await prisma.todo.update({
                        where: {
                            id: id
                        },
                        data : {
                            done: true
                        }
                    })
                    break;
                case 'false':
                case '0':
                    task = await prisma.todo.update({
                        where: {
                            id: id
                        },
                        data : {
                            done: false
                        }
                    })
                    break;
            }
        }
        res.json({item : task});
    }
    else{
        res.json({error: 'Dados não enviados'})
    }
}


export const remove = async (req:Request, res:Response) => {
    let id:number =  parseInt(req.params.id)
    let task = await prisma.todo.findFirst({
        where: {
            id: id
        }
    })
    if(task){
        task = await prisma.todo.delete({
            where: {
                id: id
            }
        })
        res.json({item : task});
    }
    else{
        res.json({error: 'Dados não encontrados'})
    }
}