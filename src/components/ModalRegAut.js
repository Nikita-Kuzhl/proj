import { Button, Input, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {  useState } from 'react'
import styles from '../components/styles/styles'




const ModalRegAut = () => {

    //Модульное окно авторизации
    const [open,setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    //Модульное окно регистрации
    const [openReg,setOpenReg] = useState(false)
    const handleOpenReg = () => setOpenReg(true)
    const handleCloseReg = () => setOpenReg(false)
    //Модульнное окно подтверждения
    const [openCheck,setOpenCheck] = useState(false)
    const handleOpenCheck = () => setOpenCheck(true)
    const handleCloseCheck = () => setOpenCheck(false)


    //Запрос для авторизации

    const [login,setLogin] = useState("");
    const [password,setPassword] = useState("");

    const fetchLogIn = async() =>{
        if(!login||!password){
            alert("Ошибка ввода");
            return;
        };
        await fetch("/users/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({login,password})
        }).then(function (response){
            if(!response.ok){
                alert("Ошибка HTTP: " + response.status)
                return;
            }else{
                response.json().then(function(data){
                    if(data.success !== true){
                        alert(data.message)
                    }else{
                        localStorage.setItem('token',data.token)
                        localStorage.setItem('role',data.role)
                        localStorage.setItem('isEmailConfirmed',data.isEmailConfirmed)
                        setOpen(false)
                        window.location.reload();
                    }
                })
            }
        })
    }

    //Запрос для регистрации
    // const [login,setLogin] = useState("");
    // const [password,setPassword] =useState("");
    const [passwordRepeat,setPasswordRepeat] = useState("");
    const [fio,setFio] = useState("");
    const [telephone,setTelephone] = useState("");
    const [email,setEmail] = useState("");

    const fetchSignUp = async () => {
        if(!login||!password||!passwordRepeat||!fio||!telephone||!email){
            alert("Заполните все поля");
            return;
        };
        if(passwordRepeat !== password){
            alert('Пароли не совпадают');
            return;
        };
        await fetch("/users/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({login,password,fio,telephone,email})
        }).then(function(response){
            if(!response.ok){
                alert("Ошибка HTTP: " + response.status);
                return;
            };
            response.json().then(function(data){
                if(data.success !== true){
                    alert(data.message)
                }else{
                    setPassword("");
                    handleOpenCheck()
                    return;
                }
            });
            
        });

    }
    //Запрос на подтверждение почты
    const [code,setCode] = useState("")

    const fetchCheck = async() => {
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
                    setPassword("");
                    handleCloseCheck();
                    handleCloseReg();
                    return;
                }
            });
        })
    }

    

    return (
        <div>
            <Button onClick={handleOpen} sx={{color:"white",display: { xs: 'none', md: 'inline-flex' }}}>Авторизация</Button>
            <Button onClick={handleOpen} sx={{color:"black",display: { xs: 'flex', md: 'none' }}}>Авторизация</Button>
                <Modal
                open={open}
                onClose={handleClose}
                >
                    <Box sx={styles.modalBox}>
                        <Typography sx={{m:3}} id="modal-modal-title" variant="h4" component="h2">
                            Авторизация
                        </Typography>
                        <Typography sx={{m:3}} variant='h5'>Логин</Typography>
                        <Input type='text' value={login} onChange={(e)=>setLogin(e.target.value)} ></Input>
                        <Typography sx={{m:3}} variant='h5'>Пароль</Typography>
                        <Input type='password' value={password} onChange={(e)=> setPassword(e.target.value)}></Input>
                        <Button onClick={fetchLogIn}size='large' sx={{m:3}}>Авторизироваться</Button>
                    </Box>
                </Modal>
                <Button onClick={handleOpenReg} sx={{color:"white",display: { xs: 'none', md: 'inline-flex' }}}>Регистрация</Button>
                <Button onClick={handleOpenReg} sx={{color:"black",display: { xs: 'flex', md: 'none' }}}>Регистрация</Button>
                <Modal
                open={openReg}
                onClose={handleCloseReg}
                >
                    <Box sx={styles.modalBox}>
                        <Typography sx={{m:3}} id="modal-modal-title" variant="h4" component="h2">
                            Регистрация
                        </Typography>
                        <Typography sx={{mt:1}} variant='h5'>Логин</Typography>
                        <Input 
                            value={login} 
                            onChange={(e)=> setLogin(e.target.value)}
                        ></Input>
                        <Typography sx={{mt:1}} variant='h5'>ФИО</Typography>
                        <Input 
                            value={fio} 
                            onChange={(e)=> setFio(e.target.value)}
                        ></Input>
                        <Typography sx={{mt:1}} variant='h5'>Телефон</Typography>
                        <Input 
                            value={telephone} 
                            onChange={(e)=> setTelephone(e.target.value)}
                        ></Input>
                        <Typography sx={{mt:1}} variant='h5'>Email</Typography>
                        <Input  
                            value={email} 
                            onChange={(e)=> setEmail(e.target.value)}
                        ></Input>
                        <Typography sx={{mt:1}} variant='h5'>Пароль</Typography>
                        <Input 
                            value={password} 
                            type='password' 
                            onChange={(e)=> setPassword(e.target.value)} 
                        ></Input>
                        <Typography sx={{mt:1}} variant='h5'>Повтор пароля</Typography>
                        <Input 
                            value={passwordRepeat} 
                            type='password' 
                            onChange={(e)=> setPasswordRepeat(e.target.value)} 
                            sx={{mb:1}} 
                        ></Input>
                        <Button size='large' onClick={fetchSignUp} sx={{m:1}}>Зарегестрироваться</Button>
                        <Modal
                            open={openCheck}
                            onClose={handleCloseCheck}
                        >
                            <Box sx={styles.modalBox}>
                                <Typography sx={{m:3}} id="modal-modal-title" variant="h4" component="h2">
                                    Проверка почты
                                </Typography>
                                <Typography sx={{m:3}} variant='h5'>Введите код</Typography>
                                <Input type='text' value={code} onChange={(e)=>setCode(e.target.value)} ></Input>
                                <Button onClick={fetchCheck}size='large' sx={{m:3}}>Отправить</Button>
                            </Box>
                        </Modal>
                    </Box>
                </Modal>
        </div>
    )
}

export default ModalRegAut
// function async(){ fetchSignUp(); if( password === ""){handleOpenCheck()}}