import React from 'react';
import '../style.css'
function Header(){
    return(
        <div className='header'>
            <img src='%PUBLIC_URL%/img/mainLogo.png' alt='None img'/>
            <a href='/'><h2>쪽지</h2></a>
        </div>
    );
}
export default Header;