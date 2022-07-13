export type ParamStruct = {
  machines: number
  workers: number
  cost: number
  candies: number
}

export enum ResourceType {
  Machine = 'machines',
  Worker = 'workers',
}
