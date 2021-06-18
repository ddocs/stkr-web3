/* eslint-disable camelcase */
import React from 'react';

import Zendesk, { ZendeskAPI } from './zendesk';
import { useSelector } from 'react-redux';

import {
  StyledComponentProps,
  withStyles,
  Theme,
  IconButton,
} from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import { t } from '../../common/utils/intl';
import { ZendeskHelpIcon } from './ZendeskHelpIcon';
import { useZendeskOrganization } from './useZendeskOrganization';
import { IStoreState } from '../../store/reducers';

const ZENDESK_KEY = '2c84d5a5-9756-4ba5-9eed-9fc1e21ee4f4';

const setting = {
  launcher: {
    chatLabel: {
      'en-US': 'Need Help',
    },
    mobile: {
      labelVisible: false,
    },
  },
  contactForm: {
    fields: [
      { id: 'description', prefill: { '*': 'My pre-filled description' } },
    ],
  },
};

const styles = (theme: Theme): StyleRules => ({
  launcherContainer: {
    position: 'fixed',
    bottom: 15,
    right: theme.spacing(2),
    zIndex: 10000,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  launcher: {
    background: theme.palette.primary.main,
    borderRadius: 34,
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.15)',
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
  launcherText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: '130%',
    color: '#fff',
    marginLeft: 4,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
});

const hideFieldByKey = (key: string) => {
  const iframe = document.getElementById('webWidget');
  if (iframe) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fieldLabel = iframe.contentWindow.document.body.querySelector(`label[data-fieldid='key:${key}']`);
    if (fieldLabel) {
      fieldLabel.parentElement.style.display = "none";
    }
  }
}

const hideUselessFields = () => {
  hideFieldByKey('360049219293');
  hideFieldByKey('360049245773');
}

const ZendeskMounterComponent = ({ classes = {} }: StyledComponentProps) => {
  const { zendeskOrganization } = useZendeskOrganization();
  const { name, email } = useSelector((state: IStoreState) => {
    return {
      // email: state.user.email,
      // name: state.user.name,
      email: 'email',
      name: 'name',
    };
  });

  const [loaded, setLoaded] = React.useState(false);

  const handleLoaded = () => {
    setLoaded(true);
  };

  const handleHide = () => {
    ZendeskAPI('webWidget', 'hide');
  };
  const handleShow = () => {
    ZendeskAPI('webWidget', 'show');
    setTimeout(hideUselessFields, 500);
  };
  const handleOpen = () => {
    ZendeskAPI('webWidget', 'open');
  };

  React.useEffect(() => {
    if (loaded) {
      handleHide();

      ZendeskAPI('webWidget:on', 'close', function () {
        handleHide();
      });
      ZendeskAPI('webWidget:on', 'open', function () {
        handleShow();
      });
    }
  }, [loaded]);

  React.useEffect(() => {
    ZendeskAPI('webWidget', 'identify', {
      name,
      email,
      organization: zendeskOrganization,
    });
  }, [name, email, zendeskOrganization]);
  return (
    <>
      <Zendesk zendeskKey={ZENDESK_KEY} {...setting} onLoaded={handleLoaded} />
      <div className={classes.launcherContainer}>
        <IconButton className={classes.launcher} onClick={handleOpen}>
          <ZendeskHelpIcon size={24} />
          <div className={classes.launcherText}>{t('zendesk.get-help')}</div>
        </IconButton>
      </div>
    </>
  );
};

export const ZendeskMounter = withStyles(styles)(ZendeskMounterComponent);
