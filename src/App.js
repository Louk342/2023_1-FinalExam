import React from 'react';
import {useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './style.css';
import NotFound from './components/NotFound';
import Home from './components/Home';
function App() {
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })}
  const [time, setTime] = useState(new Date());
    useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return (() => clearInterval(id))}, []);
  return (
    <div className="App">
      <header>
        <div className='header_in'>
          <a href='/' margin='0px' padding='0px'><img src={require('./img/mainLogo.png')} style={{ padding: '10px', width: '30px' }} /></a>
          <a href='/letter/'><h2 style={{ margin: '0px', fontSize: '18px' }}>쪽지</h2></a>
          <div style={{ marginLeft: 'auto' }} />
          <span><h3 style={{margin:'0px 10px'}}>현재시각 : {time.toLocaleTimeString()}</h3></span>
          <IconButton><AccountCircleIcon fontSize='large' sx={{color:'white'}}/></IconButton>
        </div>
      </header>
      <div className='main'>
        <div>
          <List sx={{ width: 200, color: 'white', bgcolor: '#33353b', padding: '2px', borderRadius: '15px', boxShadow: '0 0 20px 0 rgba(0,0,0,.15)' }}>
            <h4>게시판</h4>
            <ListItemButton component='route'><ListItemText primary="공지사항" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="인기게시글" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="요청사항" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="게임소개" /></ListItemButton>
            <h4>정보게시판</h4>
            <ListItemButton component='a'><ListItemText primary="함선" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="장비" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="스킨" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="스테이지" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="대형작전" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="이벤트" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="업데이트뉴스" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="기타사이트" /></ListItemButton>
            <h4>유저게시판</h4>
            <ListItemButton component='a'><ListItemText primary="자유게시판" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="문서화예정" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="클랜게시판" /></ListItemButton>
            <ListItemButton component='a'><ListItemText primary="공략게시판" /></ListItemButton>
          </List>
        </div>
        <div className='body'>
          <BrowserRouter><Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes></BrowserRouter>
        </div>
      </div>
      <footer>
        <div>© 2023, Coded by Louk</div>
      </footer>
      <div className='StT'><IconButton onClick={scrollToTop}><ArrowUpwardIcon/></IconButton></div>
    </div>
  );
}
export default App;