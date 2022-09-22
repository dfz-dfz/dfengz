/**
 * 解决toFixed保留小数的问题
 * @param {number} money 
 * @param decimals 
 * @returns 
 */
const formatToFixed = (money: number, decimals = 2) => {
  return (
    Math.round(
      (parseFloat(JSON.stringify(money)) + Number.EPSILON) * Math.pow(10, decimals)
    ) / Math.pow(10, decimals)
  ).toFixed(decimals);
}

const Format = {
  /**
   * 格式化金额展示： 12341234.246 -> $ 12,341,234.25
   * @param {number} money 
   * @param symbol 
   * @param {number} decimals 
   * @returns 
   */
  formatMoney: (money: number, symbol = "", decimals: number = 2) =>
    formatToFixed(money, decimals)
      .replace(/\B(?=(\d{3})+\b)/g, ",")
      .replace(/^/, `${symbol}`),
};

export { Format };