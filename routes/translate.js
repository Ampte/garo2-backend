const db = require("../db");
const express = require("express");
const router = express.Router();

router.post("/translate", (req, res) => {

    const { text, from, to } = req.body;

    if (!text || !from || !to) {
        return res.status(400).json({
            message: "Missing parameters"
        });
    }

    let sql = "";
    let column = "";

    if (to === "garo" && from === "english") {
        sql = "SELECT garo AS translation FROM dictionary WHERE english = ?";
    } 
    else if (to === "english" && from === "garo") {
        sql = "SELECT english AS translation FROM dictionary WHERE garo = ?";
    } 
    else {
        return res.status(400).json({
            message: "Invalid language pair"
        });
    }

    db.query(sql, [text], (error, result) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.json({
                translation: "Word not found"
            });
        }

        res.json({
            translation: result[0].translation
        });
    });
});

module.exports = router;