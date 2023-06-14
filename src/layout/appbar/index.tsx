import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Container } from '@mui/material';
import AccountMenu from './AccountMenu';

interface Props {
  disableAction?: boolean,
  onDrawerToggle?: any
}

const AppBar: React.FC<Props> = (props) => {
    const { onDrawerToggle, disableAction } = props

  return (
    <>
      <MuiAppBar position="sticky" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Container>
            <Grid container spacing={1} alignItems="center">
              {
                disableAction == true && (
                  <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={onDrawerToggle}
                      edge="start"
                    >
                      <MenuIcon sx={{ color: 'grey' }} />
                    </IconButton>
                  </Grid>
                )
              }
              {
                disableAction == true && (
                  <Grid item>
                    <AccountMenu />
                  </Grid>
                )
              }
            </Grid>
          </Container>
        </Toolbar>
      </MuiAppBar>
      {/* <MuiAppBar
        component="div"
        color="primary"
        position="sticky"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Container>
            <Typography variant="h5" component="h1" fontWeight='fontWeightBold'>
              {title}
            </Typography>
          </Container>
        </Toolbar>  
      </MuiAppBar> */}
    </>
  )
}

export default AppBar