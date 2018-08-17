import { curry, flow, divide, multiply } from "lodash/fp";
// import R from "ramda";

const calcFinalFromTax = curry((tax, value) => value + multiply(value, tax));
const calcFromFinalTax = curry((tax, final) => final - multiply(final, tax));

/**
 * @param {Object} obj
 * @param {string} obj.margin
 * @param {string} obj.tax
 * @param {string} obj.final
 * @returns {(string|number)}
 */
export const calcPurchase = ({ purchase, margin = "1", tax = "0", final }) => {
  console.log("margin", margin);
  console.log("purchase", purchase);
  console.log("final", final);
  return !purchase && Boolean(margin) && Boolean(final)
    ? flow(
        calcFromFinalTax(tax),
        x => divide(x, margin)
      )(final)
    : purchase || "";
};

/**
 * @param {Object} obj
 * @param {string} obj.purchase
 * @param {string} obj.tax
 * @param {string} obj.final
 * @returns {(string|number)}
 */
export const calcMargin = ({ purchase = "0", tax = "0", final = "0" }) =>
  Boolean(final) && Boolean(purchase)
    ? flow(
        calcFromFinalTax(tax),
        x => divide(x, purchase)
      )(final)
    : "";

/**
 * @param {Object} obj
 * @param {string} obj.purchase
 * @param {string} obj.margin
 * @returns {(string|number)}
 */
export const calcNet = ({ purchase, margin = "1" }) => {
  // console.log("purchase", purchase);
  return purchase ? multiply(purchase, Boolean(margin) ? margin : 1) : "";
};

/**
 * @param {Object} obj
 * @param {string} obj.purchase
 * @param {string} obj.margin
 * @param {string} obj.final
 * @returns {(string|number)}
 */
export const calcTax = ({ purchase = "0", margin = "1", final = "0" }) => {
  const net = multiply(purchase, margin);
  return final && purchase
    ? flow(
        x => final - x,
        x => (Boolean(x) ? divide(x, net) : x)
      )(net)
    : "";
};

/**
 * @param {Object} obj
 * @param {string} obj.purchase
 * @param {string} obj.tax
 * @param {string} obj.final
 * @returns {(string|number)}
 */
export const calcFinalPrice = ({ purchase, margin = 1, tax = "0" }) => {
  console.log("calcFinalPrice margin", margin);
  console.log("calcFinalPrice tax", tax);
  return purchase
    ? flow(
        multiply(margin),
        calcFinalFromTax(tax)
      )(purchase)
    : "";
};
