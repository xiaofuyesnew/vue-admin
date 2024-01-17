import dayjs from 'dayjs'

export function log(msg) {
  return console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${msg}`)
}
