import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Toolbar, Typography } from '@mui/material';
import useSession from '../../hooks/useSession';
import { startCase } from 'lodash';
import { baseURL } from '../../api';
import { getToken } from '../../hooks/useTokenStorage';
import { useMutation } from 'react-query';
import { LoadingButton } from '@mui/lab';


const logoutUser = async () => {
  await fetch(
    `${baseURL}/auth/logout`,
    { 
      method: 'post',
      headers: {
        'authorization': `Bearer ${getToken()}`
      },
      credentials: 'include'
    }
  )
}

interface Props extends DrawerProps {
  navConfig: Array<
      {
        id: string;
        children: {
            id: string;
            icon: JSX.Element;
            path: string;
        }[];
      }
  >,
}

const Navigator: React.FC<Props> = (props) => {
  const { navConfig, ...other } = props;

  const navigate = useNavigate()
  const { data } = useSession()
  const { mutate, isLoading } = useMutation(logoutUser, {
    onSuccess: () => {
      navigate('/auth/login', { replace: true })
    }

  });


  return (
    <Drawer variant="permanent" {...other}>
      <Stack direction='column' justifyContent='space-between' sx={{ height: 'inherit' }} >
        <List disablePadding>
          <ListItem sx={{ p: 0, borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Toolbar sx={{ fontSize: 22, '&:hover': {}, width: '100%' }}>
              Catalog
            </Toolbar>
          </ListItem>
          {/* <ListItemButton sx={{ py: 2, px: 3 }}>
            <ListItemIcon>
              <HomeTwoToneIcon />
            </ListItemIcon>
            <ListItemText>Project Overview</ListItemText>
          </ListItemButton> */}
          {navConfig.map(({ id, children }) => (
              children.map(({ id: childId, icon, path }) => (
                  <ListItem 
                    disablePadding 
                    component={NavLink}
                    key={childId} 
                    to={path}
                  >
                    <ListItemButton disableRipple>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
              ))
          ))}
        </List>
      </Stack>
      <Toolbar sx={{ mb: 3 }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
          <Stack direction='column' justifyContent='center'>
            <Typography variant='body2' lineHeight={0.9} fontWeight='fontWeightMedium'>{startCase(data?.firstName)} {startCase(data?.lastName)}</Typography>
            <Typography variant='caption' fontSize={10} color='primary.main' fontWeight='fontWeightBold'>{data?.role}</Typography>
          </Stack>
          <LoadingButton 
            variant='outlined' 
            size='small' 
            sx={{ color: 'primary.main' }} 
            onClick={() => mutate()}
            disabled={isLoading}
            loading={isLoading}
          >
              Logout
          </LoadingButton>
        </Stack>
      </Toolbar>
    </Drawer>
  );
}

export default Navigator
