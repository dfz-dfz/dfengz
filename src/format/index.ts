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

/**
 * 将给定的日期和时间格式化为基于提供的格式的字符串。
 * 
 * 使用示例
 * const date = new Date();
 * const formattedDateTime = formatDateTime(date, "yyyy-MM-dd HH:mm:ss");
 * console.log(formattedDateTime); // 2024-05-07 14:10:00
 *
 * @param {Date} date - 要格式化的日期和时间。
 * @param {string} format - 指定日期和时间应该如何格式化的格式字符串。
 * @return {string} 格式化后的日期和时间字符串。
 */
const formatDateTime = (date: Date, format: string): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = format
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);

  return formattedDateTime;
}

export { Format, formatDateTime };