import React from 'react';

import { useAppContext } from '../../app-context';
import { ChallengeToolbar } from './challenge-toolbar';
import { MainToolbar } from './main-toolbar';

export const Toolbars = () => {
  const {
    challenge: { current },
  } = useAppContext();

  return (
    <React.Fragment>
      {!current && <MainToolbar />}
      {current && <ChallengeToolbar />}
    </React.Fragment>
  );
};
