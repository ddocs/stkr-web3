import * as React from 'react';
import { useInfoStyles } from './InfoStyles';
import classNames from 'classnames';
import { t } from '../../common/utils/intl';
import { BackgroundColorProvider } from '../../UiKit/BackgroundColorProvider';
import { Headline1 } from '../../UiKit/Typography';
import { uid } from 'react-uid';

interface IItemProps {
  caption: string;
  value: number | string;
}

export interface IInfoProps {
  className?: string;
  data: IItemProps[];
}

export const Info = ({ className, data }: IInfoProps) => {
  const classes = useInfoStyles({ count: data.length });

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {data.map(item => {
          return (
            <BackgroundColorProvider
              key={uid(item)}
              className={classes.item}
              component="li"
            >
              {t(item.caption)}
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
