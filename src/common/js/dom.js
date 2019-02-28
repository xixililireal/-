// dom操作的相关代码 封装对dom的操作
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function addClass(el,className){
  // 判断是否有className存在，有则直接退出，不在添加。
  if(hasClass(el,className)){
    return;
  }
  // 没有就添加className。
  let newClass=el.className.split(' ');
  newClass.push(className);
  el.className=newClass.join(' ');
}
// 获取数据
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }else {
    return el.getAttribute(prefix + name)
  }
}

// 根据不同的情况 添加前缀
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}