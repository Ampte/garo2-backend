const db = require("../db");
const express = require("express");
const router = express.Router();




/* GET CHATS*/ 
router.get("/getChats", (req, res) => {
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
router.post("/getResponse", (req, res) => {

    const { input } = req.body;

    const sql = "SELECT * FROM chatbot WHERE question = ?";

    db.query(sql, [input], (error, result) => {

        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        res.json(result);
    });
});



/* ADD CHATS*/ 
router.post("/addChats", (req, res) => {
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


router.delete("/deleteChats/:id", (req, res) => {
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