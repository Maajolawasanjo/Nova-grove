"use client";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-context";
export function ProductPurchase({ product }: { product: { id: string; name: string; price: number; tone: string; glyph: string } }) {
  const [quantity, setQuantity] = useState(1); const [added, setAdded] = useState(false); const { add } = useCart();
  return <><div className="detail-buy"><strong>₦{product.price.toLocaleString()}</strong><div className="static-quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus/></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus/></button></div><Button onClick={() => { add(product, quantity); setAdded(true); }}>{added ? <><Check/> Added</> : <>Add to bag <ShoppingBag/></>}</Button></div><p className="delivery"><Check/> Complimentary Lagos delivery over ₦35,000</p></>;
}
