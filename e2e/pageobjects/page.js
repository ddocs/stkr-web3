const config = require('../config');
const elemUtil = require('../util/elementUtil')

module.exports = class Page {
  open (path) {
    return browser.url(config.URL+`${path}`)
  }
  logout(username){
    let userMenuXpath = `//span[text()="${username}"]`
    let userMenuLogout = `//*[text()="Log out"]`
    elemUtil.doClick($(userMenuXpath))
    elemUtil.doClickWithRedirect($(userMenuLogout))
  }
  textIsDisplayed(text, timeout = 10000){
    let xpath = `//*[text()="${text}"]`
    $(xpath).waitForExist({timeout:timeout})
    expect($(xpath).isDisplayed()).to.be.equal(true)
  }
  generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
      var j = (Math.random() * (a.length-1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  }
  doCheckUrlIs(expectedUrl){
    expect(browser.getUrl()).to.be.equal(expectedUrl)
  }
  doSwitchToAnkrTab(){
    browser.switchWindow("Stkr")
  }
  doOpenNewTab(url){
    browser.newWindow(url)
  }
  doSwitchToTab(urlOrTitleToMatch){
    browser.switchWindow(urlOrTitleToMatch)
  }
  doCloseTab(){
    browser.closeWindow()
  }
  doCheckUrlIs(expectedUrl){
    expect(browser.getUrl()).to.be.equal(expectedUrl)
  }
  doIsTextDisplay(text){
    let xpath = `//*[text()="${text}"]`
    let count = $$(xpath).length
    if(count > 0)
      return true
    else
      return false
  }
}


