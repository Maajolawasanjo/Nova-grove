"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartProduct = { id: string; name: string; price: number; tone: string; glyph: string };
type CartLine = CartProduct & { quantity: number };
type CartValue = { lines: CartLine[]; count: number; total: number; add: (product: CartProduct, quantity?: number) => void; remove: (id: string) => void };
const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { const stored = window.localStorage.getItem("nova-grove-cart"); if (stored) { try { setLines(JSON.parse(stored)); } catch {} } setReady(true); }, []);
  useEffect(() => { if (ready) window.localStorage.setItem("nova-grove-cart", JSON.stringify(lines)); }, [lines, ready]);
  const value = useMemo<CartValue>(() => ({
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    add: (product, quantity = 1) => setLines((current) => { const found = current.find((line) => line.id === product.id); return found ? current.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + quantity } : line) : [...current, { ...product, quantity }]; }),
    remove: (id) => setLines((current) => current.filter((line) => line.id !== id)),
  }), [lines]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("useCart must be used inside CartProvider"); return value; }
