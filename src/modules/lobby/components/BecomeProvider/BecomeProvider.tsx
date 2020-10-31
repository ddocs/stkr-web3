import React from 'react';
import { useBecomeProviderStyles } from './BecomeProviderStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { Body1, Headline5, Headline1 } from '../../../../UiKit/Typography';
import { Button } from '../../../../UiKit/Button';
import { useAction } from '../../../../store/redux';
import { openUnlockWalletAction } from '../../../../store/modals/actions';

const Item = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) => {
  const classes = useBecomeProviderStyles({ icon: icon });
  return (
    <li className={classes.item}>
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
  api: 'about.become-provider-knowledge-text',
  knowledge: 'about.become-provider-knowledge-text',
  governance: 'about.become-provider-governance-text',
};

interface IFeaturesProps {
  className?: string;
}

export const BecomeProvider = ({ className }: IFeaturesProps) => {
  const classes = useBecomeProviderStyles({});
  const openUnlockWallet = useAction(openUnlockWalletAction);

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Headline1 className={classes.title} component="h2">
          {tHTML('about.become-provider-title')}
        </Headline1>
        <Body1 className={classes.text} component="p">
          {t('about.become-provider-text')}
        </Body1>
        <Button
          className={classes.button}
          color="primary"
          size="large"
          onClick={openUnlockWallet}
        >
          {t('navigation.unlock-wallet')}
        </Button>
        <ul className={classes.list}>
          {Object.keys(FEATURES).map((key: string) => {
            const item = FEATURES[key];
            return (
              <Item
                key={key}
                title={t(`about.become-provider-${key}-title`)}
                text={t(item)}
                icon={key}
              />
            );
          })}
        </ul>
      </Curtains>
    </section>
  );
};
