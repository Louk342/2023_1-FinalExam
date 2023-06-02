import React from 'react';
import '../img/mainLogo.png';
import '../style.css';
function Header(){
    return(
        <div className='header'>
            <img src='../img/mainLogo.png' alt='None img'/>
            <a href='/'><h2>쪽지</h2></a>
        </div>
    );
}
export default Header;