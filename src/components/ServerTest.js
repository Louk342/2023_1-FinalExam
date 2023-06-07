const express = require("express"); 
const app     = express();   // npm i cors | yarn add cors
const mysql   = require("mysql");
const PORT    = 3001; // 포트번호 설정
var db = mysql.createConnection({
    host: 'louk342.iptime.org',
    user: 'root',
    password: '@Kim9077865',
    database: 'main'
});
app.use(express.urlencoded({ extended: true })) 

// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
app.get('/',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM user";

    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
})