import { Popover } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { uid } from 'react-uid';
import { ISidecar } from '../../../../store/apiMappers/sidecarsApi';
import { Button } from '../../../../UiKit/Button';
import { StkrSdk } from '../../../api';
import { ReactComponent as DockerIcon } from './assets/docker.svg';
import { ReactComponent as LinuxIcon } from './assets/linux.svg';
import { ReactComponent as MacIcon } from './assets/mac.svg';
import { ReactComponent as WindowsIcon } from './assets/windows.svg';
import { useSidecarLauncherStyles } from './SidecarLauncherStyles';

interface ISidecarLauncherProps {
  id: ISidecar['id'];
}

export const SidecarLauncher = ({ id }: ISidecarLauncherProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [popoverWidth, setPopoverWidth] = useState(0);
  const classes = useSidecarLauncherStyles({
    popoverWidth,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { offsetWidth } = event.currentTarget;
    setAnchorEl(event.currentTarget);

    if (offsetWidth !== popoverWidth) {
      setPopoverWidth(offsetWidth);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);
  const popoverId = isPopoverOpen ? id : undefined;

  const links = [
    {
      label: 'Windows',
      icon: <WindowsIcon />,
      action: () =>
        StkrSdk.getLastInstance().downloadSidecar(id, 'windows-amd64'),
    },
    {
      label: 'Linux',
      icon: <LinuxIcon />,
      action: () =>
        StkrSdk.getLastInstance().downloadSidecar(id, 'linux-amd64'),
    },
    {
      label: 'Mac OS',
      icon: <MacIcon />,
      action: () =>
        StkrSdk.getLastInstance().downloadSidecar(id, 'darwin-amd64'),
    },
    {
      label: 'Docker',
      icon: <DockerIcon />,
      action: () => StkrSdk.getLastInstance().downloadSidecar(id, 'docker'),
    },
  ];

  const renderedLinks = links.map(({ icon, action, label }, i) => (
    <button
      key={uid(i)}
      className={classes.link}
      onClick={action}
      type="button"
    >
      <i className={classes.linkIcon}>{icon}</i>

      {label}
    </button>
  ));

  return (
    <>
      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        endIcon={<ExpandMore fontSize="large" />}
        onClick={handleClick}
        classes={{
          endIcon: classNames(
            classes.buttonIcon,
            isPopoverOpen && classes.buttonIconActive,
          ),
        }}
        fullWidth
      >
        Select to download
      </Button>

      <Popover
        className={classes.popover}
        id={popoverId}
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.links}>{renderedLinks}</div>
      </Popover>
    </>
  );
};
