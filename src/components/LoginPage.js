import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
function LoginPage(props) {
    console.log('1');
    const [mode, setMode] = useState("LOGIN");
    useEffect(() => {
        console.log('2');
        fetch("http://localhost:3001/authcheck")
            .then((res) => res.json()).then((json) => {
                console.log('3');
                console.log(json.isLogin);
                if (json.isLogin == "True") setMode("WELCOME");
                else setMode("LOGIN");
            });
            console.log('4');
    }, []);
    let content = null;
    if (mode === "LOGIN") content = <Login setMode={setMode} />
    else if (mode === 'REGISTER') content = <Register setMode={setMode} />
    else if (mode === 'WELCOME') {
        content = <>
            <h2>메인 페이지에 오신 것을 환영합니다</h2>
            <p>로그인에 성공하셨습니다.</p>
            <a href="/logout">로그아웃</a>
        </>
    }

    return (
        <div style={{ borderRadius: '30px', backgroundColor: '#999999', width: '500px', margin: '100px auto', padding: '20px', height: '500px', boxShadow: ' 0 4px 8px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19)' }}>
            {content}
        </div>
    );
};



function Login(props) {
    let [inputID, setInputID] = useState('');
    let [inputPW, setInputPW] = useState('');
    return (
        <div style={{ color: 'white' }}>

            <img src={require('../img/mainLogo.png')} style={{ padding: '10px', width: '100px' }} />
            <h1>로그인</h1>
            <div style={{ width: '330px', margin: ' 10px auto' }}>
                <div style={{ margin: '10px' }}><TextField fullWidth margin='normal' label="E-mail" variant="filled" onChange={event => { setInputID(event.target.value); }} /></div>
                <div style={{ margin: '10px' }}><TextField fullWidth margin='normal' type="Password" label="Password" variant="filled" onChange={event => { setInputPW(event.target.value); }} /></div>
                <span><FormControlLabel control={<Checkbox />} label="자동 로그인" /></span>
                <span style={{ margin: '5px' }}><Button variant='contained' sx={{ backgroundColor: '#444444' }}
                    onClick={() => {
                        const userData = {
                            username: inputID,
                            password: inputPW,
                        };
                        fetch("http://localhost:3001/login", { //auth 주소에서 받을 예정
                            method: "post", // method :통신방법
                            headers: {      // headers: API 응답에 대한 정보를 담음
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(userData), //userData라는 객체를 보냄
                        })
                            .then((res) => res.json())
                            .then((json) => {
                                if (json.isLogin === "True") props.setMode("WELCOME");
                                else alert(json.isLogin)
                            }
                            );
                    }}
                >로그인</Button></span>
                <span style={{ margin: '5px' }}><Button variant='contained' sx={{ backgroundColor: '#444444' }} onClick={() => { props.setMode("REGISTER"); }}>회원가입</Button></span>
            </div>
        </div>
    );
}


function Register(props) {
    const [inputName, setInputName] = useState('');
    const [inputID, setInputID] = useState('');
    const [inputPW, setInputPW] = useState('');
    const [inputPW2, setInputPW2] = useState('');
    return (
        <div>
            <img src={require('../img/mainLogo.png')} style={{ padding: '10px', width: '100px' }} />
            <h1>로그인</h1>
            <div style={{ width: '330px', margin: ' 10px auto' }}>
                <div style={{ margin: '10px' }}><TextField fullWidth margin='normal' label="User name" variant="filled" onChange={event => { setInputName(event.target.value); }} /></div>
                <div style={{ margin: '10px' }}><TextField fullWidth margin='normal' label="E-mail" variant="filled" onChange={event => { setInputID(event.target.value); }} /></div>
                <div style={{ margin: '10px' }}><TextField fullWidth margin='normal' type="Password" label="Password" variant="filled" onChange={event => { setInputPW(event.target.value); }} /></div>
                <div style={{ margin: '10px' }}><TextField fullWidth margin='normal' type="Password" label="Re-Password" variant="filled" onChange={event => { setInputPW2(event.target.value); }} /></div>
                <span style={{ margin: '5px' }}><Button variant='contained' sx={{ backgroundColor: '#444444' }}
                    onClick={() => {
                        const userData = {
                            userName:inputName,
                            userId: inputID,
                            userPassword: inputPW,
                            userPassword2: inputPW2,
                        };
                        fetch("http://localhost:3001/signin", { //signin 주소에서 받을 예정
                            method: "post", // method :통신방법
                            headers: {      // headers: API 응답에 대한 정보를 담음
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(userData), //userData라는 객체를 보냄
                        })
                            .then((res) => res.json())
                            .then((json) => {
                                if (json.isLogin === "True"){
                                    alert('회원가입이 완료되었습니다!');
                                    props.setMode("LOGIN");
                                }
                                else alert(json.isSuccess);
                            }
                            );
                    }} >회원가입</Button></span>
            </div>
        </div>
    );
}

export default LoginPage;