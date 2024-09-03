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
import BarsArrowDownIcon from '@heroicons/react/24/solid/BarsArrowDownIcon';
import SwatchIcon from '@heroicons/react/24/solid/SwatchIcon';
import BankNotesIcon from '@heroicons/react/24/solid/BankNotesIcon';
import RectangleStackIcon from '@heroicons/react/24/solid/RectangleStackIcon';
import RectangleGroupIcon from '@heroicons/react/24/solid/RectangleGroupIcon';
import ChartPieIcon from '@heroicons/react/24/solid/ChartPieIcon';
import AtSymbolIcon from '@heroicons/react/24/solid/AtSymbolIcon';


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
    title: 'RMs',
    path: '/rms',
    icon: (
      <SvgIcon fontSize="small">
        <AtSymbolIcon />
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

  // {
  //   title: 'Account',
  //   path: '/account',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   )
  // },

  // {
  //   title: 'Extras',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <BarsArrowDownIcon />
  //     </SvgIcon>
  //   ),
  // },
  {
    title: 'Our plans',
    extrasSubItem: true,
    path: '/ourplans',
    icon: (
      <SvgIcon fontSize="small">
        <RectangleGroupIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Agent plans',
    extrasSubItem: true,
    path: '/agentplans',
    icon: (
      <SvgIcon fontSize="small">
        <RectangleStackIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Policy types',
    path: '/policytypes',
    icon: (
      <SvgIcon fontSize="small">
        <SwatchIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Payment modes',
  //   extrasSubItem: true,
  //   path: '/paymentmodes',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <BankNotesIcon />
  //     </SvgIcon>
  //   )
  // },

  
  // {
  //   title: 'Error',
  //   extrasSubItem: true,
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: (
      <SvgIcon fontSize="small">
        <ChartPieIcon />
      </SvgIcon>
    )
  },
];
