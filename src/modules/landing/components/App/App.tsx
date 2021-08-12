import React, { useState } from 'react';
import cn from 'classnames';
import { Fade } from '@material-ui/core';

import Header from '../Header/Header';

import { useStyles } from './Styles';
import Title from '../Title/Title';
import WhySection from '../WhySection/WhySection';
import Products from '../Products/Products';
import Partners from '../Partners/Partners';
import Footer from '../Footer/Footer';
import FAQ from '../FAQ/FAQ';
import BgVideo from '../BgVideo/BgVideo';
import Menu from '../Menu/Menu';
import Button from '../Button/Button';
import NetworkModal from '../NetworkModal/NetworkModal';
import { ENABLE_PARACHAIN_APP } from '../../../../common/const';

const App = () => {
  const classes = useStyles();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isNetworkModalOpened, setIsNetworkModalOpened] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpened(isOpened => !isOpened);
  };

  const handleNetworkModalToggle = () => {
    setIsNetworkModalOpened(isModalOpened => !isModalOpened);
  };

  return (
    <div
      className={cn(classes.container, {
        [classes.containerWithModal]: isMenuOpened || isNetworkModalOpened,
      })}
    >
      <Header onMenuToggle={handleMenuToggle} isMenuOpened={isMenuOpened} />
      <Menu onMenuToggle={handleMenuToggle} isVisible={isMenuOpened} />
      <NetworkModal
        onToggle={handleNetworkModalToggle}
        isVisible={isNetworkModalOpened}
      />
      <div className={classes.launchButton}>
        {ENABLE_PARACHAIN_APP ? (
          <Button
            text="Launch App"
            needFade
            onClick={handleNetworkModalToggle}
          />
        ) : (
          <Fade in timeout={1500}>
            <div className={classes.launchButtonText}>Coming soon</div>
          </Fade>
        )}
      </div>
      <BgVideo />
      <Title />
      {!isMenuOpened && (
        <>
          <WhySection />
          <Products />
          <Partners />
          <FAQ />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
