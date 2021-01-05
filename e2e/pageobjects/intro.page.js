const Page = require('./page');
const elemUtil = require('../util/elementUtil')

const locators = {
  launchBtn: '//header//button/span[text()="Launch App"]',
  metaMaskOption: '//*[text()="MetaMask"]'
};


class IntroPage extends Page {

  get launchBtn() { return $(locators.launchBtn) }
  get metaMaskOption() { return $(locators.metaMaskOption) }

  launchWithMetomask(clickLaunch=true){
    if(clickLaunch){
      elemUtil.doClick(this.launchBtn)
    }
    browser.pause(8000)
    let metaMaskOptionX = '//*[text()="MetaMask"]/..'
    $(metaMaskOptionX).moveTo()
    elemUtil.doClick(
      $(metaMaskOptionX)
    )
  }

  open() {
    return super.open('');
  }

}

module.exports = new IntroPage();