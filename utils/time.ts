export function secToMin(sec: number):number {
  return Math.floor(sec / 60)
}

export function formatSecs(sec: number) {
  const _min = Math.floor(sec / 60); // how many minutes - flat number
  const _sec = sec % 60 // how many left over seconds

  const sentence = [];

  if (_min > 0) {
    sentence.push(_min)
  }
  if (_sec > 0) {
    sentence.push(_sec)
  }

  sentence.push('Minutes ⏱️')

  return sentence.join(" ")
}
