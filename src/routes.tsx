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

const dashRoutes = isDisplayGameCreatorFeature
  ? [
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
      },
      {
        path: '/deploy-contract',
        name: 'DEPLOY_CONTRACT',
        icon: mdiRocketLaunch,
        component: DeployContract,
        layout: '/admin',
      },
    ]
  : [
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
      // {
      //   path: '/contracts',
      //   name: 'GAME_CREATOR',
      //   component: Contracts,
      //   icon: mdiGamepadSquare,
      //   layout: '/admin',
      // },
      {
        path: '/deploy-contract',
        name: 'DEPLOY_CONTRACT',
        icon: mdiRocketLaunch,
        component: DeployContract,
        layout: '/admin',
      },
    ];
export default dashRoutes;
