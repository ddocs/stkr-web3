import { Box, Button, Typography } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { Route } from 'react-router-dom';
import {
  PROVIDER_DEPOSIT_LIST_PATH,
  PROVIDER_DEPOSIT_PATH,
  PROVIDER_MAIN_PATH,
  PROVIDER_NODE_LIST_PATH,
} from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { Curtains } from '../../../../UiKit/Curtains';
import { NavLink } from '../../../../UiKit/NavLink';
import { CreateNodeDialog } from '../../components/CreateNodeDialog';
import { AlertDialog } from '../../components/CreateNodeDialog/AlertDialog';
import { DepositList } from '../../components/DepositList';
import { NodeList } from '../../components/NodeList';
import { ProviderTabs } from '../../components/ProviderTabs';
import { IItemProps } from '../../components/ProviderTabs/ProviderTabs';
import { useProviderDashboardStyles } from './ProviderDashboardStyles';
import { useProviderDashboard } from './useProviderDashboard';
import { roundCeilHalf } from '../../../../common/utils/numbers/roundCeilHalf';

export type OpenedFromName = 'ankr' | 'own-node';

const BALANCE_PRECISION = 4;

export const ProviderDashboard = () => {
  const classes = useProviderDashboardStyles();
  const {
    providerStats,
    sidecars,
    error,
    providerStatsLoading,
    isCreateNodeDialogOpen,
    openCreateNodeDialog,
    closeCreateNodeDialog,
    isAlertOpened,
    openAlertDialog,
    closeAlertDialog,
  } = useProviderDashboard();

  const hasError = !!error;
  const hasSidecars = sidecars && sidecars.length > 0;

  const [openedFrom, setOpenedFrom] = useState();

  const handleAlertOpen = (openedFromName: OpenedFromName) => {
    setOpenedFrom(openedFromName);
    openAlertDialog();
  };

  const tabs = useMemo<IItemProps[]>(
    () => [
      {
        label: t('navigation.sidecar-list'),
        path: PROVIDER_NODE_LIST_PATH,
        route: [PROVIDER_NODE_LIST_PATH, PROVIDER_MAIN_PATH],
      },
      ...[
        {
          label: t('provider-tabs.deposits'),
          path: PROVIDER_DEPOSIT_LIST_PATH,
          route: PROVIDER_DEPOSIT_LIST_PATH,
        },
      ],
    ],
    [],
  );

  const renderNodeList = useCallback(
    () =>
      sidecars ? (
        <NodeList
          className={classes.table}
          data={sidecars}
          handleCreateNode={openCreateNodeDialog}
        />
      ) : null,
    [classes.table, sidecars, openCreateNodeDialog],
  );

  const renderTopUpList = useCallback(() => {
    return <DepositList />;
  }, []);

  const renderTopUpLink = useCallback(
    () => (
      <NavLink
        className={classes.link}
        href={PROVIDER_DEPOSIT_PATH}
        variant="contained"
        color="primary"
      >
        {t('provider-dashboard.deposit')}
      </NavLink>
    ),
    [classes.link],
  );

  const renderCreateNodeBtn = useCallback(
    () => (
      <Button
        className={classes.link}
        color="primary"
        size="medium"
        onClick={openCreateNodeDialog}
      >
        <span className={classes.linkTextShort}>
          {t('empty-node-list.submit-short')}
        </span>
        <span className={classes.linkTextFull}>
          {t('empty-node-list.submit-full')}
        </span>
      </Button>
    ),
    [
      classes.link,
      classes.linkTextFull,
      classes.linkTextShort,
      openCreateNodeDialog,
    ],
  );

  const handleAlertCloseEx = useCallback(() => {
    closeAlertDialog();
    openCreateNodeDialog();
  }, [closeAlertDialog, openCreateNodeDialog]);

  return hasError ? (
    <QueryError error={error} />
  ) : (
    <>
      <section className={classes.component}>
        <Curtains classes={{ root: classes.wrapper }}>
          <div className={classes.navigation}>
            <ProviderTabs className={classes.tabs} tabs={tabs} />

            <Typography className={classes.balance}>
              {`${t('provider-dashboard.balance')}: `}

              {providerStatsLoading ? (
                <Box ml={1}>
                  <QueryLoading size={24} />
                </Box>
              ) : (
                <>
                  {t('provider-dashboard.balance-eth', {
                    balance: providerStats ? roundCeilHalf(providerStats.ethBalance) : 0
                  })}
                  <div className={classes.divider} />
                  {t('provider-dashboard.balance-ankr', {
                    balance: providerStats?.ankrBalance
                      .decimalPlaces(BALANCE_PRECISION)
                      .toFormat(),
                  })}
                </>
              )}
            </Typography>

            <Route
              path={[PROVIDER_DEPOSIT_LIST_PATH]}
              exact={true}
              render={renderTopUpLink}
            />

            {hasSidecars && ( // TODO: revert hasEnoughBalance
              <Route
                path={[PROVIDER_MAIN_PATH, PROVIDER_NODE_LIST_PATH]}
                exact={true}
                render={renderCreateNodeBtn}
              />
            )}
          </div>

          <Route
            path={[PROVIDER_MAIN_PATH, PROVIDER_NODE_LIST_PATH]}
            render={renderNodeList}
            exact={true}
          />

          <Route
            path={[PROVIDER_DEPOSIT_LIST_PATH]}
            render={renderTopUpList}
            exact={true}
          />
        </Curtains>
      </section>

      <CreateNodeDialog
        isOpened={isCreateNodeDialogOpen}
        handleClose={closeCreateNodeDialog}
        handleAlertOpen={handleAlertOpen}
      />

      <AlertDialog
        isOpen={isAlertOpened}
        onClose={handleAlertCloseEx}
        openedFrom={openedFrom}
      />
    </>
  );
};
