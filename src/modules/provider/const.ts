const ANKR_ROOT =
  process.env.REACT_APP_ANKR_ROOT ?? 'http://dev-local.ankr.com:3000';
const ANKR_STKR_NODE_VERSION =
  process.env.REACT_APP_ANKR_STKR_NODE_VERSION ?? '0.0.4';
const ANKR_STKR_NODE_APP_VERSION =
  process.env.REACT_APP_ANKR_STKR_NODE_APP_VERSION ?? '1.0.5';

export const ANKR_DEPLOY_PATH = `${ANKR_ROOT}/apps/deploy?name=ankr-eth2.0&repository=stable&type=chart&version=${ANKR_STKR_NODE_VERSION}&appversion=v${ANKR_STKR_NODE_APP_VERSION}`;
