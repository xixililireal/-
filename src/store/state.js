import { playMode } from 'common/js/config';
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false, // 是否播放
  fullScreen: false, // 是否全屏
  playlist: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式 - 单曲 循环 随机 
  currentIndex: -1,
  disc: {}, // 推荐页的歌单列表
  topList: {}, // 排行榜的歌单列表
  searchHistory: loadSearch(), // 搜索历史列表 
  playHistory: loadPlay(), // 最近播放
  favoriteList: loadFavorite() // 收藏

}
export default state