//imports
const express= require('express')
const mongoose =require('mongoose')
const cors =require('cors')
const bodyParser=require('body-parser')
const app=express()
const Student =require('./modles/Students')
const Students = require('./modles/Students')
//db conn
mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://abc:123@cluster0.kcyrqot.mongodb.net/students?retryWrites=true&w=majority')

mongoose.connection.on('connected',()=>{
    console.log('Database connected');
})
mongoose.connection.on('error',()=>{
    console.log('error occured')
})
//middleware
app.use(cors())
app.use(express.json())
//routs
app.get('/',(req,res)=>{
    Student.find().exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
})
app.get('/',(req,res)=>{
    console.log('get request');
    res.send('get request');
})
app.post('/students',(req,res)=>{
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    const students=new Student ({
        _id:new mongoose.Types.ObjectId,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        place:req.body.place,
    });
    students.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"succesfully submitted"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurd"});
    })
})
app.delete('/students/:id',(req,res)=>{
    const id=req.params.id;
    Student.remove({_id:id},(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("error occurd");
        }
        else {
            res.status(200).json({msg:"successfully deleted"});
        }
    })
})

app.put('/students/:id', (req, res) => {
    const firstname=req.body.firstname;
    const lastname =req.body.lastname;
    const place= req.body.place;
    const id= req.params.id;
    Student.updateOne({_id:id},{$set:{firstname:firstname,lastname:lastname,place:place}})
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"succesfully submitted"});
    })
    .catch(err=>{
        res.status(500).json({msg:"error occurd"});
    })
  })
//server
app.listen(5000,()=>{
    console.log('Server was connected on Port :5000');
})