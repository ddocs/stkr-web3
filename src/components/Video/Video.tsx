import React from 'react';
import { useVideoStyles } from './VideoStyles';
import ReactPlayer from 'react-player';
import { ReactComponent as PlayIcon } from '../../common/assets/play.svg';
import { DIALOG_PRESENTATION } from '../../store/dialogs/actions';
import { useDialog } from '../../store/dialogs/selectors';
import { Dialog, DialogContent, IconButton } from '@material-ui/core';
import { CancelIcon } from '../../UiKit/Icons/CancelIcon';

interface IVideoProps {
  coverUrl: string;
  fullUrl: string;
  videoTitle?: string;
}

export const Video = ({ coverUrl, fullUrl, videoTitle }: IVideoProps) => {
  const classes = useVideoStyles();

  const { isOpened, handleOpen: handlePlay, handleClose } = useDialog(
    DIALOG_PRESENTATION,
  );

  return (
    <>
      <div className={classes.root} onClick={handlePlay}>
        <ReactPlayer
          className={classes.preview}
          url={coverUrl}
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
        <DialogContent>
          <div className={classes.videoBox}>
            <iframe
              title={videoTitle}
              width="560"
              height="315"
              src={fullUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
