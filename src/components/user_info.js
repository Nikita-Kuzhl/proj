import { Avatar, Button, Input, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'

const styles = {
    modalBox:{
      display:'flex',
      flexDirection:'column',
      textAlign:'center',   
      justifyContent:'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minWidth:250,
      width:'30%',
      height:550,   
      bgcolor: 'white',
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
  
  }
  }

const UserInfo = () => {

    const [info,setInfo] = useState([])
    const [isConfirmEmail,setIsConfirmEmail] = useState()
    const [openCheck,setOpenCheck] = useState(false)
    const handleOpenCheck = () => setOpenCheck(true)
    const handleCloseCheck = () => setOpenCheck(false)


    const fetchInfo = async() =>{
        const token = localStorage.getItem('token')
        const infoFetch = await fetch('/users/kab',{
            method:"GET",
            headers:{
            "token":token
            }
        })
        if(!infoFetch.ok){
            alert('Error HTTP-'+infoFetch.status)
            return
        }
        const infoJSON = await infoFetch.json()
        setInfo(infoJSON.user)
    }




    const [code,setCode] = useState("")

    const fetchCheck = async() => {
        const email = info.email
        if(!email||!code){
            alert("Вы не ввели код")
            return
        }
        await fetch("/users/email/confirm",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({email,code})
        }).then(function(response){
            if(!response.ok){
                alert("Ошибка HTTP: " + response.status);
                return;
            };
            response.json().then(function(data){
                if(data.success !== true){
                    alert(data.code)
                }else{
                    handleCloseCheck();
                    localStorage.setItem("isEmailConfirmed",true)
                    window.location.reload();
                    return;
                }
            });
        })
    }




    useEffect(()=>{
        fetchInfo()
        setIsConfirmEmail(localStorage.getItem('isEmailConfirmed')==="true"?true:false)
    },[])

    return (
        <div>
            <Box sx={{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            verticalAlign:'center',
            m:2
            }}>
                <Avatar sx={{width:300,height:300}}></Avatar>
                <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Typography variant='h5'>ФИО:</Typography>
                    <Typography variant='h5'>{info.fio}</Typography>
                    <Typography variant='h5'>EMAIL:</Typography>
                    <Typography variant='h5'>{info.email}</Typography>
                    {!isConfirmEmail?<Button onClick={handleOpenCheck} variant="contained" sx={{mt:5}} size='large'>Подтвердить email</Button>:<></>}
                </Box>
            </Box>
            <Modal
                            open={openCheck}
                            onClose={handleCloseCheck}
                        >
                            <Box sx={styles.modalBox}>
                                <Typography sx={{m:3}} id="modal-modal-title" variant="h4" component="h2">
                                    Проверка почты
                                </Typography>
                                <Typography sx={{m:3}} variant='h5'>Введите код</Typography>
                                <Input min="6" type='text' value={code} onChange={(e)=>setCode(e.target.value)} ></Input>
                                <Button onClick={fetchCheck}size='large' sx={{m:3}}>Отправить</Button>
                            </Box>
                        </Modal>
        </div>
    )
}

export default UserInfo
