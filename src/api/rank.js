import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getTopList() {
  const url = '/api/getTopList'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })

  axios.defaults.baseURL = 'http://localhost:8080'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    tpl: 3,
    page: 'detail',
    topid,
    type: 'top',
    song_begin: 0,
    song_num: 30,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

