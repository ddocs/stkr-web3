const supertest = require('supertest')


class RequestUtil {
  async doSendGetRequest(endpoint, count=1, pause =0){
    let currentCount =0
    let res
    while(currentCount < count){
      browser.pause(pause)
      try{
        res = await supertest.agent(endpoint).get('/').auth('username', 'password')
      }catch (err){
        res = await supertest.agent(endpoint).get('/').auth('username', 'password')
      }
      currentCount++
    }
    // console.log('count = ' + currentCount)
    return res
  }

  doCheckResponseStatusCode(res, code){
    expect(code).to.be.equal(res.statusCode)
    expect(code).to.be.equal(res.status)
  }

}

module.exports = new RequestUtil()

