import React from 'react';
function Page(props) {
    let id,title,contents,category,writer;
    const inputID=props.id;
    fetch("http://louk342.iptime.org/getPage", {
        method: "post",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(inputID),
    }).then((res) => res.json()).then((json) => {
        id=json.body.id;
        title=json.body.title;
        contents=json.body.contents;
        if(json.body.category==1) category='자유게시판';
        else if(json.body.category==2) category='클랜게시판';
        else if(json.body.category==3) category='공략게시판';
    });
    const content=<>
        <div>
            <span><h1>{title}</h1><br/>id : {id}</span>
            <span>
                <div>카테고리 : {category}</div>
                <div>작성자 : {writer}</div>
            </span>
        </div>
        <div style={{color:'white'}}>{contents}</div>
    </>
    return ({content});
}
export default Page;