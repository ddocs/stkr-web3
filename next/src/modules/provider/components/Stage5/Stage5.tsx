import React, { useState } from 'react';
import { useStage5Styles } from './Stage5Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { Headline1 } from '../../../../UiKit/Typography';
import { tHTML, t } from '../../../../common/utils/intl';
import { IStoreState } from '../../../../store/reducers';
import { connect } from 'react-redux';
import { BeaconList } from '../BeaconList';
import { MicropoolListComponent } from '../MicropoolList/MicropoolList';
import { ITablesRowProps } from '../../../../components/TableComponents/types';
import { Button } from '../../../../UiKit/Button';

interface IStage4StoreProps {
  displayName: string;
  micropool: ITablesRowProps[] | undefined;

  onCreateBeaconNode?(x: any): void;
}

interface IStage4Props extends IStageProps, IStage4StoreProps {
  nextStep(x: any): void;
}

enum Tabs {
  micropool = 'micropool',
  beacon = 'beacon',
}

export const Stage5Component = ({
  className,
  displayName,
  micropool,
  onCreateBeaconNode,
  nextStep,
}: IStage4Props) => {
  const classes = useStage5Styles();

  const [value, setValue] = useState(Tabs.beacon);

  const TABS = [
    {
      value: Tabs.micropool,
      label: 'navigation.micropool-list',
    },
    {
      value: Tabs.beacon,
      label: 'navigation.beacon-list',
    },
  ];

  return (
    <div className={classNames(classes.component, className)}>
      <Headline1 className={classes.title}>
        {tHTML('dashboard.hi', { name: displayName })}
      </Headline1>
      <div className={classes.navigation}>
        <ul className={classes.list}>
          {TABS.map(tab => {
            const active = tab.value === value;
            return (
              <li className={classes.item}>
                <button
                  className={classNames(
                    classes.tab,
                    active && classes.activeTab,
                  )}
                  onClick={() => setValue(tab.value)}
                  disabled={active}
                >
                  {t(tab.label)}
                </button>
              </li>
            );
          })}
        </ul>
        {value === Tabs.beacon && (
          <Button
            className={classes.create}
            onClick={onCreateBeaconNode}
            size="small"
            color="primary"
          >
            {t('navigation.create')}
          </Button>
        )}
      </div>
      {value === Tabs.micropool && (
        <MicropoolListComponent
          className={classes.table}
          onCreateMicropool={nextStep}
          data={micropool}
        />
      )}
      {value === Tabs.beacon && <BeaconList className={classes.table} />}
    </div>
  );
};

const Stage5Imp = ({
  className,
  ...props
}: IStageProps & IStage4StoreProps) => {
  const { moveForward } = useFlowControl();

  return (
    <Stage5Component className={className} nextStep={moveForward} {...props} />
  );
};

const Step5Connected = connect(
  (state: IStoreState) => ({
    displayName: 'Alexander',
    micropool: undefined,
  }),
  {
    onCreateBeaconNode: () => alert('Create another beacon chain node'),
  },
)(Stage5Imp);

export const Stage5 = defineFlowStep<{}, {}, IStageProps>({
  Body: Step5Connected,
});
