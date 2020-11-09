export interface IStkrConfig {
  baseUrl: string;
  configFile: string;
}

export const LOCAL_CONFIG: IStkrConfig = {
  baseUrl: 'http://localhost:8080',
  configFile: 'develop.json',
};

export const DEVELOP_CONFIG: IStkrConfig = {
  baseUrl: 'https://api.stkr-dev.ankr.com/',
  configFile: 'develop.json',
};

export const GOERLI_CONFIG: IStkrConfig = {
  baseUrl: 'https://api.stkr-goerli.ankr.com/',
  configFile: 'goerli.json',
};
