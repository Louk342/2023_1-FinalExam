import React from 'react';
import { Button} from '@mui/material';
import { redirect, useHref } from 'react-router-dom';
function Board() {
    const list=[]
    fetch("http://louk342.iptime.org:3001/getBoard", {
    method: "post", // method :통신방법
    headers: { "content-type": "application/json", },    // headers: API 응답에 대한 정보를 담음
  })
    .then((res) => res.json()).then((json) => {
        for(let content of json){
            //console.log(content.id)
            //console.log(content.title)
            //console.log(content.writer)
            //console.log(content.createDate)
            list.push(
                <tr>
                    <td>{content.id}</td>
                    <td>{content.title}</td>
                    <td>{content.writer}</td>
                    <td>{content.createDate}</td>
                </tr>
            );
        }
    });

    console.log(list);

    return (
        <div style={{color:'white',padding:'20px',margin:'0px'}} >
            <table style={{width:'100%',textAlign:'left',border:'4px',borderColor:'white'}}>
                <tr>
                    <td>번호</td>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>작성일</td>
                </tr>
                {/* 얘 왜 출력 안함???? */}
                {list}
            </table>
            
            <Button sx={{ backgroundColor: '#444444', margin: '10px' ,color:'white'}} onClick={()=>{
                fetch("http://louk342.iptime.org:3001/authcheck", {
                    method: "post", // method :통신방법
                    headers: { "content-type": "application/json", },    // headers: API 응답에 대한 정보를 담음
                })
                    .then((res) => res.json()).then((json) => {
                        if (json.isLogin === "True") window.location.replace('http://louk342.iptime.org:3001/write');
                        else{
                            alert('로그인 하신 뒤 사용해 주세요');
                            window.location.replace('http://louk342.iptime.org:3001/loginPage');
                        }
                    });
            }}>글쓰기</Button>

        </div>
    );
};
export default Board;