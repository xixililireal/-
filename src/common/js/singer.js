// 封装了 歌手相关的信息 达到重复使用的目的
export default class Singer {
  constructor({id,name}) {
    this.id = id;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}