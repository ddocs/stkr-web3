import React from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { usePickerStyles } from './PickerStyles';
import { BackgroundColorProvider } from '../../UiKit/BackgroundColorProvider';
import { Body2, Headline1 } from '../../UiKit/Typography';
import { t, tHTML } from '../../common/utils/intl';
import { NavLink } from '../../UiKit/NavLink';
import { PROVIDER_PATH, STAKER_STAKE_PATH } from '../../common/const';

interface IItemProps {
  title: string;
  text: string;
  buttonCaption: string;
  link: string;
  icon: string;
}

const Item = ({ title, text, buttonCaption, link, icon }: IItemProps) => {
  const classes = usePickerStyles({ icon });
  return (
    <BackgroundColorProvider component="li" className={classes.item}>
      <Headline1 className={classes.caption} component="h3" color="primary">
        {title}
      </Headline1>
      <Body2 className={classes.text} component="p" color="secondary">
        {text}
      </Body2>
      <NavLink
        className={classes.link}
        href={link}
        variant="contained"
        color="primary"
        size="large"
      >
        {buttonCaption}
      </NavLink>
    </BackgroundColorProvider>
  );
};

const LIST: Record<string, string> = {
  staker: STAKER_STAKE_PATH,
  provider: PROVIDER_PATH,
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
                text={tHTML(`picker.${key}.text`)}
                link={item}
                buttonCaption={t(`picker.${key}.link`)}
                icon={key}
              />
            );
          })}
        </ul>
      </Curtains>
    </section>
  );
};
