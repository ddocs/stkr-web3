import { Box } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../common/hooks/useIntersectionObserver';
import { QueryLoading } from '../QueryLoading/QueryLoading';

interface IScrollLoader {
  onLoadMore: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ScrollLoader = ({
  disabled = false,
  isLoading = true,
  onLoadMore,
}: IScrollLoader) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useIntersectionObserver((isVisible: boolean) => {
    if (isVisible) {
      setIsLoaderVisible(isVisible);
    }
  }, ref);

  useEffect(() => {
    if (isLoaderVisible && !disabled) {
      onLoadMore();
      setIsLoaderVisible(false);
    }
  }, [disabled, isLoaderVisible, onLoadMore]);

  const renderedLoader = (
    <Box textAlign="center">
      {isLoading ? <QueryLoading /> : <div ref={ref} style={{ height: 1 }} />}
    </Box>
  );

  return disabled ? null : renderedLoader;
};
