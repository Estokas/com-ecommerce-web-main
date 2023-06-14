import React from 'react'
import { Outlet } from 'react-router-dom';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Navigator from './nav';
import navigations from '../config/navigations';
import ThemeProvider from '../theme';
import AppBar from './appbar';


const drawerWidth = 230;

interface Props {
  sublinks?: Array<
    {
      name: string,
      path: string
    }
  >
}

const DashboardLayout: React.FC<Props> = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider>
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs='auto'>
          <Box
            component="nav"
            sx={{ 
              width: { sm: drawerWidth }, 
              flexShrink: { sm: 0 },
            }}
          >
            {isMdUp ? null : (
              <Navigator
                navConfig={navigations}
                PaperProps={{ 
                  style: { 
                    width: drawerWidth,
                  } 
                }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )}

            <Navigator
              navConfig={navigations}
              PaperProps={{ 
                style: { 
                  width: drawerWidth,
                } 
              }}
              sx={{ display: { sm: 'block', xs: 'none' } }}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box >
            <AppBar  />
            <Outlet />
          </Box>        
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default DashboardLayout