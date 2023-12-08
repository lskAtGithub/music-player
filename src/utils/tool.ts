/**
 * 将传入的毫秒转换成分秒的形式返回
 */
export function formatTimestamp(timestamp: number): string {
  function _fill(val: number): string {
    return val < 10 ? `0${val}` : `${val}`
  }
  let seconds = Math.floor(timestamp / 1000) % 60 % 60
  let minutes = Math.floor(timestamp / 1000 / 60) % 60
  return `${_fill(minutes)}:${_fill(seconds)}`
}
