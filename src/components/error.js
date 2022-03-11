import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import error from '../img/404_error.png';

const ErrorComp = () => {
  return (
      <Box sx={{height:600,display:'flex',flexDirection:'column',justifyContent:'center',textAlign:'center'}}>
          <Box>
              <img src={error} alt="error" style={{width:"30%",minWidth:300}}/>
          </Box>
          <Box>
            <Typography variant='h2'>404</Typography>
            <Typography variant='h4'>Данной страницы не найдено</Typography>
          </Box>
      </Box>
  )
};

export default ErrorComp;
