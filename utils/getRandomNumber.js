const getRandomIndex = number => {
  const randomIndex = Math.floor(Math.random() * number)
  if (randomIndex === number) return randomIndex - 1
  return randomIndex
}

const getRandomNumber = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min) + min)
  return randomNumber
}

module.exports = { getRandomIndex, getRandomNumber }
