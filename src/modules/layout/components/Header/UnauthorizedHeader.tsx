import { useHeaderStyles } from './HeaderStyles';
import { useAction } from '../../../../store/redux';
import { openUnlockWalletAction } from '../../../../store/modals/actions';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import React from 'react';
import { HeaderFrame } from './HeaderFrame';
import { uid } from 'react-uid';
import {
  COMMUNITY_LINK,
  GOVERNANCE_LINK,
  DOCS_LINK,
} from '../../../../common/const';
import { NavLink } from '../../../../UiKit/NavLink';

const LINKS = [
  {
    label: 'navigation.community',
    link: COMMUNITY_LINK,
  },
  {
    label: 'navigation.governance',
    link: GOVERNANCE_LINK,
  },
  {
    label: 'navigation.docs',
    link: DOCS_LINK,
  },
];

export const UnauthorizedHeader = ({ className }: { className?: string }) => {
  const classes = useHeaderStyles();
  const openUnlockWallet = useAction(openUnlockWalletAction);

  const isSMDown = useIsSMDown();
  return (
    <HeaderFrame outerClassName={className} innerClassName={classes.outer}>
      <ul className={classes.list}>
        {LINKS.map(link => (
          <li key={uid(link)} className={classes.item}>
            <NavLink
              href={link.link}
              className={classes.link}
              color="secondary"
            >
              {t(link.label)}
            </NavLink>
          </li>
        ))}
      </ul>
      <Button
        onClick={openUnlockWallet}
        className={classes.button}
        color="primary"
        size={!isSMDown ? 'large' : 'medium'}
      >
        {t('navigation.unlock-wallet')}
      </Button>
    </HeaderFrame>
  );
};
