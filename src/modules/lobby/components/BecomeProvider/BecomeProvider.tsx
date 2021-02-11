import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntersectionObserver } from '../../../../common/hooks/useIntersectionObserver';
import { Seconds } from '../../../../common/types';
import { t, tHTML } from '../../../../common/utils/intl';
import { UserActions } from '../../../../store/actions/UserActions';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { Body1, Headline1, Headline5 } from '../../../../UiKit/Typography';
import { useBecomeProviderStyles } from './BecomeProviderStyles';

const Item = ({
  title,
  text,
  icon,
  delay,
}: {
  title: string;
  text: string;
  icon: string;
  delay: number;
}) => {
  const classes = useBecomeProviderStyles({ icon: icon, delay: delay });

  const [isItemVisible, setItemVisible] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  useIntersectionObserver(
    (isVisible: boolean) => {
      if (isVisible) {
        setItemVisible(isVisible);
      }
    },
    itemRef,
    {
      rootMargin: '0% 0% -10% 0%',
    },
  );
  return (
    <li
      className={classNames(classes.item, !isItemVisible && classes.hidden)}
      ref={itemRef}
    >
      <Headline5
        className={classes.itemCaption}
        color="textPrimary"
        component="h3"
      >
        {title}
      </Headline5>

      <Body1 className={classes.itemText} component="p">
        {text}
      </Body1>
    </li>
  );
};

const FEATURES: Record<string, string> = {
  api: 'become-provider.api-text',
  knowledge: 'become-provider.knowledge-text',
  governance: 'become-provider.governance-text',
};

export const BecomeProvider = () => {
  const classes = useBecomeProviderStyles({});
  const dispatch = useDispatch();
  const handleUnlockWallet = useCallback(() => {
    dispatch(UserActions.connect());
  }, [dispatch]);

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Headline1 className={classes.title} component="h2">
          {tHTML('become-provider.title')}
        </Headline1>

        <div className={classes.textWrapper}>
          <Typography className={classes.text} component="p">
            {t('become-provider.text')}
          </Typography>

          <Button
            className={classes.button}
            color="primary"
            size="large"
            onClick={handleUnlockWallet}
          >
            {t('navigation.unlock-wallet')}
          </Button>
        </div>

        <ul className={classes.list}>
          {Object.keys(FEATURES).map((key: string, index) => {
            const item = FEATURES[key];
            const appearanceDelay: Seconds = 0.15 * index;
            return (
              <Item
                key={key}
                title={t(`become-provider.${key}-title`)}
                text={t(item)}
                icon={key}
                delay={appearanceDelay}
              />
            );
          })}
        </ul>

        <Button
          className={classes.mobileButton}
          color="primary"
          size="large"
          onClick={handleUnlockWallet}
          fullWidth
        >
          {t('navigation.unlock-wallet')}
        </Button>
      </Curtains>
    </section>
  );
};
