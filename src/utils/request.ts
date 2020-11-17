import axios from 'axios'

// create an axios instance
const service = axios.create({
  timeout: 120000 // request timeout
})

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // if the custom code is not 20000, it is judged as an error.

    if (response.status === 200) {
      if (
        // eslint-disable-next-line operator-linebreak
        response.request.responseURL.includes(window.location.host) ||
        response.request.responseURL.includes(
          process.env.STATUS_CONNECT_BACKEND_URL
        )
      ) {
        if (!response.data.code) return response.data
        if (response.data.code === 20000) return response.data.data
        throw new Error(response.data.msg)
      } else {
        return response.data
      }
    } else {
      return Promise.reject(new Error(response.data.msg || 'Error'))
    }
  },
  error => Promise.reject(error)
)

export default service
