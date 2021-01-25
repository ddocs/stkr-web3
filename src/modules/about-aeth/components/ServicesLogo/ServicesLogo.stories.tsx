/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { ServicesLogo, servicesLogoMap } from './ServicesLogo';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const logos = Object.keys(servicesLogoMap) as Array<
  keyof typeof servicesLogoMap
>;

const useStyles = makeStyles<Theme>(theme => ({
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: `${theme.spacing(3)}px ${theme.spacing(1.5)}px`,
  },

  logoName: {
    display: 'block',
    marginBottom: theme.spacing(1),
  },

  logoImg: {
    fontSize: '2rem',
  },
}));

const DefaultStory = () => {
  const classes = useStyles();
  return <ServicesLogo name="metamask" className={classes.logoImg} />;
};

export const Default = () => <DefaultStory />;

const IconsListStory = () => {
  const classes = useStyles();

  const renderIcons = logos.map(name => (
    <div key={name}>
      <code className={classes.logoName}>{name}</code>
      <ServicesLogo className={classes.logoImg} name={name} title={name} />
    </div>
  ));

  return (
    <>
      <h1>Icons list</h1>
      <div className={classes.list}>{renderIcons}</div>
    </>
  );
};

export const IconsList = () => <IconsListStory />;

export default {
  title: 'modules/AboutAeth/component/ServicesLogo',
};
