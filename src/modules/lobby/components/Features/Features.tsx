import React from 'react';
import { useFeaturesStyles } from './FeaturesStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { t } from '../../../../common/utils/intl';
import { Body1, Headline5 } from '../../../../UiKit/Typography';

const Item = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) => {
  const classes = useFeaturesStyles({ icon: icon });
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
  micropool: 'features.micropool-text',
  manager: 'features.manager-text',
  liquidity: 'features.liquidity-text',
  security: 'features.security-text',
};

export const Features = () => {
  const classes = useFeaturesStyles({});

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.wrapper }}>
        <h2 className={classes.title}>{t('features.title')}</h2>
        <Body1 className={classes.text} component="p">
          {t('features.text')}
        </Body1>
        <ul className={classes.list}>
          {Object.keys(FEATURES).map((key: string) => {
            const item = FEATURES[key];
            return (
              <Item
                key={key}
                title={t(`features.${key}-title`)}
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
