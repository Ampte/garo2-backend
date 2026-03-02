const db = require("../db");
const express = require("express");
const router = express.Router();




/* GET CHATS*/ 
router.get("/api/getChats", (req, res) => {
    const sql = "SELECT * FROM chatbot";
    db.query(sql, ( error, result) => {
        if(error){
            res.json(error);
        }else{
            res.json(result);
        };
    });

});



/* GET CHATBOT RESPONSE*/ 
router.get("/api/getResponse", (req, res) => {
    const {quetion} = req.query;
    const sql = "SELECT * FROM chatbot WHERE question = ?";
    db.query(sql, (error, result) => {
        if(error){
            res.json(error);
        }else{
            res.json(result);
        };
    });

});



/* ADD CHATS*/ 
router.post("/api/addChats", (req, res) => {
    const {question, answer } = req.body;
    const sql = "INSERT INTO chatbot (question, answer) VALUES(?,?)";
    db.query(sql,[question, answer], (error, result) => {
       if(error){
        res.json({message : 'Server fail while adding chats'});
       }else{
        res.json({message: 'Chats added successfully'});
       };
    });
});


router.delete("/api/deleteChats/:id", (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM chatbot WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if(error){
            res.json({message: 'Server error while deleting chats'});
        }else{
            res.json({message: 'Chats deleted successfully'});
        };
    });
});

module.exports = router;