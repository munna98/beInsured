import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
// import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
// import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import BriefcaseIcon from '@heroicons/react/24/solid/BriefcaseIcon';
import IdentificationIcon from '@heroicons/react/24/solid/IdentificationIcon';
import DocumentIcon from '@heroicons/react/24/solid/DocumentIcon';
import ScaleIcon from '@heroicons/react/24/solid/ScaleIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import ChatBubbleBottomCenterTextIcon from '@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon';


import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Agents',
    path: '/agents',
    icon: (
      <SvgIcon fontSize="small">
        <IdentificationIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: (
      <SvgIcon fontSize="small">
        <BriefcaseIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Policies',
    path: '/policies',
    icon: (
      <SvgIcon fontSize="small">
        <DocumentIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Intermediaries',
    path: '/intermediaries',
    icon: (
      <SvgIcon fontSize="small">
        <ScaleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Vehicles',
    path: '/vehicles',
    icon: (
      <SvgIcon fontSize="small">
        <TruckIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Plans',
    path: '/plans',
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleBottomCenterTextIcon/>
      </SvgIcon>
    )
  },
  // {
  //   title: 'Account',
  //   path: '/account',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
