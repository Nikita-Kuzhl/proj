import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box'
import CardImage_1 from '../img/card_img_1.jpg'
import CardImage_2 from '../img/card_img_2.jpg'
import CardImage_3 from '../img/card_img_3.jpg'

const CardImages = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  useEffect(()=>{
    const timer =setInterval(()=>{
      if(localStorage.getItem('theme')==="true"){
        setTheme('#f5f5f5')
      }else{
        setTheme('background.paper')
      }
    },100)
    return () => clearTimeout(timer)
  },)
    return (
    
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          mt: 2,
          bgcolor: theme,
          borderRadius: 1,
          
        }}
    >
    <Card  sx={{ maxWidth: 345, m:2,backgroundColor:theme }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={CardImage_1}
          alt="green iguana"
          
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
          Ремонт подвески
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Ходовая часть транспортного средства включает в себя переднюю и заднюю подвеску, колеса и шины.
          Передняя подвеска обеспечивает вам комфортную езду на вашем автомобиле, а задняя – регулирует правильное движение транспортного средства.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 ,m:2, backgroundColor:theme}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={CardImage_2}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Ремонт двигателя
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Ремонт двигателя в автосервисе "AutoServ33" включает в себя целый комплекс работ, 
          которые выполняются при помощи современного европейского с применением качественных расходных материалов и запасных частей.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345, m:2 ,backgroundColor:theme }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={CardImage_3}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Шиномонтаж
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Известно правило «чтобы автомобиль служил долго за ним требуется постоянный уход»!
          К постоянному уходу относится и то, что мы не должны забывать «переобувать» свой автомобиль в зимний и летний периоды.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Box>   
    
    )
}

export default CardImages
