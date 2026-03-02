const db = require("../db");
const express = require("express");
const router = express.Router();



router.get("/getUsers", (req, res) =>{
    const sql = "SELECT * FROM users";
    db.query(sql, (error, result) => {
        if(error){
            res.json(error);
        }else{
            res.json(result);
        };
    });
});


router.post("/addUsers", (req, res) => {
    const {name, email} = req.body;
    const sql = "INSERT INTO users(name, email) VALUES(?,?)";
    db.query(sql,[name, email],(error, result) => {
       if(error){
        res.json({message : 'Fail adding user'});
        console.log(error);
       }else{
        res.json({message: 'User added successfully'})
       }
    });
});


router.delete("/deleteUsers/:id", (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if(error){
            res.json({message: "Server error while deleting user"});
            console.log(error);
        }else{
            res.json({message: "User deleted successfully"});
        };
    });
});

module.exports = router;