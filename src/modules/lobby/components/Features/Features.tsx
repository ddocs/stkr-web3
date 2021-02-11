import React, { useMemo } from 'react';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { Body1, Headline5 } from '../../../../UiKit/Typography';
import { useFeaturesStyles } from './FeaturesStyles';

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
  micropool: 'features.micropool-text',
  manager: 'features.manager-text',
  liquidity: 'features.liquidity-text',
  security: 'features.security-text',
};

export const Features = () => {
  const classes = useFeaturesStyles({});

  const renderedItems = useMemo(
    () =>
      Object.keys(FEATURES).map((key: string) => {
        const item = FEATURES[key];
        return (
          <Item
            key={key}
            title={t(`features.${key}-title`)}
            text={t(item)}
            icon={key}
          />
        );
      }),
    [],
  );

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.wrapper }}>
        <div className={classes.content}>
          <h2 className={classes.title}>{t('features.title')}</h2>

          <Body1 className={classes.text} component="p">
            {t('features.text')}
          </Body1>
        </div>

        <ul className={classes.list}>{renderedItems}</ul>
      </Curtains>
    </section>
  );
};
