import React from "react";
import { useState, useEffect } from "react";

function Profile(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchData();
    }, [props.name]);

    const fetchData = async () => {
        const response = await fetch("http://louk342.iptime.org/getProfileBoard", {
            method: "post",
            headers: { "content-type": "application/json", },
            body: JSON.stringify({ category: props.name }),
        });
        const json = await response.json();
        const newList = json.map((content) => (
            <tr key={content.id}>
                <td>{content.id}</td>
                <td>{content.title}</td>
                <td>{content.writer}</td>
                <td>{content.createDate}</td>
            </tr>
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
                    <table style={{ width: '100%', textAlign: 'left', border: '4px', borderColor: 'white' }}>
                        <tr>
                            <td>번호</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>작성일</td>
                        </tr>
                        {list}
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Profile;