import React, { useEffect } from 'react';
import Button from '@mui/joy/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function Write(props) {
    useEffect(() => {
        fetch("http://louk342.iptime.org:3001/authcheck", {
            method: "post", // method :통신방법
            headers: { "content-type": "application/json", },    // headers: API 응답에 대한 정보를 담음
        })
            .then((res) => res.json()).then((json) => {
                if (json.isLogin === "True") {}
                else {
            alert('로그인 하신 뒤 사용해 주세요');
            window.location.replace('http://louk342.iptime.org:3001/loginPage');
            }});
    }, []);
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [content, setContent] = useState();
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <div><h1 style={{ color: 'white' }}>게시물 작성</h1></div>
            <div style={{ borderRadius: '10px', backgroundColor: '#999999', height: '60px', width: 'auto', margin: '10px', padding: '10px', boxShadow: ' 0 4px 8px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19)' }}>
                <span style={{ float: 'right' }}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel>게시판</InputLabel>
                            <Select value={category} onChange={handleChange}>
                                <MenuItem value={1}>자유게시판</MenuItem>
                                <MenuItem value={2}>클랜게시판</MenuItem>
                                <MenuItem value={3}>공략게시판</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </span>
                <span style={{ float: 'left', width: '450px' }}>
                    <TextField label="제목" color='info' fullWidth sx={{ float: 'left' }} onChange={event => { setTitle(event.target.value); }} />
                </span>
            </div>
            <div style={{ borderRadius: '10px', backgroundColor: '#999999', minHeight: 'auto', width: 'auto', margin: '10px', padding: '10px', boxShadow: ' 0 4px 8px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19)' }}>
                <TextField label="게시글" multiline rows={30} color='info' sx={{ width: '100%', }} onChange={event => { setContent(event.target.value); }} />
                <Button sx={{ backgroundColor: '#444444', margin: '10px', color: 'white' }}
                    onClick={() => {
                        const pageData = {
                            pageTitle: title,
                            pageCategory: category,
                            pageContent: content,
                        };
                        fetch("http://louk342.iptime.org:3001/createBoard", {
                            method: "post", // method :통신방법
                            headers: { "content-type": "application/json", },
                            body: JSON.stringify(pageData),    // headers: API 응답에 대한 정보를 담음
                        }).then((res) => res.json()).then((json) => {
                            if (json.complete) alert('게시물이 게시 되었습니다.');
                        });
                    }}
                >작성</Button>
            </div>
        </div>
    );
};
export default Write;