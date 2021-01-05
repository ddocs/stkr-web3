const Page = require('../pageobjects/page');
const elemUtil = require('../util/elementUtil')

const locators = {
  setup:{
    startSetupBtn:'//*[text()="Get Started"]',
    importWalletBtn:'//*[text()="Import wallet"]',
    agreeBtn:'//*[text()="I Agree"]',
    importWindow:{
      seedPhraseInput: '//*[@placeholder="Paste seed phrase from clipboard"]',
      password: '//*[@id="password"]',
      confirmPassword: '//*[@id="confirm-password"]',
      termsAgree: '//*[@class="first-time-flow__checkbox first-time-flow__terms"]',
      importBtn: '//*[text()="Import"]'
    },
    allDoneBtn: '//*[text()="All Done"]',
  },
  closePopUpBtn: '//*[@title="Close"]',
  network:{
    listBtn:'//*[@class="network-indicator"]',
    ropstenLI:'//*[text()="Ropsten Test Network"]'
  },
  account:{
    accountIcon:'//*[@class="identicon__address-wrapper"]',
    menuImportAccount:'//*[text()="Import Account"]',
    keyInput:'//*[@id="private-key-box"]',
    importBtn:'//button[text()="Import"]'
  },
  addToken:{
    AddTokenBtn:'//button[text()="Add Token"]',
    CustomTokenTab:'//*[text()="Custom Token"]',
    CustomAddressInput:'//*[@id="custom-address"]',
    NextBtn:'//*[text()="Next"]',
    ConfirmBtn:'//button[text()="Add Tokens"]',
  },
  payment:{
    USDTOption: '//*[text()="Send USDT"]',
    ANKROption:'//*[text()="Send ANKR"]',
    form:{
      addressInput: '//*[@data-testid="ens-input"]',
      amountInput: '//*[@class="unit-input__input-container"]/input',
      nextBtn: "//button[text()='Next']",
      confirmBtn: '//*[text()="Confirm"]'
    }
  },
  integratePopUp:{
    nextBtn: '//*[text()="Next"]',
    connectBtn: '//*[text()="Connect"]',
  },
  paymentPopUp:{
    confirmBtn: '//*[text()="Confirm"]',
  }
};
const data ={
  seedPhrase: "disagree social width elite journey tower spawn foam ugly witness turn frost kind grunt awkward manual pioneer cross risk grab aware sea glance tube",
  password: "12345678",
  privateKey: "4ea8639340b1301eafe87a155177c2188b697e557614d6a037a6c53c0570fd77",
  contractANKR: "0x3fff8d0697f561a4a60121a302432f4a105d55a6",
  contractUSDT: "0x98b78f473dcfa4122dce98583e088d594185fba7",
}

class Metamask extends Page {

  get setupStartSetupBtn() { return $(locators.setup.startSetupBtn) }
  get setupImportWalletBtn() { return $(locators.setup.importWalletBtn) }
  get setupAgreeBtn() { return $(locators.setup.agreeBtn) }
  get setupImportSeedPhraseInput() { return $(locators.setup.importWindow.seedPhraseInput) }
  get setupImportSeedPassword() { return $(locators.setup.importWindow.password) }
  get setupImportSeedConfirmPassword() { return $(locators.setup.importWindow.confirmPassword) }
  get setupImportSeedTermsAgree() { return $(locators.setup.importWindow.termsAgree) }
  get setupImportSeedImportBtn() { return $(locators.setup.importWindow.importBtn) }
  get setupAllDoneBtn() { return $(locators.setup.allDoneBtn) }

  get closePopUpBtn() { return $(locators.closePopUpBtn) }

  get networkListBtn() { return $(locators.network.listBtn) }
  get networkRopstenLI() { return $(locators.network.ropstenLI) }

  get accountAccountIcon() { return $(locators.account.accountIcon) }
  get accountMenuImportAccount() { return $(locators.account.menuImportAccount) }
  get accountKeyInput() { return $(locators.account.keyInput) }
  get accountImportBtn() { return $(locators.account.importBtn) }

  get addTokenAddTokenBtn() { return $(locators.addToken.AddTokenBtn) }
  get addTokenCustomTokenTab() { return $(locators.addToken.CustomTokenTab) }
  get addTokenCustomAddressInput() { return $(locators.addToken.CustomAddressInput) }
  get addTokenNextBtn() { return $(locators.addToken.NextBtn) }
  get addTokenConfirmBtn() { return $(locators.addToken.ConfirmBtn) }

  get paymentUSDTOption() {return $(locators.payment.USDTOption)}
  get paymentANKROption() {return $(locators.payment.ANKROption)}
  get paymentFormAddressInput() {return $(locators.payment.form.addressInput)}
  get paymentFormAmountInput() {return $(locators.payment.form.amountInput)}
  get paymentFormNextBtn() {return $(locators.payment.form.nextBtn)}
  get paymentFormConfirmBtn() {return $(locators.payment.form.confirmBtn)}

  get integratePopUpNextBtn() { return $(locators.integratePopUp.nextBtn) }
  get integratePopUpConnectBtn() { return $(locators.integratePopUp.connectBtn) }

  get paymentPopUpConfirmBtn() { return $(locators.paymentPopUp.confirmBtn) }

  doSwitchToMetamaskTab() {
    this.doSwitchToTab('MetaMask');
  }

  doOpenHomePage() {
    let baseUrl = browser.getUrl().substr(0, 52)
    browser.url(baseUrl + "home.html")
  }

  doSetupMetamaskChrome(){
    browser.pause(5000)
    this.doSwitchToTab('MetaMask')
    elemUtil.doClick(this.setupStartSetupBtn)
    elemUtil.doClick(this.setupImportWalletBtn)
    elemUtil.doClick(this.setupAgreeBtn)
    elemUtil.doSetValue(this.setupImportSeedPhraseInput, data.seedPhrase)
    elemUtil.doSetValue(this.setupImportSeedPassword, data.password)
    elemUtil.doSetValue(this.setupImportSeedConfirmPassword, data.password)
    elemUtil.doClick(this.setupImportSeedTermsAgree)
    elemUtil.doClickWithRedirect(this.setupImportSeedImportBtn)
    elemUtil.doClickWithRedirect(this.setupAllDoneBtn)
  }
  doClosePopup(){
    elemUtil.doClick(this.closePopUpBtn)
  }
  doAddToken(contract){
    elemUtil.doClickWithRedirect(this.addTokenAddTokenBtn)
    elemUtil.doClick(this.addTokenCustomTokenTab)
    elemUtil.doSetValue(this.addTokenCustomAddressInput, contract)
    browser.pause(3000)
    elemUtil.doClickWithRedirect(this.addTokenNextBtn)
    browser.pause(3000)
    elemUtil.doClickWithRedirect(this.addTokenConfirmBtn)
    browser.pause(3000)
  }

  doImportAccount(){
    this.doSwitchNetwork("Ropsten Test Network")
    this.doImportAccount()
  }

  doAddAdditionalTokens(){
    this.doAddToken(data.contractANKR)
    this.doOpenHomePage()
    this.doAddToken(data.contractUSDT)
    this.doOpenHomePage()
  }

  doSwitchNetwork(name){
    elemUtil.doClick(this.networkListBtn)
    let liXpath = '//li//*[text()="'+name+'"]'
    elemUtil.doClick($(liXpath))
  }

  doImportAccount(){
    elemUtil.doClick(this.accountAccountIcon)
    elemUtil.doClick(this.accountMenuImportAccount)
    elemUtil.doSetValue(this.accountKeyInput, data.privateKey)
    elemUtil.doClick(this.accountImportBtn)
  }

  doPaymentBy(currencyName, address, amount){
    switch(currencyName) {
      case "USDT":
        elemUtil.doClickWithRedirect(this.paymentUSDTOption)
        break;
      case "ANKR":
        elemUtil.doClickWithRedirect(this.paymentANKROption)
        break;
    }
    elemUtil.doSetValue(this.paymentFormAddressInput, address)
    browser.pause(2000)
    elemUtil.doSetValue(this.paymentFormAmountInput, amount)
    browser.pause(2000)
    elemUtil.doClick(this.paymentFormNextBtn)
    browser.pause(2000)
    elemUtil.doClickWithRedirect(this.paymentFormConfirmBtn)
  }

  doIntegrateWithAnkr(){
    elemUtil.doClick(this.integratePopUpNextBtn)
    elemUtil.doClick(this.integratePopUpConnectBtn)
  }

  doSwitchToMetamaskNotificationWindow(){
    browser.switchWindow("MetaMask Notification")
  }

  doConfirmPayment() {
    elemUtil.doClick(this.paymentPopUpConfirmBtn)
  }
}

module.exports = new Metamask();