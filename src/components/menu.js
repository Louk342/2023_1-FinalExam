import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

function Menu(){
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {setOpen(!open);};
    return(
        <div className='menu'>
            <List
                sx={{ width: '100%', maxWidth: 150, bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
              <ListItemButton><ListItemText primary="공지사항"/></ListItemButton>
              <ListItemButton><ListItemText primary="인기게시글"/></ListItemButton>
              <ListItemButton><ListItemText primary="요청사항"/></ListItemButton>
              <ListItemButton><ListItemText primary="게임소개"/></ListItemButton>
              <ListSubheader component="div" id="nested-list-subheader">정보게시판</ListSubheader>
              <ListItemButton><ListItemText primary="함선"/></ListItemButton>
              <ListItemButton><ListItemText primary="장비"/></ListItemButton>
              <ListItemButton><ListItemText primary="스킨"/></ListItemButton>
              <ListItemButton><ListItemText primary="스테이지"/></ListItemButton>
              <ListItemButton><ListItemText primary="대형작전"/></ListItemButton>
              <ListItemButton><ListItemText primary="이벤트"/></ListItemButton>
              <ListItemButton><ListItemText primary="업데이트뉴스"/></ListItemButton>
              <ListItemButton><ListItemText primary="기타사이트"/></ListItemButton>
              <ListSubheader component="div" id="nested-list-subheader">유저게시판</ListSubheader>
            </List>
        </div>
    );
}
export default Menu;