import React from 'react';
import { useVideoTutorial } from './VideoTutorialStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import ReactPlayer from 'react-player';
import { ReactComponent as PlayIcon } from '../../../../common/assets/play.svg';
import { DIALOG_PRESENTATION } from '../../../../store/dialogs/actions';
import { useDialog } from '../../../../store/dialogs/selectors';
import { Dialog, DialogContent, IconButton } from '@material-ui/core';
import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';

const COVER_URL = 'https://cdn.stkr.io/assets/stkr_presentation.mp4';
const FULL_URL = 'https://www.youtube.com/embed/z5VYqaREVbE?autoplay=1';

export const VideoTutorial = () => {
  const classes = useVideoTutorial();

  const { isOpened, handleOpen: handlePlay, handleClose } = useDialog(
    DIALOG_PRESENTATION,
  );

  return (
    <section>
      <Curtains className={classes.root}>
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
                title={t('video-tutorial.title')}
                width="560"
                height="315"
                src={FULL_URL}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
        <div onClick={handlePlay}>
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
      </Curtains>
    </section>
  );
};
