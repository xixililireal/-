var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

// var apiRoutes = express.Router()

// apiRoutes.get('/getDiscList', function (req, res) {
//   var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

//   axios.get(url,{
//     headers:{
//       referer: 'https://c.y.qq.com/',
//       host: 'c.y.qq.com'
//     },
//     params: req.query
//   }).then((response)=>{
//     res.json(response.data)
//   }).catch((e) => {
//     console.log(e)
//   })

// })

// apiRoutes.get('/api/getHotKey', function (req, res) {
//   const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
//   axios.get(url, {
//     headers: {
//       referer: 'https://m.y.qq.com/',
//       origin: 'https://m.y.qq.com/'
//     },
//     params: req.query
//   }).then((response) => {
//     res.json(response.data) // axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)
//   }).catch((e) => {
//     console.log(e)
//   })
// });

// apiRoutes.get('/getplaysongvkey', function (req, res) {
//   var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
//   axios.get(url, {
//     headers: {
//       referer: 'https://u.y.qq.com/',
//       host: 'u.y.qq.com'
//     },
//     params: req.query
//   }).then((response) => {
//     res.json(response.data)
//   }).catch((e)=>{
//     console.log(e)
//   })
// })

// app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})