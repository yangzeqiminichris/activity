export const getDate = () => {
  // 获取当前日期
  var date = new Date()

  // 获取当前月份
  var nowMonth = date.getMonth() + 1

  // 获取当前是几号
  var strDate = date.getDate()

  // 添加分隔符“-”
  var seperator = '/'

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = '0' + nowMonth
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate
  return nowDate
}

export const getLastTime = date => {
  const now = new Date().getTime()
  const diff_time = (date - now) / 1000
  var h = Math.floor(diff_time / 3600)
  var m = Math.floor((diff_time / 60) % 60)
  var s = Math.floor(diff_time % 60)
  return {
    h,
    m,
    s
  }
}
