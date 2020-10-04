// axios
import axios from 'axios'

const baseURL = 'http://monitor.stkr-dev.ankr.com:5555'

export default axios.create({
  baseURL
})
