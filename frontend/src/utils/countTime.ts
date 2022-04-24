const CountTime = (t: number) => {
  // 124 - 2h
  // 150 - 2.5h
  const time = t / 60
  const reg = /[0-9].0/
  const formattedTime = time.toFixed(time.toFixed(1).match(reg) ? 0 : 1)
  return `${formattedTime}h`
}

export default CountTime
