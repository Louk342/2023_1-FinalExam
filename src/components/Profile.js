import React from "react";
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

function Profile(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchData();
    }, [props.name]);

    const fetchData = async () => {
        const response = await fetch("http://louk342.iptime.org/getProfileBoard", {
            method: "post",
            headers: { "content-type": "application/json", },
            body: JSON.stringify({ name: props.name }),
        });
        const json = await response.json();
        const newList = json.map((content) => (
            <TableRow onClick={() => {window.location.href = 'http://louk342.iptime.org/page/'+content.id}} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right">{content.id}</TableCell>
                <TableCell align="right">{content.title}</TableCell>
                <TableCell align="right">{content.writer}</TableCell>
                <TableCell align="right">{content.createDate}</TableCell>
                <TableCell align="right"><Button onClick={() => {
                    fetch("http://louk342.iptime.org/delete", {
                        method: "post",
                        headers: { "content-type": "application/json", },
                        body: JSON.stringify({ id: content.id }),
                    }).then((res) => res.json()).then((json) => {
                        if(json) alert('게시물이 삭제되었습니다');
                        window.location.reload();
                    });
                }}

                >삭제</Button></TableCell>
            </TableRow>
        ));
        setList(newList);
    };
    return (
        <div>
            <h3>환영합니다! {props.name} 님!</h3>
            <hr />
            <div>
                <h4>{props.name}님의 게시물</h4>
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
                </div>
            </div>
        </div>
    );
}
export default Profile;