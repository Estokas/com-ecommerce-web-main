import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ConstructionIcon from '@mui/icons-material/Construction';
import SellIcon from '@mui/icons-material/Sell';
import Diversity1TwoToneIcon from '@mui/icons-material/Diversity1TwoTone';

const navigations = [
    {
      id: 'Build',
      children: [
        {
          id: 'Users',
          icon: <PeopleIcon />,
          path: '/users'
        },
        { 
          id: 'Products', 
          icon: <CategoryIcon />,
          path: '/products'
        },
        { 
          id: 'Services', 
          icon: <ConstructionIcon />,
          path: '/services'
        },
        { 
          id: 'Orders', 
          icon: <SellIcon />,
          path: '/orders'
        },
        // { 
        //   id: 'Hosting', 
        //   icon: <PublicIcon /> 
        // },
        // {
        //   id: 'Functions', 
        //   icon: <SettingsEthernetIcon />
        // },
        // {
        //   id: 'Machine learning',
        //   icon: <SettingsInputComponentIcon />,
        // },
      ],
    },
    // {
    //   id: 'Quality',
    //   children: [
    //     { id: 'Analytics', icon: <SettingsIcon /> },
    //     { id: 'Performance', icon: <TimerIcon /> },
    //     { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    //   ],
    // },
  ];
  
export default navigations