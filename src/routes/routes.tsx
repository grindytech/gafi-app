import {
  mdiAccountSwitch,
  mdiGamepadSquare,
  mdiViewDashboardOutline,
  mdiPool,
  mdiRocketLaunch,
} from '@mdi/js';
import React from 'react';

import featureFlags from 'components/FeatureFlags';
import Contracts from 'pages/Contracts';
import Dashboard from 'pages/Dashboard';
import DeployContract from 'pages/DeployContract';
import MappingAccount from 'pages/MappingAccount';
import SponsoredPool from 'pages/SponsoredPool';
import StakingPool from 'pages/StakingPool';
import UpfrontPool from 'pages/UpfrontPool';

const { checkFeature, EFeatureFlag } = featureFlags;

const isDisplayGameCreatorFeature = checkFeature(EFeatureFlag.GameCreator);

export interface IRoute {
  path: string;
  name: string;
  icon: string;
  component: () => React.ReactElement;
  layout: string;
  category?: string;
  views: IRoute[];
  collapse?: string;
}

const dashRoutes = isDisplayGameCreatorFeature
  ? ([
      {
        path: '/dashboard',
        name: 'DASHBOARD',
        icon: mdiViewDashboardOutline,
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
        name: 'STAKING_POOL',
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
    ] as IRoute[])
  : ([
      {
        path: '/dashboard',
        name: 'DASHBOARD',
        icon: mdiViewDashboardOutline,
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
        name: 'STAKING_POOL',
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
    ] as IRoute[]);
export default dashRoutes;
