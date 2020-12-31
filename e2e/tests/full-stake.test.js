const Metamask = require('../metamask/metamask')
const Page = require('../pageobjects/page')
const IntroPage = require('../pageobjects/intro.page')
const ElemUtil = require('../util/elementUtil')
const StkrPage = require('../pageobjects/stkr.page')

const testData = {
}

describe('SUITE: stake fo full', () => {
  let totalCountOfRows = 0
  let currentBalanceStatus = {}
  let currentStakedBalance = ''
  before('Open', () => {
    browser.maximizeWindow()
    IntroPage.open();
  });
  after('Unstake',()=>{
    browser.pause(3000)
    if(StkrPage.unstakeBtn.isDisplayed()){
      StkrPage.doUnstake()
    }
  })
  it('Prepare metamask', ()=>{
    Metamask.doSetupMetamaskChrome()
    Metamask.doClosePopup()
  });
  it('import test account for metamask', ()=>{
    Metamask.doImportAccount()
    Metamask.doSwitchNetwork("Goerli Test Network")
    browser.closeWindow()
  });
  describe('CASE1: stake 32 eth and wait a full pull', () => {
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
      describe('Staking 32 ETH',()=>{
        it('Switch to stkr page',()=>{
          IntroPage.doSwitchToAnkrTab()
          StkrPage.doStartStacking()
          browser.pause(3000)
        });
        it('Save data befor stake', ()=>{
          currentStakedBalance = StkrPage.doGetStakedBalance()
          currentBalanceStatus = StkrPage.doGetCurrentBalanceData()
          totalCountOfRows = StkrPage.doGetTotalCountOfRows()
        })
        it('Stake 32 ETH in stkr interface',()=>{
          StkrPage.doStakeETH(32)
          browser.pause(5000)
        });
        it('Confirm in metamask Window', ()=>{
          Metamask.doSwitchToMetamaskNotificationWindow()
          Metamask.doConfirmPayment()
          browser.pause(5000)
        });
      });
      describe('Check that 32 eth was added', ()=>{
        it('Switch to ankr page', ()=>{
          StkrPage.doSwitchToAnkrTab()
        });
        it('Check wallet change and amount in pending',()=>{
          StkrPage.doWaitUntilWalletAmountWillChange()
          StkrPage.doCheckThatTotalAmountIs('32 ETH')
        });
        describe('Check staking process', ()=>{
          it('Check that staked balance will change', () =>{
            StkrPage.doWaitUntilTotalStakedWillChanged(currentStakedBalance, 40000)
          })
          it('Check that balance was changed', ()=>{
            browser.refresh()
            browser.pause(3000)
            IntroPage.launchWithMetomask(false)
            StkrPage.doStartStacking()
            expect(currentBalanceStatus.ethValue).to.be.not.equal(StkrPage.doGetCurrentBalanceData().ethValue)
            expect(currentBalanceStatus.ethaValue).to.be.not.equal(StkrPage.doGetCurrentBalanceData().ethaValue)
          })
          it('Check last row in transaction table', ()=>{
            StkrPage.doVerifyLastRow('Confirmed','32 ETH')
          });
        })
      });
    });
  });
});
