/* eslint-disable import/no-anonymous-default-export */
import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { getPercentage } from '../../common/utils/styleUtils';
import { ScrollLoader } from './ScrollLoader';

const LAST_PAGE = 5;
const ITEMS_PER_PAGE = 4;

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const reuqestExample = async (i: number) => {
  await sleep(500);

  const images = new Array(ITEMS_PER_PAGE).fill(0);

  return images.map((_, j) => `https://picsum.photos/800/400?random=${i}${j}`);
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2, 2),
  },

  imgWrap: {
    position: 'relative',
    width: '100%',

    '&:before': {
      content: `''`,
      display: 'block',
      paddingTop: getPercentage(2, 3),
    },
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const DefaultStory = () => {
  return (
    <ScrollLoader onLoadMore={() => console.log('need to load')} isLoading />
  );
};

export const Default = () => <DefaultStory />;

const WithImagesStory = () => {
  const classes = useStyles();
  const [images, setImages] = useState<string[]>();
  const [allIsLoaded, setAllIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    const data = await reuqestExample(page + 1);
    setIsLoading(false);
    setImages(images ? [...images, ...data] : data);
    setPage(page => page + 1);
  }, [images, page]);

  useEffect(() => {
    if (page === LAST_PAGE) {
      setAllIsLoaded(true);
    }
  }, [page]);

  const renderedImages = images?.map((img, i) => (
    <div className={classes.imgWrap}>
      <img
        className={classes.img}
        src={img}
        alt={`picsum ${page + 1}`}
        key={uid(img, i)}
      />
    </div>
  ));

  return (
    <>
      <div className={classes.root}>{renderedImages}</div>

      <ScrollLoader
        onLoadMore={loadImages}
        disabled={allIsLoaded}
        isLoading={isLoading}
      />

      {allIsLoaded && (
        <Box mt={3}>
          <Typography align="center" color="textSecondary">
            All images loaded
          </Typography>
        </Box>
      )}
    </>
  );
};

export const WithImages = () => <WithImagesStory />;

export default {
  title: 'components/ScrollLoader',
};
