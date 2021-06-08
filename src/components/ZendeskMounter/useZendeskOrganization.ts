import { useSelector } from 'react-redux';
import { IStoreState } from '../../store/reducers';

export const useZendeskOrganization = (doFetch = true) => {
  const { zendeskOrganization, fetchOrganizationStatus } = useSelector(
    (state: IStoreState) => {
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
