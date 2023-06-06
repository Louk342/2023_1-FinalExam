import React from 'react';
import { useState, useEffect } from 'react';
function Login(){
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    return (
        <div>
            <h1 style={{color:'white'}}>로그인</h1>
        </div>
    );
};
export default Login;