// import {
//   HomeIcon,
//   StatsIcon,
//   CreditIcon,
//   PersonIcon,
//   DocumentIcon,
//   RocketIcon,
//   SupportIcon,
// } from "components/Icons/Icons";
// import Billing from "views/Dashboard/Billing.js";
import { Icon } from '@chakra-ui/react';
import { mdiAccountSwitch, mdiHome } from '@mdi/js';

import DeployContract from './components/DeployContract';
import MappingAccount from './components/MappingAccount';
import StakingPool from './components/StakingPool';
import UpfrontPool from './components/UpfrontPool';
import Dashboard from './pages/Dashboard';
// import Profile from "views/Dashboard/Profile.js";
// import Tables from "views/Dashboard/Tables.js";
// import SignUp from "views/Pages/SignUp.js";
// import RTLPage from "views/RTL/RTLPage.js";

// import SignIn from "pages/signIn/SignIn";

const dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: (
      <Icon>
        <path d={mdiHome} />
      </Icon>
    ),
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/mapping-account',
    name: 'Mapping Account',
    icon: (
      <Icon>
        <path d={mdiAccountSwitch} />
      </Icon>
    ),
    component: MappingAccount,
    layout: '/admin',
  },
  {
    path: '/upfront-pool',
    name: 'Upfront Pool',
    component: UpfrontPool,
    layout: '/admin',
  },
  {
    path: '/stacking-pool',
    name: 'Stacking Pool',
    component: StakingPool,
    layout: '/admin',
  },
  {
    path: '/deploy-contract',
    name: 'Deploy Contract',
    component: DeployContract,
    layout: '/admin',
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  // {
  //   name: 'ACCOUNT PAGES',
  //   category: 'account',
  //   state: 'pageCollapse',
  //   views: [
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   icon: <PersonIcon color="inherit" />,
  //   secondaryNavbar: true,
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  // path: '/signin',
  // name: 'Sign In',
  // icon: <DocumentIcon color="inherit" />,
  // component: SignIn,
  // layout: '/auth',
  // },
  // {
  //   path: "/signup",
  //   name: "Sign Up",
  //   icon: <RocketIcon color="inherit" />,
  //   secondaryNavbar: true,
  //   component: SignUp,
  //   layout: "/auth",
  // },
  // ],
  // },
];
export default dashRoutes;
