import React, { useState } from 'react';
import { useAnkrInstructionsVideoDialogStyles } from './AnkrInstructionsVideoDialogStyles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { t } from '../../../../common/utils/intl';
import { ANKR_DEPLOY_PATH } from '../../const';
import ReactPlayer from 'react-player';
import { ReactComponent as PlayIcon } from '../../../../common/assets/play.svg';

const VIDEO_URL = 'https://www.youtube.com/embed/0ptckizC4fI?autoplay=1';
const COVER_URL = 'https://cdn.stkr.io/assets/stkr_presentation.mp4';

interface IAnkrInstructionsVideoDialogProps {
  isOpened: boolean;
  handleClose: () => void;
}

export const AnkrInstructionsVideoDialog = ({
  isOpened,
  handleClose,
}: IAnkrInstructionsVideoDialogProps) => {
  const classes = useAnkrInstructionsVideoDialogStyles();
  const [isPlaying, play] = useState(false);

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="lg"
      classes={{ paper: classes.dialogPaper }}
      BackdropProps={{
        children: (
          <IconButton className={classes.close} onClick={handleClose}>
            <CancelIcon size="xmd" />
          </IconButton>
        ),
      }}
    >
      <DialogTitle className={classes.header}>
        <Typography variant="h3">
          {t('provider-dashboard.continue-with-ankr')}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.root}>
        {isPlaying && (
          <iframe
            title={t('video-tutorial.title')}
            width="560"
            height="315"
            src={VIDEO_URL}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {!isPlaying && (
          <div className={classes.preview} onClick={() => play(true)}>
            <ReactPlayer
              url={COVER_URL}
              controls={false}
              playing={true}
              muted={true}
              volume={0.7}
              loop={true}
              width="100%"
              height="auto"
            />
            <PlayIcon className={classes.play} />
          </div>
        )}
        <Typography variant="body1" className={classes.content}>
          {t('provider-dashboard.ankr-instructions')}
        </Typography>
        <Button
          color="primary"
          size="large"
          onClick={() => {
            window.open(ANKR_DEPLOY_PATH, '_blank');
          }}
          fullWidth={true}
          className={classes.button}
        >
          {t('provider-dashboard.continue-with-ankr')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
