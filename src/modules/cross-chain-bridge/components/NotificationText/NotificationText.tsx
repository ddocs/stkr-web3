import { Box, BoxProps } from '@material-ui/core';
import React from 'react';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { Body2 } from '../../../../UiKit/Typography';

interface INotificationTextProps extends BoxProps {
  isLoading?: boolean;
}

export const NotificationText = ({
  isLoading = false,
  children,
  ...restProps
}: INotificationTextProps) => {
  return (
    <Box mb={3} textAlign="center" {...restProps}>
      <Body2 color="textSecondary">
        {isLoading ? (
          <Box display="inline-flex" alignItems="center">
            loading...
            <Box display="flex" ml={2}>
              <QueryLoading size={16} />
            </Box>
          </Box>
        ) : (
          children
        )}
      </Body2>
    </Box>
  );
};
