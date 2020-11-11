import React, { useEffect, useMemo } from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { usePickerStyles } from './PickerStyles';
import { Body1, Headline4 } from '../../UiKit/Typography';
import { t, tHTML } from '../../common/utils/intl';
import { NavLink } from '../../UiKit/NavLink';
import {
  ENABLE_PROVIDER,
  PROVIDER_PATH,
  STAKER_DASHBOAR_PATH,
  STAKER_STAKE_PATH,
} from '../../common/const';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { UserActions, UserActionTypes } from '../../store/actions/UserActions';
import { useQuery } from '@redux-requests/react';
import { IStakerStats } from '../../store/apiMappers/stakerStatsApi';

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

export const Picker = () => {
  const classes = usePickerStyles({});
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchStakerStats());
    }
  }, [dispatch, isConnected]);

  const { loading, data } = useQuery<IStakerStats | null>({
    type: UserActionTypes.FETCH_STAKER_STATS,
  });

  const DATA: Record<
    string,
    { disabled: boolean; features: string[]; comingSoon?: boolean }
  > = useMemo(
    () => ({
      staker: {
        disabled: loading,
        features: [
          'picker.staker.features.1',
          'picker.staker.features.2',
          'picker.staker.features.3',
        ],
      },
      provider: {
        disabled: !ENABLE_PROVIDER,
        comingSoon: !ENABLE_PROVIDER,
        features: [
          'picker.provider.features.1',
          'picker.provider.features.2',
          'picker.provider.features.3',
        ],
      },
    }),
    [loading],
  );

  const LIST: Record<string, string> = {
    staker:
      data?.stakes && data.stakes.length > 0
        ? STAKER_DASHBOAR_PATH
        : STAKER_STAKE_PATH,
    provider: PROVIDER_PATH,
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
