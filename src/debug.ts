export const printDebug = (...stmt: any[]): void => {
  if (process.env.DEBUG) {
    console.log(...stmt)
  }
}
