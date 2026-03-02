const db = require("../db");
const express = require("express");
const router = express.Router();



router.get("/getWords", (req, res) => {
    const sql = "SELECT * FROM dictionary";
    db.query(sql, (error, result) => {
        if(error){
            res.json(error);
        }else{
            res.json(result);
        };
    });
});


router.post("/addWords", (req, res) => {
    const {english, garo } = req.body;
    const sql = "INSERT INTO dictionary(english, garo) VALUES(?,?)";
    db.query(sql,[english, garo], (error, result) => {
        if(error){
            res.json({message:'Server error while adding words'});
        }else{
            res.json({message: 'Words added successfully'});
        };
    });
});


router.delete("/deleteWord/:id", (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM dictionary WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if(error){
            res.json({message: 'Server error while deleting word'});
        }else{
            res.json({message: 'Word deleted successfully'});
        };
    });
});

module.exports = router;