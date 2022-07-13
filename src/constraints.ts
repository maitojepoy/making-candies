import { ParamStruct } from "./models"

const inRange = (value: number, min: number, max: number) => value >= min && value <= max

const validateRange = (min: number, max: number) => (key: string, field: any) => inRange(field[key], min, max)

export const validateParamConstraints = (p: ParamStruct) => {
  const constraints = [
    { key: 'machines', validator: validateRange(1, Math.pow(10, 12)), errorMsg: 'Requirement failed on machines: must be within 1 to 10^12' },
    { key: 'workers', validator: validateRange(1, Math.pow(10, 12)), errorMsg: 'Requirement failed on workers: must be within 1 to 10^12' },
    { key: 'cost', validator: validateRange(1, Math.pow(10, 12)), errorMsg: 'Requirement failed on cost: must be within 1 to 10^12' },
    { key: 'candies', validator: validateRange(1, Math.pow(10, 12)), errorMsg: 'Requirement failed on candies: must be within 1 to 10^12' },
  ]
  
  for (const constraint of constraints) {
    if (!constraint.validator(constraint.key, p)) {
      throw new Error(constraint.errorMsg)
    }
  }
}