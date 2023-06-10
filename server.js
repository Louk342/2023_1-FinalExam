const express = require('express')
const session = require('express-session')
const mysql = require("mysql");
const path = require('path');
const app = express()
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const port = 3001
const routes = require('./routes.js');
const db = require('./server/db');
const options = require('./server/sessionOption');
var MySQLStore = require('express-mysql-session')(session);

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => { console.log(`server running on port ${port}`); });


var sessionStore = new MySQLStore(options);
app.use(session({
    key: 'session_cookie_name',
    secret: '~',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

var connection = mysql.createConnection(options); // or mysql.createPool(options);
sessionStore = new MySQLStore({} /* session store options */, connection);


app.use(express.static(__dirname + "./build"));

app.post('/authcheck',(req,res)=>{
    const sendData = { isLogin: '',name:'' };
    req.session.save(function () {
        if (req.session.is_logined) {
            console.log(req.session);
            sendData.name=req.session.name;
            sendData.isLogin = "True";
        }else sendData.isLogin = "False";
        res.send(sendData);
    });
})

app.post('/logout',(req,res)=>{
    req.session.destroy();
    //여기서 매인페이지로 돌아가거나 loginPage를 갱신해야하는데 리다이렉트론 안됨
    res.redirect('/loginPage');
})

app.post("/login", (req, res) => { // 로그인 데이터 받아옴
    const username = req.body.username;
    const password = req.body.password;
    const sendData = { isLogin: "" };

    console.log(req.body);

    if (username && password) {             // id와 pw가 입력되었는지 확인
        db.query('SELECT * FROM user WHERE email = ?', [username], function (error, results, fields) {
            console.log(results[0]);
            console.log(results[0].name);
            console.log(results[0].email);
            console.log(results[0].password);
            
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있다 = 일치하는 아이디가 있다.   
                bcrypt.hash(results[0].password, 10, function(err, hash) {if (err) { throw (err); } 
                    bcrypt.compare(password, hash, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교
                        if (result === true) {            // 비밀번호가 일치하면
                            console.log('before : '+req.session.is_logined);
                            req.session.is_logined = true;      // 세션 정보 갱신
                            console.log('after : '+req.session.is_logined);
                            req.session.email = username;
                            req.session.name=results[0].name;
                            req.session.save(function () {
                                sendData.isLogin = "True"
                                res.send(sendData);
                            });
                        }
                        else {                                   // 비밀번호가 다른 경우
                            sendData.isLogin = "로그인 정보가 일치하지 않습니다."
                            res.send(sendData);
                        }
                    })
              });
                
            } else {    // db에 해당 아이디가 없는 경우
                sendData.isLogin = "아이디 정보가 일치하지 않습니다."
                res.send(sendData);
            }
        });
    } else {            // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);
    }
});

app.post("/signin", (req, res) => {  // 데이터 받아서 결과 전송
    const userName = req.body.inputName;
    const userID = req.body.inputID;
    const password = req.body.inputPW;
    const password2 = req.body.inputPW2;

    const sendData = { isSuccess: "" };

    if (userName && userID && password && password2) {
        db.query('SELECT * FROM user WHERE email = ?', [userID], function (error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0 && password == password2) {         // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
                const hasedPassword = bcrypt.hashSync(password, 10);    // 입력된 비밀번호를 해시한 값
                db.query('insert into user values(?,?,SYSDATE(),?,1,1);', [userName, userID, hasedPassword], function (error, data) {
                    if (error) throw error;
                    req.session.save(function () {
                        sendData.isSuccess = "True"
                        res.send(sendData);
                    });
                });
            } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우                  
                sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다."
                res.send(sendData);
            }
            else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우            
                sendData.isSuccess = "이미 존재하는 아이디 입니다!"
                res.send(sendData);
            }
        });
    } else {
        sendData.isSuccess = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);
    }

});

app.get('/', (req, res) => {
    req.sendFile(__dirname, './build/index.html');
})

app.post("/getBoard", (req, res) => {
    var sendData = null;
    const sqlQuery = "SELECT * FROM page;";
    db.query(sqlQuery, (err, result) => {
        sendData=result;
        res.send(sendData);
    });
  });