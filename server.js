const express = require('express')
const session = require('express-session')
const mysql = require("mysql");
const path = require('path');
const app = express()
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const port = 80;
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

app.get('/', (req, res) => {
    req.sendFile(__dirname, './build/index.html');
})

app.post('/authcheck', (req, res) => {
    const sendData = { isLogin: '', name: '' };
    req.session.save(function () {
        if (req.session.is_logined) {
            sendData.name = req.session.name;
            sendData.isLogin = "True";
        } else sendData.isLogin = "False";
        res.send(sendData);
    });
})

app.post("/login", (req, res) => { // 로그인 데이터 받아옴
    const username = req.body.username;
    const password = req.body.password;
    const sendData = { isLogin: "" };


    if (username && password) {             // id와 pw가 입력되었는지 확인
        db.query('SELECT * FROM user WHERE email = ?', [username], function (error, results, fields) {
            //console.log(results[0]);
            //console.log(results[0].name);
            //console.log(results[0].email);
            //console.log(results[0].password);

            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있다 = 일치하는 아이디가 있다.   
                bcrypt.hash(results[0].password, 10, function (err, hash) {
                    if (err) { throw (err); }
                    bcrypt.compare(password, hash, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교
                        if (result === true) {            // 비밀번호가 일치하면
                            req.session.is_logined = true;      // 세션 정보 갱신
                            req.session.email = username;
                            req.session.name = results[0].name;
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

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/loginPage');
})

app.post("/signin", (req, res) => {  // 데이터 받아서 결과 전송
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const password = req.body.userPassword;
    const password2 = req.body.userPassword2;

    const sendData = { isSuccess: "" };

    if (userName && userEmail && password && password2) {
        db.query('SELECT * FROM user WHERE email = ?', [userEmail], function (error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0 && password == password2) {         // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우    // 입력된 비밀번호를 해시한 값
                db.query('insert into user(name,email,joinDate,password) values(?,?,SYSDATE(),?)', [userName, userEmail, password], function (error, data) {
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

app.post("/getBoard", (req, res) => {
    const category = req.body.category;
    db.query('SELECT * FROM page where category=?',[category], function (error, result) {
        res.send(result);
    });
});

app.post("/createBoard", (req, res) => {
    const category=req.body.pageCategory;
    const title=req.body.pageTitle;
    const content=req.body.pageContent;
    const sendData={send:''};
    const name=req.session.name;
    if(!category){
        sendData.send='카테고리를 지정해 주세요';
        res.send(sendData);
    }
    if(!title){
        sendData.send='제목을 입력해 주세요';
        res.send(sendData);
    }
    if(!content){
        sendData.send='내용을 입력해 주세요';
        res.send(sendData);
    }
    db.query('insert into page(title,content,category,writer) values(?,?,?,?)',[title, content, category,name], function (error, result) {
        if (error) throw error;
        sendData.complete = true;
        res.send(sendData);
    });
});

app.post("/getPage", (req, res) => {
    const id = req.body.input;
    console.log('id : '+id);
    db.query('SELECT * FROM page where id=?',[id], function (error, result) {
        res.send(result[0]);
        console.log(result[0]);
    });
});

app.post("/getProfileBoard", (req, res) => {
    const name = req.body.name;
    db.query('SELECT * FROM page where writer=?',[name], function (error, result) {
        res.send(result);
    });
});

app.post("/delete", (req, res) => {
    const id = req.body.id;
    db.query('delete FROM page where id=?',[id], function (error, result) {
        res.send(true);
    });
});