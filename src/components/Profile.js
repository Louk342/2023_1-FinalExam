import React from "react";
import { useState } from "react";
function Profile(){
    const [name, setName] = useState('');
    fetch("http://louk342.iptime.org/authcheck", {
    method: "post", // method :통신방법
    headers: { "content-type": "application/json", },    // headers: API 응답에 대한 정보를 담음
    }).then((res) => res.json()).then((json) => {setName(json.name);});
    return(
        <div>
            <h3>환영합니다! {name} 님!</h3>
            
        </div>
    );
}
export default Profile;