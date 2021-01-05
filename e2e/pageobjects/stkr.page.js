const Page = require('./page');
const elemUtil = require('../util/elementUtil')

const locators = {
  startStackingBtn: '//*[text()="Start staking"]',
  startProviderBtn: '//*[text()="Start as a provider"]',
  stackingBtn: '//*[@title="Stake more"]',
  stackingForm:{
    sliderCircleButton: '//*[@role="slider"]',
    amountValueBlock: '//*[text()="I want to stake"]/span',
    rulesCheckBox: '//input[@type="checkbox"]',
    stakeBtn: '//button[@type="submit"]'
  },
  stakeTable:{
    table:'//*[@role="grid"]',
    row:'//*[@role="row"]',
  },
  stakedAmountBox:'//*[@id="root"]/div/main/section/div/div[1]/div[2]/button[1]/span[1]',
  header:{
    ethAmount:'//*[@id="root"]/div/header/div/div[3]/button/span[1]'
  },
  unstakeBtn:'//span[text()="Unstake"]',
  totalStakedBlock:'//*[@id="root"]/div/main/section/div/div[1]/div[3]/span',
  currentBalance:{
    ethValueBlock:'//*[@id="root"]/div/main/section/div/div[2]/div[3]/div[1]',
    ethaValueBlock: '//*[@id="root"]/div/main/section/div/div[2]/div[3]/div[2]/span'
  }
};


class StkrPage extends Page {

  get startStackingBtn() { return $(locators.startStackingBtn) }
  get startProviderBtn() { return $(locators.startProviderBtn) }
  get stackingBtn() { return $(locators.stackingBtn) }
  get unstakeBtn() { return $(locators.unstakeBtn) }

  get stackingFormsSliderCircleButton() { return $(locators.stackingForm.sliderCircleButton) }
  get stackingFormAmountValueBlock() { return $(locators.stackingForm.amountValueBlock) }
  get stackingFormRulesCheckBox() { return $(locators.stackingForm.rulesCheckBox) }
  get stackingFormStakeBtn() { return $(locators.stackingForm.stakeBtn) }

  get stakedAmountBox() { return $(locators.stakedAmountBox) }

  get headerEthAmount() { return $(locators.header.ethAmount) }
  get totalStakedBlock() { return $(locators.totalStakedBlock) }

  get currentBalanceEthValueBlock() { return $(locators.currentBalance.ethValueBlock) }
  get currentBalanceEthaValueBlock() { return $(locators.currentBalance.ethaValueBlock) }

  doStartStacking(){
    this.startStackingBtn.moveTo()
    elemUtil.doClick(this.startStackingBtn)
  }

  doStartProvider(){
    this.startProviderBtn.moveTo()
    elemUtil.doClick(this.startProviderBtn)
  }

  doStakeETH(amount){
    elemUtil.doClick(this.stackingBtn)
    let currentAmount = parseFloat(this.stackingFormAmountValueBlock.getText())
    while(amount!=currentAmount){
      elemUtil.doDragAndDrop(this.stackingFormsSliderCircleButton, -10)
      currentAmount = parseFloat(this.stackingFormAmountValueBlock.getText())
    }
    elemUtil.doClickJS(this.stackingFormRulesCheckBox, false)
    elemUtil.doClick(this.stackingFormStakeBtn)
  }

  doVerifyLastRow(status,stakedAmount){
    let allRows = $$(locators.stakeTable.row)
    let lastRow = allRows[1]
    expect(status).to.be.equal(lastRow.$('./div[1]/div').getText())
    expect(stakedAmount).to.be.equal(lastRow.$('./div[2]/div').getText())
  }

  doGetTotalCountOfRows(){
    browser.waitUntil(
      () => $$(locators.stakeTable.row).length-1 > 0,
      {
        timeout: 10000,
        timeoutMsg: 'count of rows is 0'
      }
    )
    return $$(locators.stakeTable.row).length-1
  }

  doCheckThatTotalAmountIs(textAmount){
    elemUtil.doWaitUntilTextWillBe(this.stakedAmountBox,"Pending " + textAmount)
  }

  doWaitUntilWalletAmountWillChange(){
    elemUtil.doWaitUntilTextWillBeDifferent(this.headerEthAmount)
  }

  doUnstake(){
    elemUtil.doClick(this.unstakeBtn)
  }

  doWaitUntilTotalStakedWillChanged(previousValue, timeout=10000){
    browser.waitUntil(
      () => this.totalStakedBlock.getText() != previousValue,
      {
        timeout: timeout,
        timeoutMsg: 'text was not changed, defaultText ' + previousValue + " current text " + this.totalStakedBlock.getText()
      }
    )
  }

  doGetCurrentBalanceData(){
    let ethValue = this.currentBalanceEthValueBlock.getText()
    let ethaValue = this.currentBalanceEthValueBlock.getText()
    return {ethValue: ethValue,ethaValue: ethaValue}
  }

  doGetStakedBalance(){
    return this.totalStakedBlock.getText()
  }
}

module.exports = new StkrPage();