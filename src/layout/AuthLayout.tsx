import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import ThemeProvider from '../theme';
import AppBar from './appbar';


const AuthLayout = () => {
  return (
    <ThemeProvider>
      <Box height='100vh'>
        <AppBar  />
        <Outlet />
      </Box>  
    </ThemeProvider>
  )
}

export default AuthLayout