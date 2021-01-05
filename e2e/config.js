const path = require('path');

let { DOMAIN } = process.env;
if (DOMAIN && !DOMAIN.includes('https://')) {
  DOMAIN = `https://${DOMAIN}`;
}

module.exports = {
  URL: DOMAIN || 'https://goerli.stkr.io/',
  PROD_URL: 'https://stkr.ankr.com/'
};