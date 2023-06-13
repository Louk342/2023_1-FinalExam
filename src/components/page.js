import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style.css'
function Page() {
    const [pageData, setPageData] = useState({ title: '', writer: '', category: '', content: '' });
    const { id } = useParams();

    useEffect(() => {
        const inputID = {input: id};

        fetch("http://louk342.iptime.org/getPage", {
            method: "post",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(inputID),
        })
        .then((res) => res.json())
        .then((json) => {
            let category;
            if(json.category===1) category='자유게시판';
            if(json.category===2) category='클랜게시판';
            if(json.category===3) category='공략게시판';

            setPageData({
                title: json.title,
                writer: json.writer,
                content: json.content,
                category: category
            });
        });
    }, [id]);

    return (
        <div className='container'>
            <div>
                <span className='title'>
                  <h1 style={{margin:'0px'}}>{pageData.title}</h1>
                  <br /><h5 style={{margin:'0px',float:'left',color:'#888888'}}>id : {id}</h5>
                </span>
                <span style={{marginLeft:'auto'}}/>
                <span style={{height:'100%'}}>
                    <div className='category'>카테고리 : {pageData.category}</div>
                    <div className='writer'>작성자 : {pageData.writer}</div>
                </span>
            </div>
            <div className='hr'/>
            <div className='content'>{pageData.content}</div>
        </div>
    );
}

export default Page;
