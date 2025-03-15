// todo: 判断登录时间
export const getTime = () => {
  let message = ''
  const hours = new Date().getHours()

  if (hours <= 9) {
    message = '早上好 (*￣3￣)╭'
  } else if (hours <= 12) {
    message = '上午好 ヾ(•ω•`)o'
  } else if (hours <= 18) {
    message = '下午好 （づ￣3￣）づ╭❤️～'
  } else {
    message = '晚上好 (∪.∪ )...zzz'
  }

  return message
}
