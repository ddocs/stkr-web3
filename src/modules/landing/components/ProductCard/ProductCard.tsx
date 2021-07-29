import React, {useState} from 'react';
import {useMediaQuery} from "@material-ui/core";
import cn from "classnames";

import { useStyles } from './Styles';
import ProgressLine from "../ProgressLine/ProgressLine";

interface ProductCardInfoType {
  totalRaised: number | 'N/A',
  raisedAnkr: number | 'N/A',
  initialReward: number | 'N/A',
  dailyReward: number | 'N/A',
}
export interface ProductCardProps {
  title: string,
  description: string,
  time: string,
  iconUrl: string,
  tokenName: string,
  info: ProductCardInfoType,
}
const ProductCard = ({ title, description, time, iconUrl, info, tokenName }: ProductCardProps) => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const isDesktop = useMediaQuery('(min-width:960px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleFocus = () => {
    if (isDesktop) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (isDesktop) {
      setIsFocused(false);
    }
  };

  return (
    <div
      className={classes.container}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      style={{ background: isFocused ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}
    >
      <img className={classes.icon} src={iconUrl} />
      <div className={classes.title}>{title}</div>
      <div className={cn(classes.focusedButton, {[classes.focusedButtonVisible]: isFocused})}>Coming soon</div>
      <div className={cn(classes.infoContainer, {[classes.infoContainerHidden]: isFocused})}>
        {!isMobile && (
          <div className={classes.description}>{description}</div>
        )}
        <div className={classes.info}>
          <div className={classes.infoItem}>
            <div className={classes.infoTitle}>Total Raised</div>
            {info.totalRaised === 'N/A' ? (
              <div className={classes.infoValue}>N/A</div>
            ) : (
              <>
                <div className={classes.infoValue}>
                  {info.totalRaised.toLocaleString()}<span>/1M DOT</span>
                </div>
                <ProgressLine max={1000000} value={info.totalRaised} />
              </>
            )}
          </div>
          <div className={classes.infoItem}>
            <div className={classes.infoTitle}>Raised on Ankr</div>
            {info.raisedAnkr === 'N/A' ? (
              <div className={classes.infoValue}>N/A</div>
            ) : (
              <>
                <div className={classes.infoValue}>
                  {info.raisedAnkr.toLocaleString()}<span>/100 000 DOT</span>
                </div>
                <ProgressLine max={100000} value={info.raisedAnkr} />
              </>
            )}
          </div>
          <div className={classes.infoItem}>
            <div className={classes.infoTitle}>Expected Initial reward airdrop per aDOTp</div>
            <div className={classes.infoValue}>
              {info.initialReward === 'N/A' ? `N/A ${tokenName}` : `${info.initialReward.toLocaleString()} ${tokenName}`}
            </div>
          </div>
          <div className={classes.infoItem}>
            <div className={classes.infoTitle}>Estimated daily reward per aDOTp</div>
            <div className={classes.infoValue}>
              {info.dailyReward === 'N/A' ? `N/A ${tokenName}` : (
                <>
                  `${info.dailyReward.toLocaleString()} ${tokenName}`
                  <span>APR: 52%</span>
                </>
              )}
            </div>
          </div>
        </div>
        {!isDesktop && (
          <div className={classes.focusedMobileButton}>Coming soon</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;