import React, { ReactElement } from 'react';

import config from 'config';

export enum EFeatureFlag {
  GameCreator = 'GameCreator',
}

const FEATURE_FLAGS: Record<EFeatureFlag, boolean> = {
  [EFeatureFlag.GameCreator]: config.FEATURE_FLAG.PUBLIC_FEATURE_GAME_CREATOR,
};

export const checkFeature = (flag: EFeatureFlag) => FEATURE_FLAGS[flag];

export const FeatureFlags: React.FC<{ flag: EFeatureFlag }> = ({
  flag,
  children,
}) => {
  if (checkFeature(flag)) {
    return <>{children}</>;
  }
  return <></>;
};
