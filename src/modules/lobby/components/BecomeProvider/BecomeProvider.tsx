import React, { useCallback, useRef, useState } from 'react';
import { useBecomeProviderStyles } from './BecomeProviderStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { Body1, Headline1, Headline5 } from '../../../../UiKit/Typography';
import { Button } from '../../../../UiKit/Button';
import { useIntersectionObserver } from '../../../../common/hooks/useIntersectionObserver';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../../../store/actions/UserActions';

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
        setItemVisible(true);
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
      <Headline5 className={classes.itemCaption} color="primary" component="h3">
        {title}
      </Headline5>
      <Body1 className={classes.itemText} component="p">
        {text}
      </Body1>
    </li>
  );
};

const FEATURES: Record<string, string> = {
  api: 'about.become-provider-api-text',
  knowledge: 'about.become-provider-knowledge-text',
  governance: 'about.become-provider-governance-text',
};

interface IFeaturesProps {
  className?: string;
}

export const BecomeProvider = ({ className }: IFeaturesProps) => {
  const classes = useBecomeProviderStyles({});
  const dispatch = useDispatch();
  const handleUnlockWallet = useCallback(() => {
    dispatch(UserActions.connect());
  }, [dispatch]);

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Headline1 className={classes.title} component="h2">
          {tHTML('about.become-provider-title')}
        </Headline1>
        <div className={classes.textWrapper}>
          <Typography className={classes.text} component="p">
            {t('about.become-provider-text')}
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
        <Button
          className={classes.mobileButton}
          color="primary"
          size="large"
          onClick={handleUnlockWallet}
        >
          {t('navigation.unlock-wallet')}
        </Button>
        <ul className={classes.list}>
          {Object.keys(FEATURES).map((key: string, index) => {
            const item = FEATURES[key];
            return (
              <Item
                key={key}
                title={t(`about.become-provider-${key}-title`)}
                text={t(item)}
                icon={key}
                delay={200 * index}
              />
            );
          })}
        </ul>
      </Curtains>
    </section>
  );
};
