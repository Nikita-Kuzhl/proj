import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'

const InfoCompCompon = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
      const timer =setInterval(()=>{
        if(localStorage.getItem('theme')==="true"){
          setTheme('f5f5f5')
        }else{
          setTheme("#ffffff")
        }
      },100)
      return () => clearTimeout(timer)
    }, []);
    return (
        <div>
            <Box sx={{      
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',  
            height:600,
            mt:5,
            bgcolor:theme
            }}>
            <Iframe  src="https://yandex.ru/map-widget/v1/?um=constructor%3A83b0c2ccd289bc46d7aaa59d7d4d708387a12762555f97e770e3efd7bcdcb389"
                scroll="true"
                className='map_yandex'
                >
            </Iframe>
            <Typography sx={{justifyContent:'center'}}variant='h5'>Режим работы<br/>Будни: 8:00-23:00<br/>Выходные: 8:00-20:00</Typography>
            </Box>
        </div>
    )
}

export default InfoCompCompon
