const express=require("express");

const { TodoModel } = require("../Models/Todo.model");

const todoRouter=express.Router();

todoRouter.get("/",async (req,res)=>{
    try{
        const data=await TodoModel.find();
        res.send(data)
    }catch(err){
        res.send(err);
    }
})

todoRouter.post("/add",async (req,res)=>{
    const data=req.body;
    // console.log(req.body)
    try{
        const todo=new TodoModel(data)
        await todo.save();
        // console.log(hero)
        res.send("Added Todo")
    }catch(err){
        res.send("Someting Went Wrong",err);
        console.log(err)
    }
})

todoRouter.patch("/edit/:id",async (req,res)=>{
    const id=req.params.id
    const payload=req.body;
    // console.log(id)
    try{
        await TodoModel.findByIdAndUpdate({_id:id},payload);
        res.send("Updated Todo with id "+id);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

todoRouter.put("/replace/:id",async (req,res)=>{
    const id=req.params.id
    const payload=req.body;
    // console.log(id)
    try{
        await TodoModel.findOneAndReplace({_id:id},payload);
        res.send("Replaced Todo with id "+id);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

todoRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id
    // console.log(id)
    try{
        await TodoModel.findByIdAndDelete({_id:id});
        res.send("Deleted Todo with id "+id);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

module.exports={todoRouter};
