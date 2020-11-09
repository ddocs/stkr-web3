import React from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { usePickerStyles } from './PickerStyles';
import { Body1, Headline4 } from '../../UiKit/Typography';
import { t, tHTML } from '../../common/utils/intl';
import { NavLink } from '../../UiKit/NavLink';
import { PROVIDER_PATH, STAKER_DASHBOAR_PATH } from '../../common/const';

interface IItemProps {
  title: string;
  buttonCaption: string;
  link: string;
  icon: string;
  features: string[];
  disabled: boolean;
}

const Item = ({
  title,
  buttonCaption,
  link,
  icon,
  features,
  disabled,
}: IItemProps) => {
  const classes = usePickerStyles({ icon });
  return (
    <li className={classes.item}>
      <Headline4 className={classes.caption} component="h3">
        {title}
      </Headline4>
      <ul className={classes.subList}>
        {features.map(feature => (
          <Body1
            key={feature}
            className={classes.subItem}
            component="li"
            color="secondary"
          >
            {t(feature)}
          </Body1>
        ))}
      </ul>
      <NavLink
        className={classes.link}
        href={link}
        variant="contained"
        color="primary"
        size="large"
        disabled={disabled}
      >
        {buttonCaption}
      </NavLink>
    </li>
  );
};

const LIST: Record<string, string> = {
  staker: STAKER_DASHBOAR_PATH,
  provider: PROVIDER_PATH,
};

const DATA: Record<string, { disabled: boolean; features: string[] }> = {
  staker: {
    disabled: false,
    features: [
      'picker.staker.features.1',
      'picker.staker.features.2',
      'picker.staker.features.3',
    ],
  },
  provider: {
    disabled: true,
    features: [
      'picker.provider.features.1',
      'picker.provider.features.2',
      'picker.provider.features.3',
    ],
  },
};

export const Picker = () => {
  const classes = usePickerStyles({});

  const keys: string[] = Object.keys(LIST);
  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <ul className={classes.list}>
          {keys.map((key: string) => {
            const item = LIST[key];
            return (
              <Item
                key={key}
                title={tHTML(`picker.${key}.title`)}
                link={item}
                buttonCaption={
                  DATA[key]?.disabled
                    ? t('coming-soon')
                    : t(`picker.${key}.link`)
                }
                icon={key}
                features={DATA[key]?.features}
                disabled={DATA[key]?.disabled}
              />
            );
          })}
        </ul>
      </Curtains>
    </section>
  );
};
