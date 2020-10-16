import {
  ITotalProps,
  Total as RangeTotal,
} from '../../../../components/Total/Total';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import React, { useCallback } from 'react';
import { IMicropoolListItemProps } from './types';

interface IMicropoolTotalProps extends ITotalProps {
  reference: IMicropoolListItemProps;
  onChange(e: IMicropoolListItemProps): void;
}

export const MicropoolListTotal = ({
  reference,
  onChange,
  ...props
}: IMicropoolTotalProps) => {
  const handleChange = useCallback(() => onChange(reference), [
    onChange,
    reference,
  ]);

  return (
    <RangeTotal {...props}>
      <Button
        variant="text"
        size="medium"
        color="secondary"
        onClick={handleChange}
      >
        {t('navigation.edit')}
      </Button>
    </RangeTotal>
  );
};
