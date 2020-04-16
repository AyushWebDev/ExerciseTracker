const express=require('express');
const Exercise=require('../models/exerciseModel');
const User=require("../models/userModel")
const router=express.Router();

router.get('/',(req,res)=>{
    Exercise.find()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    });
});

router.get('/:id',(req,res)=>{
    Exercise.find({postedby: req.params.id})
    .populate("postedby","_id username")
    .exec((err,exer)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(exer);
        console.log(exer);
    
    });
});

router.post('/add/:userid',(req,res)=>{
    let exer=new Exercise(req.body);
    
    // User.findById(req.params.userid)
    // .then(user=>{
    //     exer.postedby=user
    // });

    

    exer.save()
    .then(exercise=>{
       
        
        res.json({
            msg: "exercise added",
            exercise
        })
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        });
    });
});

router.delete('/:id',(req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({
            msg: "exercise deleted"
        })
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    });
});

router.post('/update/:id',(req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>{
        exercise.username=req.body.username;
        exercise.description=req.body.description;
        exercise.duration=req.body.duration;
        exercise.save()
        .then(()=>{
            res.json("updated");
        })
        .catch(err=>{
            res.status(400).json({
                error: err
            })
        })
        .catch(err=>{
            res.status(400).json({
                error: err
            })
        })
    })
})

module.exports=router;