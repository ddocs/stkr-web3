import * as React from 'react';
import { useInfoStyles } from './InfoStyles';
import classNames from 'classnames';
import { t } from '../../common/utils/intl';
import { BackgroundColorProvider } from '../../UiKit/BackgroundColorProvider';
import { Body1, Headline1 } from '../../UiKit/Typography';
import { uid } from 'react-uid';

interface IItemProps {
  caption: string;
  value: number | string;
}

export interface IInfoProps {
  className?: string;
  data: IItemProps[];
  small?: boolean;
}

export const Info = ({ className, data, small }: IInfoProps) => {
  const classes = useInfoStyles({ count: data.length, small: small });

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {data.map(item => {
          return (
            <BackgroundColorProvider
              key={uid(item)}
              classes={{ root: classes.item }}
              component="li"
            >
              <Body1 className={classes.label} component="span">
                {t(item.caption)}
              </Body1>
              <Headline1
                className={classes.value}
                component="span"
                color="primary"
              >
                {item.value}
              </Headline1>
            </BackgroundColorProvider>
          );
        })}
      </ul>
    </div>
  );
};
