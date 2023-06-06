import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function register(){
    let [inputID,setInputID]=useState();
    let [inputPW,setInputPW]=useState();
    return (
        <div style={{color:'white'}}>
            <div style={{borderRadius:'30px',backgroundColor:'#999999',width:'500px',margin:'100px auto',padding:'20px',height:'500px',boxShadow:' 0 4px 8px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19)'}}>
                <img src={require('../img/mainLogo.png')} style={{ padding: '10px', width: '100px' }} />
                <h1>회원가입</h1>
                <div style={{width:'330px',margin:' 10px auto'}}>
                    <div style={{margin:'10px'}}><TextField fullWidth margin='normal' label="E-mail" variant="filled" inputProps={inputID}/></div>
                    <div style={{margin:'10px'}}><TextField fullWidth margin='normal' type="Password" label="Password" variant="filled" inputProps={inputPW}/></div>
                    <span style={{margin:'30px'}}><Button variant='contained' sx={{backgroundColor:'#444444'}}>회원가입</Button></span>
                </div>
            </div>
        </div>
    );
};
export default register;