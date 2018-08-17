import {
  calcFinalPrice,
  calcPurchase,
  calcMargin,
  calcTax,
  calcNet
} from "./utils";

describe("calcFinalPrice", () => {
  it("should calculate based on valid pruchase price, margin and tax", () => {
    const actual = calcFinalPrice({
      purchase: "200",
      margin: "2",
      tax: "0.16"
    });
    const expected = 464;
    expect(actual).toBe(expected);
  });

  it("should calculate just from purchase price and margin", () => {
    const actual = calcFinalPrice({
      purchase: "200",
      margin: "2"
    });
    const expected = 400;
    expect(actual).toBe(expected);
  });

  it("should calculate just from purchase price and tax", () => {
    const actual = calcFinalPrice({
      purchase: "200",
      tax: "0.16"
    });
    const expected = 232;
    expect(actual).toBe(expected);
  });

  it("should calculate just from purchase", () => {
    const actual = calcFinalPrice({
      purchase: "200"
    });
    const expected = 200;
    expect(actual).toBe(expected);
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcTax({});
    const expected = "";
    expect(actual).toBe(expected);
  });
});

describe("calcPurchase", () => {
  it("should calculate based on valid final price, margin and tax", () => {
    const actual = calcPurchase({
      final: "200",
      margin: "2",
      tax: "0.16"
    });
    const expected = 84;
    expect(actual).toBe(expected);
  });

  it("should calculate based on valid final price and tax", () => {
    const actual = calcPurchase({
      final: "200",
      tax: "0.16"
    });
    const expected = 168;
    expect(actual).toBe(expected);
  });

  it("should calculate based on valid final price and margin", () => {
    const actual = calcPurchase({
      final: "200",
      margin: "2"
    });
    const expected = 100;
    expect(actual).toBe(expected);
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcTax({});
    const expected = "";
    expect(actual).toBe(expected);
  });
});

describe("calcMargin", () => {
  it("should calculate based on valid final price, purchase price and tax", () => {
    const actual = calcMargin({
      purchase: "84",
      final: "200",
      tax: "0.16"
    });
    const expected = 2;
    expect(actual).toBe(expected);
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcTax({});
    const expected = "";
    expect(actual).toBe(expected);
  });
});

describe("calcTax", () => {
  it("should calculate based on valid final price, purchase price and margin", () => {
    const actual = calcTax({
      purchase: "100",
      final: "232",
      margin: "2"
    });
    const expected = 0.16;
    expect(actual).toBe(expected);
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcTax({});
    const expected = "";
    expect(actual).toBe(expected);
  });
});

describe("calcNet", () => {
  it("should calculate based on valid purchase price and margin", () => {
    const actual = calcNet({
      purchase: "30",
      margin: "1.5"
    });
    const expected = 45;
    expect(actual).toBe(expected);
  });

  it("should return empty string when invalid values provided", () => {
    const actual = calcNet({});
    const expected = "";
    expect(actual).toBe(expected);
  });
});
