export interface IUserInfo {
  displayName: string;
  providerInfo: {
    addr: string;
    email: string;
    name: string;
    iconUrl: string;
    status: 'Active';
  };
}
