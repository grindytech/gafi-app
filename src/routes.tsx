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
import {
  mdiAccountSwitch,
  mdiGamepadSquare,
  mdiHome,
  mdiPool,
  mdiRocketLaunch,
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
    name: 'DASHBOARD',
    icon: mdiHome,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/mapping-account',
    name: 'MAPPING_ACCOUNT',
    icon: mdiAccountSwitch,
    component: MappingAccount,
    layout: '/admin',
  },
  {
    path: '/upfront-pool',
    name: 'UPFRONT_POOL',
    component: UpfrontPool,
    icon: mdiPool,
    layout: '/admin',
  },
  {
    path: '/staking-pool',
    name: 'STACKING_POOL',
    component: StakingPool,
    icon: mdiPool,
    layout: '/admin',
  },
  {
    path: '/sponsored-pool',
    name: 'SPONSORED_POOL',
    component: SponsoredPool,
    icon: mdiPool,
    layout: '/admin',
  },
  {
    path: '/contracts',
    name: 'GAME_CREATOR',
    component: Contracts,
    icon: mdiGamepadSquare,
    layout: '/admin',
    redirect: isDisplayGameCreatorFeature ? null : '/contracts',
  },
  {
    path: '/deploy-contract',
    name: 'DEPLOY_CONTRACT',
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
