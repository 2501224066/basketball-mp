var common = require('./request')

// 设置
export function setting(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/setting',
    data: data
  })
}

// 登陆
export function wxLogin(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/login',
    data: data
  })
}

// 卡列表
export function cardList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/card/list',
    data: data
  })
}

// 卡详情
export function cardDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/card/detail',
    data: data
  })
}

// 学员列表
export function userList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/list',
    data: data
  })
}

// 教员列表
export function teaList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/tea/list',
    data: data
  })
}

// 文章列表
export function articleList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/article/list',
    data: data
  })
}

// 文章详情
export function articleDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/article/detail',
    data: data
  })
}

// 视频列表
export function videoList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/video/list',
    data: data
  })
}

// 请假
export function setCourse(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/setCourse',
    data: data
  })
}

// 休课
export function levCourse(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/levCourse',
    data: data
  })
}

// 球队列表
export function teamList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/team/list',
    data: data
  })
}

// 球队详情
export function teamDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/team/detail',
    data: data
  })
}

// 报名
export function apply(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/apply',
    data: data
  })
}

// 体测开关
export function switchSport(data, repair = '') {
  return common.go({
    method: 'put',
    url: '/user/switchSport',
    data: data
  })
}

//  修改用户信息
export function editUserInfo(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user',
    data: data
  })
}

// 球队课时
export function getCause(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/card/getCause',
    data: data
  })
}

// 球队成员
export function getPlayers(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/team/getPlayers',
    data: data
  })
}

// 绑定学员
export function bindStudent(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/bindUser',
    data: data
  })
}

// 发送绑定验证码
export function smsBind(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/smsBind',
    data: data
  })
}

// 我的学习信息
export function studentInfo(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/userInfo',
    data: data
  })
}

// 首页
export function home(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/home',
    data: data
  })
}

// 学员详情
export function userDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/detail',
    data: data
  })
}

// 体测数据
export function userSport(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/getDetailSport',
    data: data
  })
}