// should return 0 when cart is empty
// should return total price when cart is not empty
// should ignore products with quantity 0
// should return correct floating-point total
// should return total price when cart has multiple products

import { calculateTotalPrice } from "./1.cart";

describe("calculateTotalPrice", () => {
    it("should return 0 when cart is empty", () => {
        const result = calculateTotalPrice([]);
        expect(result).toBe(0);
    });

    it("should return total price when cart is not empty", () => {
        const result = calculateTotalPrice([{ product_id: 1, price: 10, quantity: 2 }]);
        expect(result).toBe(20);
    })

    it("should ignore products with quantity 0", () => {
        const result = calculateTotalPrice([{ product_id: 1, price: 10, quantity: 0 }]);
        expect(result).toBe(0);
    })

    it("should return correct floating-point total", () => {
        const result = calculateTotalPrice([{ product_id: 1, price: 10.5, quantity: 2 }]);
        expect(result).toBe(21);
    })

    it("should return total price when cart has multiple products", () => {
        const result = calculateTotalPrice([
            { product_id: 1, price: 10, quantity: 2 },
            { product_id: 2, price: 20, quantity: 3 },
            { product_id: 3, price: 30, quantity: 1 },
            { product_id: 4, price: 40, quantity: 1 },
        ]);
        expect(result).toBe(150);
    })

    it("should calculate total price correctly when quantity is negative", () => {
        const result = calculateTotalPrice([{ product_id: 1, price: 10, quantity: -2 }]);
        expect(result).toBe(-20);
    })
});