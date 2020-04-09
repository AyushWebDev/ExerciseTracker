const express=require('express');
const User=require('../models/userModel');

const router=express.Router();

router.get('/',(req,res)=>{
    User.find()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    });
});

router.get('/:id',(req,res)=>{
    User.findById(req.params.id)
    .then(data=>{
        res.json({
            users: data
        });
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    });
});

router.post('/add',(req,res)=>{
    User.findOne({email: req.body.email})
    .then(data=>{
        if(data)
            return res.json({error: "Account with that email already exist"});
        
            const user=new User(req.body);
            user.save()
            .then(data=>{
                res.json({
                    msg: "user added",
                    result: data
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error: err
                })
            });
        
    });
   
});

router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({
            msg: "user deleted"
        })
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    });
});

router.post('/update/:id',(req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        user.username=req.body.username;
        user.save()
        .then(()=>{
            res.json("updated");
        })
        .catch(err=>{
            res.status(400).json({
                error: err
            })
        });
    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    });
});


module.exports=router;