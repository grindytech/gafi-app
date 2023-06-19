import React from 'react';

import config from 'config';

export enum EFeatureFlag {
  GameCreator = 'GameCreator',
  NewDashboardUI = 'NewDashboardUI',
}

const FEATURE_FLAGS: Record<EFeatureFlag, boolean> = {
  [EFeatureFlag.GameCreator]: config.FEATURE_FLAG.PUBLIC_FEATURE_GAME_CREATOR,
  [EFeatureFlag.NewDashboardUI]: config.FEATURE_FLAG.PUBLIC_NEW_DASHBOARD_UI,
};

export const checkFeature = (flag: EFeatureFlag) => FEATURE_FLAGS[flag];

export const isDisplayNewDashboardUI = checkFeature(
  EFeatureFlag.NewDashboardUI
);

export const FeatureFlags: React.FC<{ flag: EFeatureFlag }> = ({
  flag,
  children,
}) => {
  if (checkFeature(flag)) {
    return <>{children}</>;
  }
  return <></>;
};
