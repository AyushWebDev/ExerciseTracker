const express=require('express');
const Exercise=require('../models/exerciseModel');
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
    Exercise.findById(req.params.id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    });
});

router.post('/add',(req,res)=>{
    const exer=new Exercise(req.body);
    exer.save()
    .then(()=>{
        res.json({
            msg: "exercise added"
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