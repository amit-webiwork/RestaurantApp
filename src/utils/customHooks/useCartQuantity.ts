import { useState, useCallback } from 'react';

export function useCartQuantity(initialQuantity: number) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const increment = useCallback(() => setQuantity((prev) => prev + 1), []);
    const decrement = useCallback(() => setQuantity((prev) => Math.max(1, prev - 1)), []);

    return { quantity, setQuantity, increment, decrement };
}