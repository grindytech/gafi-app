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
import {
  mdiAccountSwitch,
  mdiHome,
  mdiRocketLaunch,
  mdiPool,
  mdiGamepadSquare,
} from '@mdi/js';

import Contracts from './pages/Contracts';
import Dashboard from './pages/Dashboard';
import DeployContract from './pages/DeployContract';
import MappingAccount from './pages/MappingAccount';
import SponsoredPool from './pages/SponsoredPool';
import StakingPool from './pages/StakingPool';
import UpfrontPool from './pages/UpfrontPool';

import featureFlags from 'components/FeatureFlags';

const { checkFeature, EFeatureFlag } = featureFlags;

const isDisplayGameCreatorFeature = checkFeature(EFeatureFlag.GameCreator);

const dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: mdiHome,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/mapping-account',
    name: 'Mapping Account',
    icon: mdiAccountSwitch,
    component: MappingAccount,
    layout: '/admin',
  },
  {
    path: '/upfront-pool',
    name: 'Upfront Pool',
    component: UpfrontPool,
    icon: mdiPool,
    layout: '/admin',
  },
  {
    path: '/staking-pool',
    name: 'Staking Pool',
    component: StakingPool,
    icon: mdiPool,
    layout: '/admin',
  },
  {
    path: '/sponsored-pool',
    name: 'Sponsored Pool',
    component: SponsoredPool,
    icon: mdiPool,
    layout: '/admin',
  },
  {
    path: '/contracts',
    name: 'Game creator',
    component: Contracts,
    icon: mdiGamepadSquare,
    layout: '/admin',
    redirect: isDisplayGameCreatorFeature ? null : '/contracts',
  },
  {
    path: '/deploy-contract',
    name: 'Deploy Contract',
    icon: mdiRocketLaunch,
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
