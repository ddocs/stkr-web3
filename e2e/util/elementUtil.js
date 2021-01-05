class ElementUtil{

    doClick(elem, timeout=10000){
        elem.waitForDisplayed({
            timeout: timeout
        })
        elem.waitForClickable({
            timeout: timeout
        })
        elem.click()
    }

    doClickJS(elem, shouldDisplayed = true){
        if(shouldDisplayed){
            elem.waitForDisplayed()
        }
        browser.execute("arguments[0].click();", elem);
    }

    doClickWithRedirect(elem, timeout=10000){
        let oldUrl = browser.getUrl()
        elem.waitForDisplayed()
        elem.waitForClickable()
        elem.click()
        browser.waitUntil(
            () => oldUrl != browser.getUrl(),
            {
                timeout: timeout,
                timeoutMsg: 'expected url to be different'
            }
        )
    }

    doSetValue(elem, value){
        elem.waitForDisplayed()
        elem.setValue(value)
    }

    doGetText(elem){
        elem.waitForDisplayed()
        return elem.getText()
    }

    doGetPageTitle(){
        return browser.getTitle()
    }

    doIsDisplayed(elem,timeout=10000){
        elem.waitForExist({ timeout: timeout })
        elem.waitForDisplayed()
        return elem.isDisplayed()
    }

    doIsExist(elem,timeout=10000){
        return elem.waitForExist({ timeout: timeout })
    }

    doClearValue(elem){
        elem.doubleClick()
        elem.keys(['Control', 'a'])
        elem.keys('Delete')
    }

    doDropDownSelect(elem, value) {
        elem.waitForDisplayed()
        elem.click()
        browser.pause(1000)
        let valueXpath = '//*[text()="'+value+'"]'
        $(valueXpath).click()
    }

    doDragAndDrop(elem, xMove =0, yMove =0 ){
        elem.dragAndDrop({ x: xMove, y: yMove })
    }

    doWaitUntilTextWillBe(elem, expectedText, timeout=40000){
        browser.waitUntil(
          () => elem.getText() == expectedText,
          {
              timeout: timeout,
              timeoutMsg: 'expected ' + expectedText
          }
        )
    }

    doWaitUntilTextWillBeDifferent(elem,timeout=45000){
        let currentText = elem.getText()
        browser.waitUntil(
          () => elem.getText() != currentText,
          {
              timeout: timeout,
              timeoutMsg: 'text was not changed, defaultText ' + currentText + " current text " + elem.getText()
          }
        )
    }
}

module.exports = new ElementUtil()