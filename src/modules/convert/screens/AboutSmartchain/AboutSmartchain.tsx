import React, { useCallback } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { t, tHTML } from "../../../../common/utils/intl";
import { useAboutSmartchainStyles } from './AboutSmartchainStyles';
import step1Img from './assets/step1.png';
import step2Img from './assets/step2.png';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../../../store/actions/UserActions';

export const AboutSmartchain = () => {
  const dispatch = useDispatch();
  const classes = useAboutSmartchainStyles();

  const handleConnect = useCallback(() => {
    dispatch(UserActions.connect());
  }, [dispatch]);

  return (
    <section>
      <Curtains className={classes.content}>
        <Paper variant="outlined" square={false}>
          <Box mb={7}>
            <Typography variant="h2" align="center">
              {t('about-smartchain.title')}
            </Typography>
          </Box>
          <Box mb={10}>
            <Typography variant="body1">
              {t('about-smartchain.text.0')}
            </Typography>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
            gridGap={77}
            mb={11.5}
          >
            <Box
              gridColumn={1}
              gridRow={{ xs: 'auto', sm: '1 / 4' }}
              display="block"
            >
              <img
                src={step1Img}
                alt={t('about-smartchain.text.1')}
                className={classes.image1}
              />
              <img
                src={step2Img}
                alt={t('about-smartchain.text.2')}
                className={classes.image2}
              />
            </Box>
            <Typography variant="body2">
              {t('about-smartchain.text.1')}
            </Typography>
            <Typography variant="body2">
              {t('about-smartchain.text.2')}
            </Typography>
            <Typography variant="body2">
              {tHTML('about-smartchain.text.3')}
            </Typography>
          </Box>
          <Box mb={7}>
            <Typography variant="body2">
              {t('about-smartchain.text.4')}
            </Typography>
          </Box>
          <Box mb={10}>
            <Typography variant="body2">
              {t('about-smartchain.text.5')}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleConnect}
              color="primary"
              size="large"
              fullWidth={true}
              className={classes.submit}
            >
              {t('about-smartchain.submit')}
            </Button>
          </Box>
        </Paper>
      </Curtains>
    </section>
  );
};
