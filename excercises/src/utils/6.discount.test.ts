import { describe, it, expect } from "vitest";
import { calculateDiscount } from "./6.discount";

const round = (value: number) => Math.round(value * 100) / 100;

describe("calculateDiscount", () => {
  it("should return 0 for a price of 0", () => {
    expect(calculateDiscount(0)).toBe(0);
  });

  it("should return 0 for a negative price", () => {
    expect(calculateDiscount(-1000)).toBe(0);
  });

  it("should apply 10% discount for VIP customers", () => {
    expect(round(calculateDiscount(1000000, { customerClass: "VIP" }))).toBe(100000);
  });

  it("should apply 5% discount for PREMIUM customers", () => {
    expect(round(calculateDiscount(1000000, { customerClass: "PREMIUM" }))).toBe(50000);
  });

  it("should apply no discount for NORMAL customers", () => {
    expect(calculateDiscount(1000000, { customerClass: "NORMAL" })).toBe(0);
  });

  it("should apply 10% discount with WELCOME10 voucher", () => {
    expect(round(calculateDiscount(1000000, { discountVoucherCode: "WELCOME10" }))).toBe(100000);
  });

  it("should apply 30% discount with BLACKFRIDAY voucher", () => {
    expect(round(calculateDiscount(1000000, { discountVoucherCode: "BLACKFRIDAY" }))).toBe(300000);
  });

  it("should apply additional 5% discount for orders above 2 million with no voucher", () => {
    expect(round(calculateDiscount(3000000, {}))).toBe(150000);
  });

  it("should cap discount at total price", () => {
    expect(calculateDiscount(100000, { customerClass: "VIP", discountVoucherCode: "BLACKFRIDAY" })).toBe(40000);
  });
});
