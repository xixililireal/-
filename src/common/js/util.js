// 棋牌函数 打乱数组里的正常排序  随机播放
import {mapMutations} from 'vuex'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for(let index=0;index<_arr.length;index++) {
    let j = getRandomInt(0,index)
    let t = _arr[index]
    _arr[index] = _arr[j]
    _arr[j] = t
  }
  
  return _arr
}

/**
 *  节流函数  返回一个函数 
 * @param {*} func  函数
 * @param {*} delay 推迟时间
 */
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}