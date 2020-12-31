const Metamask = require('../metamask/metamask')
const Page = require('../pageobjects/page')
const IntroPage = require('../pageobjects/intro.page')
const ElemUtil = require('../util/elementUtil')
const StkrPage = require('../pageobjects/stkr.page')

const testData = {
}

describe('SUITE: stake and unstake without make a pull', () => {
  let totalCountOfRows = 0
  before('Signup', () => {
    browser.maximizeWindow()
    IntroPage.open();
  });
  it('Prepare metamask', ()=>{
    Metamask.doSetupMetamaskChrome()
    Metamask.doClosePopup()
  });
  it('import test account for metamask', ()=>{
    Metamask.doImportAccount()
    Metamask.doSwitchNetwork("Goerli Test Network")
    browser.closeWindow()
  });
  describe('CASE1: Simple stake 1 eth', () => {
    describe('Prepare payment info on Ankr page', ()=>{
      describe('Integrate stkr with metamask', () => {
        it('Refresh ankr page',()=>{
          IntroPage.doSwitchToAnkrTab()
          browser.refresh()
          browser.pause(5000)
        });
        it('Launch with metomask',()=>{
          IntroPage.launchWithMetomask()
          browser.pause(5000)
          Metamask.doSwitchToMetamaskNotificationWindow()
          Metamask.doIntegrateWithAnkr()
        });
      });
      describe('Staking 1 ETH',()=>{
        it('Switch to stkr page',()=>{
          IntroPage.doSwitchToAnkrTab()
          StkrPage.doStartStacking()
          browser.pause(3000)
        });
        it('Stake 1 ETH in stkr interface',()=>{
          totalCountOfRows = StkrPage.doGetTotalCountOfRows()
          StkrPage.doStakeETH(1)
          browser.pause(5000)
        });
        it('Confirm in metamask Window', ()=>{
          Metamask.doSwitchToMetamaskNotificationWindow()
          Metamask.doConfirmPayment()
          browser.pause(5000)
        });
      });
      describe('Check that 1 eth was added', ()=>{
        it('Switch to ankr page', ()=>{
          StkrPage.doSwitchToAnkrTab()
        });
        it('Check last row in transaction table', ()=>{
          StkrPage.doVerifyLastRow('Created','1 ETH')
          expect(totalCountOfRows+1).to.be.equal(StkrPage.doGetTotalCountOfRows())
        });
        it('Check wallet change and amount in pending',()=>{
          StkrPage.doWaitUntilWalletAmountWillChange()
          StkrPage.doCheckThatTotalAmountIs('1 ETH')
        });
      });
    });
  });
  describe('CASE2: Second stake for 1 more eth', () => {
    describe('Prepare payment info on Ankr page', ()=>{
      describe('Integrate stkr with metamask', () => {
        it('Refresh ankr page',()=>{
          browser.refresh()
          browser.pause(5000)
        });
        it('Launch with metomask',()=>{
          IntroPage.launchWithMetomask(false)
        });
      });
      describe('Staking one more ETH',()=>{
        it('Start stacking process',()=>{
          StkrPage.doStartStacking()
          browser.pause(3000)
        });
        it('Stake 1 ETH in stkr interface',()=>{
          totalCountOfRows = StkrPage.doGetTotalCountOfRows()
          StkrPage.doStakeETH(1)
          browser.pause(5000)
        });
        it('Confirm in metamask Window', ()=>{
          Metamask.doSwitchToMetamaskNotificationWindow()
          Metamask.doConfirmPayment()
          browser.pause(5000)
        });
      });
      describe('Check that 1 eth was added', ()=>{
        it('Switch to ankr page', ()=>{
          StkrPage.doSwitchToAnkrTab()
        });
        it('Check last row in transaction table', ()=>{
          StkrPage.doVerifyLastRow('Created','1 ETH')
          expect(totalCountOfRows+1).to.be.equal(StkrPage.doGetTotalCountOfRows())
        });
        it('Check wallet change and amount in pending',()=>{
          StkrPage.doWaitUntilWalletAmountWillChange()
          StkrPage.doCheckThatTotalAmountIs('2 ETH')
        });
      });
    });
  });
  describe('CASE3: Unstake all', () => {
    describe('Prepare payment info on Ankr page', ()=>{
      describe('Integrate stkr with metamask', () => {
        it('Refresh ankr page',()=>{
          browser.refresh()
          browser.pause(5000)
        });
        it('Launch with metomask',()=>{
          IntroPage.launchWithMetomask(false)
          StkrPage.doStartStacking()
        });
      });
      describe('Unstake all ETH',()=>{
        it('Unstake all', ()=>{
          browser.pause(2000)
          totalCountOfRows = StkrPage.doGetTotalCountOfRows()
          StkrPage.doUnstake()
          browser.pause(5000)
        })
        it('Confirm in metamask Window', ()=>{
          Metamask.doSwitchToMetamaskNotificationWindow()
          Metamask.doConfirmPayment()
          browser.pause(5000)
        });
      });
      describe('Check that 1 eth was added', ()=>{
        it('Switch to ankr page', ()=>{
          StkrPage.doSwitchToAnkrTab()
        });
        it('Check last row in transaction table', ()=>{
          StkrPage.doVerifyLastRow('Removed','2 ETH')
          expect(totalCountOfRows+1).to.be.equal(StkrPage.doGetTotalCountOfRows())
        });
        it('Check wallet change and amount in pending',()=>{
          StkrPage.doWaitUntilWalletAmountWillChange()
        });
      });
    });
  });
});
