import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  ENABLE_PROVIDER,
  PROVIDER_MAIN_PATH,
  STAKER_DASHBOARD_PATH,
} from '../../common/const';
import { t, tHTML } from '../../common/utils/intl';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { UserActions } from '../../store/actions/UserActions';
import { Curtains } from '../../UiKit/Curtains';
import { NavLink } from '../../UiKit/NavLink';
import { Body2, Headline4 } from '../../UiKit/Typography';
import { usePickerStyles } from './PickerStyles';
import { useFeaturesAvailable } from '../../common/hooks/useFeaturesAvailable';

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
          <Body2
            key={feature}
            className={classes.subItem}
            component="li"
            color="secondary"
          >
            {t(feature)}
          </Body2>
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

export const Picker = () => {
  const classes = usePickerStyles({});
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchStakerStats());
    }
  }, [dispatch, isConnected]);

  const { isProviderAvailable } = useFeaturesAvailable();

  const DATA: Record<
    string,
    { disabled: boolean; features: string[]; comingSoon?: boolean }
  > = useMemo(
    () => ({
      staker: {
        disabled: false,
        features: [
          'picker.staker.features.1',
          'picker.staker.features.2',
          'picker.staker.features.3',
        ],
      },
      provider: {
        disabled: !ENABLE_PROVIDER || !isProviderAvailable,
        comingSoon: !ENABLE_PROVIDER,
        features: [
          'picker.provider.features.1',
          'picker.provider.features.2',
          'picker.provider.features.3',
        ],
      },
    }),
    [isProviderAvailable],
  );

  const LIST: Record<string, string> = {
    staker: STAKER_DASHBOARD_PATH,
    provider: PROVIDER_MAIN_PATH,
  };

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
                  DATA[key]?.comingSoon
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
