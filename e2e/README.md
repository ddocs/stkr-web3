## UI automation fraemwork

Supported chrome version 84.*

## Base
1. Test fraemwork based on WebdriverIO
`https://webdriver.io/`
2. Docs:
`https://webdriver.io/docs/`
3. Project use PageFactory

### Project architecture
- **test** folder contains all suites in mocha stile 
- **pageobjects** folder contains all page objects
- **wdio.conf.js** base setup file for webdriverIO - it defines spec of suites, excluded suites, timeouts and etc. 
- **config.js** define base url 

### How to run
0. preparation before run:
 - navigate to e2e folder
 - run command `npm install`
1. run all tests cases:
- `npm test`
2. to run scope there are 2 command:
---
1. `npm run test-stake-unstake` - this suite is independent and can be run without any additional preparation, cases:
    - add eth to balance
    - double add eth to balance
    - withdrawal eth from balance
2. `npm run test-staked` - this suite need additional steps before start, it is necessary to top up the balance 0x603366e08380EceB2E334621A27eeD36F34A9D50
    - covered staked process

### Metamask wallet
- privateKey: "4ea8639340b1301eafe87a155177c2188b697e557614d6a037a6c53c0570fd77"
- ethAddress: "0x603366e08380EceB2E334621A27eeD36F34A9D50"

