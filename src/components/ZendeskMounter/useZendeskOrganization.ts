import { useSelector } from 'react-redux';
import { IStoreState } from '../../store/reducers';

export const useZendeskOrganization = (doFetch = true) => {
  const { zendeskOrganization, fetchOrganizationStatus } = useSelector(
    (state: IStoreState) => {
      // const currentTeamId = state.team.currentTeamId ?? '';
      // return {
      //   zendeskOrganization: state.zendesk.organizations?.[currentTeamId],
      //   fetchOrganizationStatus: state.zendesk.fetchOrganizationStatus,
      // };
      return {
        zendeskOrganization: 'zendeskOrganization',
        fetchOrganizationStatus: 'fetchOrganizationStatus',
      };
    },
  );

  return {
    zendeskOrganization,
    fetchOrganizationStatus,
  };
};
