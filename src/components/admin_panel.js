import { Box, Button, Input, Modal, Stack, Typography } from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';
import { useState,useEffect } from 'react';



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

const columns_user = [
  { field: 'id', headerName: 'ID'},
  { field: 'FIO', headerName: 'ФИО',width:200},
  { field:'login',headerName:'Логин'},
  { field: 'email', headerName:'Email',width:200},
];

const columns_feedback = [
  { field: 'name', headerName: 'Имя',width:200},
  { field: 'email', headerName:'Email',width:200},
  { field:'text',headerName:'Отзыв',width:200},
]

const columns_uslug = [
  { field: 'id', headerName: 'ID'},
  { field: 'name', headerName: 'Название',width:200},
  {
    field: 'price',
    headerName: 'Цена',
    type: 'number',
    
  },
  {field:'description',headerName:'Описание',width:200}
]

 const AdminPanel=()=> {
  //Модальное окно
  const [open,setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openUpd,setOpenUpd] = useState(false)
  const handleOpenUpd = () => setOpenUpd(true)
  const handleCloseUpd = () => setOpenUpd(false)
  //Del таблицы пользователей
  
  const [selectedRows, setSelectedRows] = useState();
  


  const fetchDelUser = async() => {
    const token = localStorage.getItem('token')
    const data = selectedRows.map((el)=>{
      const id = el.id;
      if(!id){
        alert('Вы не выбрали что удалить');
      }
      return fetch(`/users/${id}/delete`,{
        method:"POST",
        headers:{
          "token":token
        }
      }).then(function (response){
        if(!response.ok){
            alert("Ошибка HTTP: " + response.status)
            return;
        }
      })
    })
    if(data){
      alert('Успешно удалено')
      window.location.reload();
    }
  }
  //Update table Uslug

  const [id,setId] = useState("")
  const [nameUpd,setNameUpd] = useState("")
  const [priceUpd,setPriceUpd] = useState("")
  const [descriptionUpd,setDescriptionUpd] = useState("")
  const [fileUpd,setFileUpd] = useState(null)
  

  const fetchUpd = async()=>{
    const token = localStorage.getItem('token')
    if(!nameUpd||!priceUpd||!descriptionUpd||!id){
      alert('Ошибка')
    }
    // const formData = new FormData()
    // formData.append("file",fileUpd)
    const result = await fetch(`/products/${id}/update`,{
      method:"POST",
      headers:{
        "token":token,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name:nameUpd,price:priceUpd,description:descriptionUpd})
    })
    if(!result.ok){
      alert("Ошибка HTTP-"+result.status)
      return
    }
    setOpenUpd(false)
    
  }

  //Добавление в таблицу услуг

  const [name,setName] = useState("")
  const [price,setPrice] = useState("")
  const [description,setDescription] = useState("")
  const [file,setFile] = useState(null)

  const fetchUpdate = async () =>{
    if(!name||!price||!description||!file){
      alert("Ошибка")
      return
    }
    const formData = new FormData()
    formData.append("file",file)
    const result = await fetch("/files/upload/",{
      method:"POST",
      body: formData
    })
    const resultJSON = await result.json()
    const fileId = resultJSON.fileId;
    const token = localStorage.getItem('token')
    await fetch("/products/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "token":token
      },
      body: JSON.stringify({name,description,price,photoFileId:fileId})
    })
    setOpen(false);
    window.location.reload();
  }



  //Удаление таблицы услуг

  const [selectedRowsUslug, setSelectedRowsUslug] = useState();

  const fetchDelUlug = async() => {
    const token = localStorage.getItem('token')
    const data = selectedRowsUslug.map((el)=>{
      const id = el.id;
      if(!id){
        alert('Вы не выбрали что удалить');
      }
      return fetch(`/products/${id}/delete`,{
        method:"POST",
        headers:{
          "token":token
        }
      }).then(function (response){
        if(!response.ok){
            alert("Ошибка HTTP: " + response.status)
            return;
        }
      })
    })
    if(data){
      alert('Успешно удалено')
      window.location.reload();
    }
  }
  
  //Таблица пользователей
  
  const [dataUser,setDataUser] = useState([])

  const fetchDataUser = async() => {
    const token = localStorage.getItem('token')
    const data = await fetch("/users/getall",{
      method:"GET",
      headers:{
        "token": token,
        "Content-Type":"application/json"
      }
    });
    if(!data.ok){
      alert("Ошибка HTTP: " + data.status)
      return;
    }
    const dataJSON = await data.json();
    setDataUser(dataJSON.user);
  }

  //Таблица услуг

  const [dataUslug,setDataUslug] = useState([])

  const fetchDataUslug = async() => {
    const data = await fetch("/products",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });
    if(!data.ok){
      alert("Ошибка HTTP: " + data.status)
      return;
    }
    const dataJSON = await data.json();
    setDataUslug(dataJSON.products);
  }

  //Таблица отзывов
  const [dataFeedback,setDataFeedback]= useState([])

  const fetchDataFeedback = async()=>{
    const token = localStorage.getItem('token')
    const data = await fetch("/feedback/get",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "token":token
      }
    })
    if(!data.ok){
      alert("Ошибка HTTP: " + data.status)
      return;
    }
    const dataJSON = await data.json();
    setDataFeedback(dataJSON.feedBack)
  }

  useEffect(()=>{
    fetchDataUser();
    fetchDataUslug();
    fetchDataFeedback();
    
  },[])

  return (
      <>
    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 1,
        m: 1,
        mt: 2,
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        }}>
      <Box sx={{width:'40%',minWidth:400,textAlign:"center"}}>     
      {/* <Typography variant='h4'sx={{m:2}}>Пользователи</Typography>
      <DataGrid
        style={{ height: 400,minWidth:300,marginLeft:10}}
        rows={dataUser}
        columns={columns_user}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = dataUser.filter((row) =>
            selectedIDs.has(row.id),
          );

          setSelectedRows(selectedRows);
        }}
        {...dataUser}
      />
      <Stack
        sx={{ width: '100%', m: 1,display: 'flex',flexDirection: 'row',justifyContent: 'space-around' }}
        direction="row"
        alignItems="flex-start"
        columnGap={1}
      >
        <Button onClick={fetchDelUser} size="small">
          Удалить
        </Button>
      </Stack> */}
      <Typography variant='h4'sx={{m:2}}>Отзывы</Typography>
      <DataGrid
      style={{ height: 400,minWidth:300,marginLeft:10}}
      columns={columns_feedback}
      rows={dataFeedback}
      />
      </Box> 
      <Box sx={{width:'40%',minWidth:400,textAlign:"center" }}>
      <Typography variant='h4'sx={{m:2}}>Услуги</Typography>
      <DataGrid
        style={{ height: 400,minWidth:300,marginLeft:10}}
        rows={dataUslug}
        columns={columns_uslug}
        checkboxSelection
        // editRowsModel={editRowsModelUslug}
        // onEditRowsModelChange={editRowsModelUslug}
        onSelectionModelChange={(ids) => {
          
          const selectedIDsUslug = new Set(ids);
          const selectedRowsUslug = dataUslug.filter((row) =>
            selectedIDsUslug.has(row.id),
          );


          setSelectedRowsUslug(selectedRowsUslug);
          if(selectedRowsUslug !== undefined){
            setId(selectedRowsUslug[0].id)
            setNameUpd(selectedRowsUslug[0].name)
            setPriceUpd(selectedRowsUslug[0].price)
            setDescriptionUpd(selectedRowsUslug[0].description)
          }
        }}
        {...dataUslug}

      />
      <Stack
        sx={{ width: '100%', m: 1,display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}
        direction="row"
        alignItems="flex-start"
        columnGap={1}
      >
        <Button size="small" onClick={handleOpenUpd}>
          Обновить
        </Button>
        <Modal
                open={openUpd}
                onClose={handleCloseUpd}
                >
                    <Box sx={styles.modalBox}>
                        <Typography sx={{m:3}} id="modal-modal-title" variant="h4" component="h2">
                            Изменение услуги
                        </Typography>
                        <Typography sx={{m:3}} variant='h5'>Название</Typography>
                        <Input type='text' value={nameUpd} onChange={(e)=>setNameUpd(e.target.value)} ></Input>
                        <Typography sx={{m:3}} variant='h5'>Цена</Typography>
                        <Input type='text' value={priceUpd} onChange={(e)=>setPriceUpd(e.target.value)} ></Input>
                        <Typography sx={{m:3}} variant='h5'>Описание</Typography>
                        <Input type='text' value={descriptionUpd} onChange={(e)=>setDescriptionUpd(e.target.value)} ></Input>
                        <Typography sx={{m:3}} variant='h5'>Картинка</Typography>
                        <Input type='file'  onChange={(e)=>setFileUpd(e.target.files[0])}></Input>
                        <Button size='large' onClick={fetchUpd}sx={{m:3}}>Изменить</Button>
                    </Box>
                </Modal>
        <Button onClick={handleOpen} size="small" >
          Добавить
        </Button>
        <Modal
                open={open}
                onClose={handleClose}
                >
                    <Box sx={styles.modalBox}>
                        <Typography sx={{m:3}} id="modal-modal-title" variant="h4" component="h2">
                            Добавление услуги
                        </Typography>
                        <Typography sx={{m:3}} variant='h5'>Название</Typography>
                        <Input type='text' value={name} onChange={(e)=>setName(e.target.value)} ></Input>
                        <Typography sx={{m:3}} variant='h5'>Цена</Typography>
                        <Input type='text' value={price} onChange={(e)=>setPrice(e.target.value)} ></Input>
                        <Typography sx={{m:3}} variant='h5'>Описание</Typography>
                        <Input type='text' value={description} onChange={(e)=>setDescription(e.target.value)} ></Input>
                        <Typography sx={{m:3}} variant='h5'>Картинка</Typography>
                        <Input type='file'  onChange={(e)=>setFile(e.target.files[0])}></Input>
                        <Button size='large' onClick={fetchUpdate}sx={{m:3}}>Добваить</Button>
                    </Box>
                </Modal>


        <Button size="small" onClick={fetchDelUlug}>
          Удалить
        </Button>
      </Stack>
    </Box>
    </Box>

    </>
  );
}
export default AdminPanel