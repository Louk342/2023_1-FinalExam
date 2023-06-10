import React from 'react';
import { Button,Select,MenuItem, FormControl, InputLabel } from '@mui/material';

function Write(props){
   
    return (
        <div>
            <FormControl>
                <InputLabel>게시판</InputLabel>
                <Select label='게시판'>
                        <MenuItem vlaue={'free'}>자유게시판</MenuItem>
                        <MenuItem vlaue={'clan'}>클랜게시판</MenuItem>
                        <MenuItem vlaue={'tip'}>공략게시판</MenuItem>
                    </Select>
            </FormControl>
            
            <Button>작성완료</Button>
        </div>
    );
};
export default Write;