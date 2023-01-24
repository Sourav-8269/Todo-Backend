const express=require("express");
const { connection } = require("./db");

const cors=require("cors");


const app=express();

require('dotenv').config()

app.use(cors());

const {todoRouter}=require("./Routes/Todo.route");

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Todo App")
})

app.use("/todo",todoRouter)


app.listen(process.env.port,async ()=>{
    try{
        await connection;
        console.log("Connected to DB")
    }catch(err){
        
        console.log(err);
    }
})