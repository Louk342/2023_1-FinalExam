import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { InputLabel, Select, TextField } from '@mui/material';
import { useState } from 'react';
function Write(props) {
    const [italic, setItalic] = useState(false);
    const [fontWeight, setFontWeight] = useState('normal');
    const [anchorEl, setAnchorEl] = useState(null);
    const [category, setCategory] = useState();
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel sx={{ color: 'white' }}>게시판</InputLabel>
                <Select label='게시판' value={category} onChange={handleChange}>
                    <MenuItem value={0}><em>None</em></MenuItem>
                    <MenuItem vlaue={1}>자유게시판</MenuItem>
                    <MenuItem vlaue={2}>클랜게시판</MenuItem>
                    <MenuItem vlaue={3}>공략게시판</MenuItem>
                </Select>
            </FormControl>
            <TextField label="제목" variant="filled" />
            <FormLabel sx={{ color: 'white' }}>게시글 작성</FormLabel>
            <Textarea
                placeholder="Type something here…"
                minRows={3}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                        }}
                    >
                        <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <FormatBold />
                            <KeyboardArrowDown fontSize="md" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            size="sm"
                            placement="bottom-start"
                            sx={{ '--ListItemDecorator-size': '24px' }}
                        >
                            {['200', 'normal', 'bold'].map((weight) => (
                                <MenuItem
                                    key={weight}
                                    selected={fontWeight === weight}
                                    onClick={() => {
                                        setFontWeight(weight);
                                        setAnchorEl(null);
                                    }}
                                    sx={{ fontWeight: weight }}
                                >
                                    <ListItemDecorator>
                                        {fontWeight === weight && <Check fontSize="sm" />}
                                    </ListItemDecorator>
                                    {weight === '200' ? 'lighter' : weight}
                                </MenuItem>
                            ))}
                        </Menu>
                        <IconButton
                            variant={italic ? 'soft' : 'plain'}
                            color={italic ? 'primary' : 'neutral'}
                            aria-pressed={italic}
                            onClick={() => setItalic((bool) => !bool)}
                        >
                            <FormatItalic />
                        </IconButton>
                        <Button sx={{ ml: 'auto' }}>Send</Button>
                    </Box>
                }
                sx={{
                    minWidth: 300,
                    fontWeight,
                    fontStyle: italic ? 'italic' : 'initial',
                }}
            />
            <Button variant='contained' sx={{ float: 'right', backgroundColor: '#444444', margin: '10px', color: 'white' }}>작성</Button>
        </div>
    );
};
export default Write;