import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'



const columns = [
    {field:'name',headerName:'Услуга',width:200,},
    {field:'price',headerName:'Цена'},
    {field:'date',headerName:'Дата',width:200}
]

const UserPanel = () => {
  //Таблица пользователей
  const [data,setData] = useState([])


  const fetchData = async() => {
    const token = localStorage.getItem('token')
    const dataFetch = await fetch(`/orders/user`,{
      method:"GET",
      headers:{
        "token":token
      }
      
    })
    if(!dataFetch.ok){
      alert('Error HTTP-'+dataFetch.status)
      return
    } 
    const dataJSON = await dataFetch.json()
    setData(dataJSON.orders) 



  }
  //Удаление записей

  const [selectedRows, setSelectedRows] = useState();
  const fetchDel = async () => {
    const token = localStorage.getItem('token')
    const data = selectedRows.map((el)=>{
      const id = el.id;
      if(!id){
        alert('Вы не выбрали что удалить');
      }
      return fetch(`/orders/delete/${id}`,{
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


  useEffect(()=>{
    fetchData()
  },[])


    return (
        <div>
        <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 1,
        m: 1,
        mt: 2,
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        }}>
      <Box sx={{width:'40%',minWidth:400,textAlign:"center",marginLeft:2}}>     
      <Typography variant='h4'sx={{m:2}}>Услуги</Typography>
      <DataGrid
        style={{ height: 400,minWidth:300,margin:1}}
        rows={data}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = data.filter((row) =>
            selectedIDs.has(row.id),
          );

          setSelectedRows(selectedRows);
        }}
        {...data}
      />
      <Stack
        sx={{ width: '100%', m: 1,display: 'flex',flexDirection: 'row',justifyContent: 'space-around' }}
        direction="row"
        alignItems="flex-start"
        columnGap={1}
      >

        <Button onClick={fetchDel}size="small" >
          Удалить
        </Button>
      </Stack>
      </Box>
      </Box>
        </div>
    )
}

export default UserPanel
