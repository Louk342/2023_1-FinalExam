import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './style.css';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import Event from './components/Event';
import Board from './components/board';
import Write from './components/Write';
function App(props) {
  const [mode, setMode] = useState('');
  const [name, setName] = useState('');
  const [view, setView] = useState(false);
  fetch("http://louk342.iptime.org:3001/authcheck", {
    method: "post", // method :통신방법
    headers: { "content-type": "application/json", },    // headers: API 응답에 대한 정보를 담음
  })
    .then((res) => res.json()).then((json) => {
      if (json.isLogin === "True") {
        setMode("WELCOME");
        setName(json.name);
      } else setMode("LOGIN");
    });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return (() => clearInterval(id))
  }, []);

  return (
    <div className="App">
      <header>
        <div className='header_in'>
          <a href='/' margin='0px' padding='0px'><img src={require('./img/mainLogo.png')} style={{ padding: '10px', width: '30px' }} alt='LOGO' /></a>
          <a href='/letter'><h2 style={{ margin: '0px', fontSize: '18px' }}>쪽지</h2></a>
          <div style={{ marginLeft: 'auto' }} />
          <span><h3 style={{ margin: '0px 10px' }}>현재시각 : {time.toLocaleTimeString()}</h3></span>
          <IconButton onClick={() => { setView(!view) }} ><AccountCircleIcon fontSize='large' sx={{ color: 'white' }} /></IconButton>
          {view && <DropMenu name={name} mode={mode} />}
        </div>
      </header>
      <div className='main'>
        <div>
          <List sx={{ width: 200, color: 'white', bgcolor: '#33353b', padding: '2px', borderRadius: '15px', boxShadow: '0 0 20px 0 rgba(0,0,0,.15)' }}>
            <h4>게시판</h4>
            <ListItemButton href='/notice'><ListItemText primary="공지사항" /></ListItemButton>
            <ListItemButton href='/'><ListItemText primary="인기게시글" /></ListItemButton>
            <ListItemButton href='/'><ListItemText primary="요청사항" /></ListItemButton>
            <ListItemButton href='/'><ListItemText primary="게임소개" /></ListItemButton>
            <h4>정보게시판</h4>
            <ListItemButton href='/ship'><ListItemText primary="함선" /></ListItemButton>
            <ListItemButton href='/equipment'><ListItemText primary="장비" /></ListItemButton>
            <ListItemButton href='/skin'><ListItemText primary="스킨" /></ListItemButton>
            <ListItemButton href='/stage'><ListItemText primary="스테이지" /></ListItemButton>
            <ListItemButton href='/big-stage'><ListItemText primary="대형작전" /></ListItemButton>
            <ListItemButton href='/event'><ListItemText primary="이벤트" /></ListItemButton>
            <ListItemButton href='/update'><ListItemText primary="업데이트뉴스" /></ListItemButton>
            <ListItemButton href='/site'><ListItemText primary="기타사이트" /></ListItemButton>
            <h4>유저게시판</h4>
            <ListItemButton href='/free-board'><ListItemText primary="자유게시판" /></ListItemButton>
            <ListItemButton href='/consider-page'><ListItemText primary="문서화예정" /></ListItemButton>
            <ListItemButton href='/clan-board'><ListItemText primary="클랜게시판" /></ListItemButton>
            <ListItemButton href='/tip-board'><ListItemText primary="공략게시판" /></ListItemButton>
          </List>
        </div>
        <div className='body'>
          <BrowserRouter><Routes>
            <Route path='/' element={<Home />} />
            <Route path="/*" element={<NotFound />} />
            <Route path='/loginPage' element={<LoginPage />} />
            <Route path='/notice' /* element={<Notice/>} */ />
            <Route path='/ship' /* element={<Ship/>} */ />
            <Route path='/equipment' /* element={<Equipmnet/>} */ />
            <Route path='/skin' /* element={<Skin/>} */ />
            <Route path='/stage' /* element={<Stage/>} */ />
            <Route path='/big-stage' /* element={<BigStage/>} */ />
            <Route path='/event' element={<Event />} />
            <Route path='/update' /* element={<Update/>} */ />
            <Route path='/site' /* element={<Site/>} */ />
            <Route path='/free-board' element={<Board category={1}/>} />
            <Route path='/consider-page' /* element={<ConsiderPage/>} */ />
            <Route path='/clan-board' element={<Board category={2}/>} />
            <Route path='/tip-board' element={<Board category={3}/>} />
            <Route path='/write' element={<Write/>} />
          </Routes></BrowserRouter>
        </div>
      </div>
      <footer>
        <div>© 2023, Coded by Louk</div>
      </footer>
      <div className='StT'><IconButton onClick={scrollToTop}><ArrowUpwardIcon /></IconButton></div>
    </div>
  );
}
function NotFound() { return (<div><h1 style={{ color: 'white' }}>404 NotFound</h1></div>); };

function DropMenu(props) {
  let content = null;
  if (props.mode == 'WELCOME') {
    content = 
    <List sx={{ color: 'white', bgcolor: '#33353b', padding: '1px', boxShadow: '0 0 20px 0 rgba(0,0,0,.15)', display: 'fixed', top: '50px' ,left:'auto',position:'absolute', zIndex:'5'}}>
      <ListItemButton sx={{display:'inline'}} href='/profile' ><ListItemText primary={props.name} /></ListItemButton>
      <ListItemButton sx={{display:'inline'}} onClick={() => {
        fetch("http://louk342.iptime.org:3001/logout", { //auth 주소에서 받을 예정
          method: "post", // method :통신방법
          headers: { "content-type": "application/json", },    // headers: API 응답에 대한 정보를 담음
        }).then((res) => res.json()).then((json) => {});
      }}><ListItemText primary="로그아웃" /></ListItemButton>
    </List>
  } else {
    content = 
    <List sx={{ color: 'white', bgcolor: '#33353b', padding: '1px', boxShadow: '0 0 20px 0 rgba(0,0,0,.15)', display: 'fixed', top: '50px' ,left:'auto',position:'absolute',zIndex:'5'}}>
      <ListItemButton href='/loginPage'><ListItemText primary='로그인' /></ListItemButton>
    </List> 
  }
  return (<div>{content}</div>);
}
export default App;