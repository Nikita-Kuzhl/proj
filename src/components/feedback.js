import React, { useState } from 'react'
import {Button, createTheme, Input, Modal, TextField, Typography} from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/system';
import styles from '../components/styles/styles'




const theme = createTheme({
    palette: {
      neutral: {
        main: '#ffffff',
        contrastText: '#fff',
      },
    },
  });
  

const Feedback = () => {
    const [open,setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [email,setEmail] = useState()
    const [name,setName] = useState()
    const [text,setText] = useState()

    const fetchFeedback = async() => {
      await fetch("/feedback/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email,name,text})
      }).then(response=>{
        if(!response.ok){
          alert("Ошибка HTTP: " + response.status);
          return;
        };
        response.json().then(data=>{
          if(data.success !== true){
            alert(data.message)
        }else{
          alert(data.message)
          handleClose()
        }
        })
      })
    }
  return (
    <>
    <ThemeProvider theme={theme} >
        <Button onClick={handleOpen}variant='outlined' color='neutral'>Отсавить отзыв</Button>
    </ThemeProvider>
    <Modal
    open={open}
    onClose={handleClose}
    >
        <Box sx={styles.modalBox}>
            <Typography variant='h4'>Фидбэк</Typography>
            <Typography variant='h6' sx={{mt:3}}>Пожалуйста расскажите о опыте сотрудничества с нашим автосервесом</Typography>
            <Input value={email} onChange={e=>setEmail(e.target.value)} type='text' sx={{mt:5}} placeholder='Введите email'></Input>
            <Input value={name} onChange={e=>setName(e.target.value)} type='text' sx={{mt:5}} placeholder='Введите имя'></Input>
            <TextField value={text} onChange={e=>setText(e.target.value)} multiline rows={4} type='text' sx={{mt:5}} placeholder='Введите отзыв'></TextField>
            <Button onClick={fetchFeedback} sx={{mt:5}}>Отправить отзыв</Button>
        </Box>
    </Modal>
    </>
  )
}

export default Feedback