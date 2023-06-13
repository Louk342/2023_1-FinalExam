import React from 'react';
import { Button } from '@mui/material';
import Page from './Page';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Board(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchData();
    }, [props.category]);

    const fetchData = async () => {
        const response = await fetch("http://louk342.iptime.org/getBoard", {
            method: "post",
            headers: { "content-type": "application/json", },
            body: JSON.stringify({ category: props.category }),
        });
        const json = await response.json();
        const newList = json.map((content) => (
            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right">{content.id}</TableCell>
                <TableCell align="right">{content.title}</TableCell>
                <TableCell align="right">{content.writer}</TableCell>
                <TableCell align="right">{content.createDate}</TableCell>
            </TableRow>
        ));
        setList(newList);
    };
    /* const list = [];
    fetch("http://louk342.iptime.org/getBoard", {
        method: "post",
        headers: { "content-type": "application/json", },
        body: JSON.stringify({ category: props.category }),
    }).then((res) => res.json()).then((json) => {
        for (let content of json) {
            //console.log(content.id)
            //console.log(content.title)
            //console.log(content.writer)
            //console.log(content.createDate)
            list.push(
                <tr key={content.id} onClick={<Page id={content.id}/>}>
                    <td>{content.id}</td>
                    <td>{content.title}</td>
                    <td>{content.writer}</td>
                    <td>{content.createDate}</td>
                </tr>
            );
        }
    }); */


    /* <table style={{ width: '100%', textAlign: 'left', border: '4px', borderColor: 'white' }}>
        <tr>
            <td>번호</td>
            <td>제목</td>
            <td>작성자</td>
            <td>작성일</td>
        </tr>
        {list}
    </table> */


    console.log(list);
    return (
        <div style={{ color: 'white', padding: '20px', margin: '0px' }} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">번호</TableCell>
                            <TableCell align="right">제목</TableCell>
                            <TableCell align="right">작성자</TableCell>
                            <TableCell align="right">작성일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button sx={{ backgroundColor: '#444444', margin: '10px', color: 'white' }} onClick={() => {
                fetch("http://louk342.iptime.org/authcheck", {
                    method: "post", // method :통신방법
                    headers: { "content-type": "application/json", },    // headers: API 응답에 대한 정보를 담음
                })
                    .then((res) => res.json()).then((json) => {
                        if (json.isLogin === "True") window.location.replace('http://louk342.iptime.org/write');
                        else {
                            alert('로그인 하신 뒤 사용해 주세요');
                            window.location.replace('http://louk342.iptime.org/loginPage');
                        }
                    });
            }}>글쓰기</Button>


















            

        </div>
    );
};
export default Board;