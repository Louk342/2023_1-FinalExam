const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const PORT = 3001;
const db = mysql.createPool({
    host: 'louk342.iptime.org',
    user: 'root',
    password: '@Kim9077865',
    database: 'main',
});
app.use(cors({
    origin:'*',
    credentials:true,
    optionsSuccessStatus:200,
}));
app.use(express.urlencoded({ extended: true }));
app.listen(PORT,()=>{
    console.log(`server run on ${PORT}`);
});
app.get("/api/server", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const sqlQuery = "select * from user";

    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});