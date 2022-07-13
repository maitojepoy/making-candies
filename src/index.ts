import { MakeCandies } from "./candies"

/* const params = {
  machines: 3,
  workers: 1,
  cost: 2,
  candies: 12
}
const params = {
  machines: 5184889632,
  workers: 5184889632,
  cost: 20,
  candies: 10000
}
*/

const params = {
  machines: 1,
  workers: 1,
  cost: 6,
  candies: 45
}

try {
  const candyMaker = new MakeCandies(params)
  console.log(candyMaker.calculate())
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
    process.exit()
  }
}
