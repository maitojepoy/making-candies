import { ParamStruct, ResourceType } from './models'
import { validateParamConstraints } from "./constraints"
import { printDebug } from './debug'

export class MakeCandies {
  private readonly params
  private mwGoal: number[]

  constructor(params: ParamStruct) {
    this.params = params
    validateParamConstraints(this.params)
    this.mwGoal = this.calculateFactors()
  }

  private calculateFactors(): number[] {
    const { candies } = this.params
    const primeFactors = []
    for (let i = 1; i <= candies; i++) {
      if (candies % i == 0) {
        primeFactors.push(i)
      }
    }
    if (primeFactors.length % 2 == 0) {
      const val = primeFactors.length/2 - 1;
      return [primeFactors[val], primeFactors[val + 1]]
    }
    const val = Math.floor(primeFactors.length/2);
    return [primeFactors[val], primeFactors[val]]
  }

  public calculate() {
    const { candies } = this.params
    let { machines: m, workers: w, cost: p } = this.params
    let n = 0
    let cycle = 0
    while (n < candies) {
      cycle++
      n += m * w
      printDebug('\n--------------------------------------\n\ncycle', cycle, 'candies =', n, ', machines =', m, ', workers =', w)
      let budgetQty = Math.floor(n / p)
      if (n < candies && budgetQty > 0) { // invest
        printDebug('!!looking for investment. qty to buy', budgetQty, ', cost =', budgetQty * p)

        const firstBuy = m < w ? ResourceType.Machine : ResourceType.Worker
        printDebug('first to buy', firstBuy)

        const priorityInvest = [firstBuy, firstBuy === ResourceType.Machine ? ResourceType.Worker : ResourceType.Machine ]

        let priorityNum = 0
        for (const investment of priorityInvest) {
          if (budgetQty > 0) {
            const isMachineToBuy = investment === ResourceType.Machine
            const qtyToBuy = this.calculateQtyToInvest(investment, budgetQty, isMachineToBuy ? m : w, priorityNum)

            if (isMachineToBuy) {
              m += qtyToBuy
              printDebug('machine now has', m)
            } else {
              w += qtyToBuy
              printDebug('workers now has', w)
            }
            n -= qtyToBuy * p
            budgetQty -= qtyToBuy
            printDebug('purchased with', qtyToBuy, 'candies, candies are now', n, ', budget is now at', budgetQty)
          }
          priorityNum++
        }
      }
    }
    return cycle
  }

  private calculateQtyToInvest(resourcetype: ResourceType, budgetQty: number, currResource: number, priorityNum: number) {
    const goalToBuy = resourcetype === ResourceType.Machine ? this.mwGoal[0] : this.mwGoal[1]
    printDebug('looking at', resourcetype, ', current resource', currResource, ', goal to buy', goalToBuy)
    if (currResource < goalToBuy && budgetQty > 0) {
      const buyLimit = goalToBuy - currResource
      const divideBuy = priorityNum === 0 && budgetQty > 1 ? budgetQty / 2 : 0
      if (divideBuy > 0) {
        return divideBuy
      }
      return (budgetQty <= buyLimit) ? budgetQty : buyLimit
    }
    return 0
  }
}
