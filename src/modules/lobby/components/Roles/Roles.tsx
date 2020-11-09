import React from 'react';
import { useRolesStyles } from './RolesStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { Body1, Headline5 } from '../../../../UiKit/Typography';

const ROLES: Record<string, string> = {
  'eth-staker': 'about.roles-eth-staker-text',
  'node-provider': 'about.roles-node-provider-text',
  governance: 'about.roles-governance-text',
};

interface IFeaturesProps {
  className?: string;
}

export const Roles = ({ className }: IFeaturesProps) => {
  const classes = useRolesStyles({});

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <h2 className={classes.title}>{tHTML('about.roles-title')}</h2>
        <ul className={classes.list}>
          {Object.keys(ROLES).map((key: string) => {
            const item = ROLES[key];
            return (
              <li key={key} className={classes.item}>
                <Headline5
                  className={classes.itemCaption}
                  color="primary"
                  component="h3"
                >
                  {t(`about.roles-${key}-title`)}
                </Headline5>
                <Body1 className={classes.itemText} component="p">
                  {t(item)}
                </Body1>
              </li>
            );
          })}
        </ul>
      </Curtains>
    </section>
  );
};
