import { Box, Button, InputBase, Modal, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const style = {
    position: 'absolute',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    textAlign:'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const UslugaItem = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [isAuth,setIsAuth] = useState()
    const [isConfirmEmail,setIsConfirmEmail] = useState()


    useEffect(()=>{
      setIsAuth(localStorage.getItem('token')?true:false);
      setIsConfirmEmail(localStorage.getItem('isEmailConfirmed')==="true"?true:false)
    },[])


    const location = useLocation()
    const list = location.state

    const [date,setDate] = useState("")

    const fetchAddOrder = async()=>{
        const token = localStorage.getItem('token');
        const product_id =  list.id
        console.log(date,product_id)
        if(date===""){
            alert("Выберите дату")
            return
        }
        const data = await fetch('/orders/',{
            method:"POST",
            headers:{
                "token":token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"product_id":product_id,"date":date})
        })
        if(!data.ok){
            alert("HTTP ошибка -"+data.status)
            return
        }
        setOpen(false)
        alert("Заявка создана")
    }
    
    const NoAuth = <Typography variant='h5' sx={{ mt: 5 }}>Для записи на услугу, нужно авторизироваться</Typography>
    const NoEmailChecked = <Typography variant='h5' sx={{ mt: 5 }}>Для записи на услугу, нужно подтвердить email</Typography>
    const Success = <Button sx={{mt:5}} size="large" variant="contained" onClick={handleOpen}>Записаться</Button> 

    return (
        <div>
            <Box sx={{display:'flex',justifyContent:'center',m:5,flexDirection:'column',textAlign:'center',alignItems:'center'}}>
                <img src={`/files/${list.photoFileId}`} alt='card' style={{ width: "60%", borderRadius: '5px', borderBlock: 'solid' }} />
                <Typography variant='h4' sx={{ mt: 5 }}>{list.name}</Typography>
                <Typography variant='h5' sx={{ mt: 5, width: '40%', minWidth: 200 }}>
                        {list.description} Цена-{list.price}.
                </Typography>

                {!isAuth&&!isConfirmEmail&&NoAuth}
                {isAuth&&!isConfirmEmail&&NoEmailChecked}
                {isConfirmEmail&&isAuth&&Success}


                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Выбирете дату
                    </Typography>
                    <Paper component="form" sx={{mt:5}} elevation={0}>
                    <InputBase
                        value={date}
                        type="datetime-local"
                        onChange={(e)=>setDate(e.target.value)}
                        
                    />
                    </Paper>

                    <Button sx={{mt:5}}variant='contained' size='medium' onClick={fetchAddOrder}>Записаться</Button>
                    </Box>
                </Modal>
            </Box>
        </div>
    )
}

export default UslugaItem
