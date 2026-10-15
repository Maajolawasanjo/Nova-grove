"use client";
import { Leaf, Menu, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/components/cart-context";

export function SiteHeader({ dark = false, overlay = false }: { dark?: boolean; overlay?: boolean }) {
  const { lines, count, total, remove } = useCart();
  return <>{!overlay && <div className="nav-spacer" aria-hidden="true"/>}<header className={`site-header ${dark ? "site-header-dark" : ""} ${overlay ? "site-header-overlay" : ""}`}>
    <div className="shell site-header-inner">
      <a href="/" className="brand" aria-label="Nova Grove home"><span className="brand-mark"><Leaf /></span><span>NOVA<br/>GROVE</span></a>
      <nav aria-label="Primary"><a href="/shop">Shop</a><a href="/membership">Membership</a><a href="/story">Our story</a><a href="/journal">Journal</a><a href="/contact">Contact</a></nav>
      <div className="header-actions">
        <Sheet><SheetTrigger className="mobile-menu" aria-label="Open navigation"><Menu/></SheetTrigger><SheetContent side="left" className="nav-sheet"><SheetHeader><SheetTitle>Explore Nova Grove</SheetTitle></SheetHeader><nav><a href="/shop">Shop</a><a href="/membership">Membership</a><a href="/story">Our story</a><a href="/journal">Journal</a><a href="/contact">Contact</a></nav></SheetContent></Sheet>
        <Sheet><SheetTrigger className="header-bag" aria-label={`Open basket with ${count} items`}><ShoppingBag/><span>Bag</span><b>{count}</b></SheetTrigger><SheetContent className="cart-sheet"><SheetHeader><SheetTitle className="cart-title">Your selection</SheetTitle><SheetDescription>Small-batch botanical provisions, prepared with care.</SheetDescription></SheetHeader><div className="cart-lines">{lines.length === 0 ? <div className="empty-cart"><Leaf/><p>Your basket is waiting.</p><span>Choose a botanical blend to begin.</span><a href="/shop">Browse the collection</a></div> : lines.map((line) => <div className="cart-line" key={line.id}><div className={`mini-jar ${line.tone}`}>{line.glyph}</div><div><strong>{line.name}</strong><span>Qty {line.quantity}</span></div><b>₦{(line.price * line.quantity).toLocaleString()}</b><button onClick={() => remove(line.id)} aria-label={`Remove ${line.name}`}><Trash2/></button></div>)}</div><div className="cart-total"><span>Total</span><strong>₦{total.toLocaleString()}</strong></div><button className="checkout" disabled={!lines.length}>Continue to delivery</button></SheetContent></Sheet>
      </div>
    </div>
  </header></>;
}
