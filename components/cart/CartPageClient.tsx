"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ConditionBadge } from "@/components/product/ConditionBadge";
import { ControllerButton } from "@/components/product/ControllerButton";
import { CoverBlock } from "@/components/product/CoverBlock";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { ProductCard } from "@/components/product/ProductCard";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils/format";
import type { CartItem, Game } from "@/types";

interface CartPageClientProps {
  products: Game[];
}

const freeShippingThreshold = 7500;
const taxRate = 0.09;

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
    </svg>
  );
}

function ControllerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="3" y="8" width="18" height="10" rx="4" />
      <path d="M8 13h.01M16 13h.01M10 11v4M8 13h4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function RetroControllerIcon() {
  return (
    <svg viewBox="0 0 220 130" className="mx-auto h-28 w-48 text-brand-red" aria-hidden="true">
      <rect x="18" y="36" width="184" height="72" rx="28" fill="currentColor" opacity="0.16" />
      <rect x="32" y="48" width="156" height="54" rx="20" fill="none" stroke="currentColor" strokeWidth="8" />
      <path d="M67 63v25M54 75h26" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <circle cx="146" cy="74" r="9" fill="currentColor" />
      <circle cx="168" cy="74" r="9" fill="currentColor" opacity="0.55" />
      <path d="M96 72h28" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function QuantityStepper({
  item,
  updateQuantity,
}: {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <div className="inline-grid h-10 grid-cols-[36px_44px_36px] overflow-hidden rounded-btn border border-white/12 bg-black/20">
      <button
        type="button"
        className="font-body text-lg font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:text-white/25"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        aria-label={`Decrease quantity for ${item.game.title}`}
      >
        -
      </button>
      <span className="grid place-items-center border-x border-white/12 font-body text-sm font-extrabold text-white">
        {item.quantity}
      </span>
      <button
        type="button"
        className="font-body text-lg font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:text-white/25"
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        disabled={item.quantity >= 10}
        aria-label={`Increase quantity for ${item.game.title}`}
      >
        +
      </button>
    </div>
  );
}

function CartItemRow({
  item,
  index,
  onRemove,
  onSave,
  updateQuantity,
}: {
  item: CartItem;
  index: number;
  onRemove: (item: CartItem) => void;
  onSave: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
}) {
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <article
      className={`grid gap-4 border-b border-white/10 p-4 md:grid-cols-[120px_1fr_auto] md:p-5 ${
        index % 2 === 0 ? "bg-[#1A1A1A]" : "bg-[#222]"
      }`}
    >
      <div className="relative w-[120px]">
        <CoverBlock
          platform={item.game.platform}
          systemCode={item.game.systemCode}
          title={item.game.title}
          imageUrl={item.game.images[0]}
          coverColor={item.game.coverColor}
          aspect="landscape"
          className="h-[90px]"
        />
        <span className="absolute left-2 top-2 rounded-[3px] bg-black/60 px-1.5 py-0.5 font-body text-[9px] font-extrabold uppercase tracking-[0.08em] text-white">
          {item.game.systemCode}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold leading-tight text-white">{item.game.title}</h2>
            <p className="mt-1 font-body text-[11px] font-bold uppercase tracking-[0.08em] text-white/45">
              {item.game.system}
            </p>
          </div>
          <div className="pointer-events-none" aria-hidden="true">
            <ControllerButton platform={item.game.platform} variant={1} onClick={() => undefined} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <ConditionBadge condition={item.game.condition} />
          <PriceDisplay price={item.unitPrice} />
          <span className="text-[12px] font-bold text-white/45">{formatPrice(item.unitPrice)} each</span>
        </div>

        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white/35">
          Tested & Guaranteed
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <QuantityStepper item={item} updateQuantity={updateQuantity} />
          <button
            type="button"
            className="font-body text-[12px] font-extrabold uppercase tracking-[0.06em] text-white/50 transition hover:text-brand-red"
            onClick={() => onRemove(item)}
          >
            ✕ Remove
          </button>
          <button
            type="button"
            className="font-body text-[12px] font-extrabold uppercase tracking-[0.06em] text-white/50 transition hover:text-brand-red"
            onClick={() => onSave(item)}
          >
            ♡ Save for Later
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 md:min-w-[112px] md:flex-col md:items-end">
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-white/35">
          Line Total
        </span>
        <span className="font-body text-xl font-extrabold text-brand-red">{formatPrice(lineTotal)}</span>
      </div>
    </article>
  );
}

function SavedItemRow({
  item,
  onRemove,
  onMoveToCart,
}: {
  item: CartItem;
  onRemove: (item: CartItem) => void;
  onMoveToCart: (item: CartItem) => void;
}) {
  return (
    <article className="grid gap-4 border-b border-white/10 bg-[#1A1A1A]/70 p-4 opacity-75 md:grid-cols-[96px_1fr_auto]">
      <div className="w-24">
        <CoverBlock
          platform={item.game.platform}
          systemCode={item.game.systemCode}
          title={item.game.title}
          imageUrl={item.game.images[0]}
          coverColor={item.game.coverColor}
          aspect="landscape"
          className="h-[72px]"
        />
      </div>
      <div>
        <h3 className="font-bold text-white">{item.game.title}</h3>
        <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.06em] text-white/45">
          {item.game.system}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <ConditionBadge condition={item.game.condition} />
          <PriceDisplay price={item.unitPrice} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-end md:justify-center">
        <button
          type="button"
          className="rounded-btn bg-brand-red px-4 py-2 font-body text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-brand-red-dark"
          onClick={() => onMoveToCart(item)}
        >
          Move to Cart
        </button>
        <button
          type="button"
          className="font-body text-[12px] font-extrabold uppercase tracking-[0.06em] text-white/45 transition hover:text-brand-red"
          onClick={() => onRemove(item)}
        >
          ✕ Remove
        </button>
      </div>
    </article>
  );
}

function FreeShippingProgressBar({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const unlocked = remaining === 0;

  return (
    <div className="rounded-card border border-white/10 bg-black/20 p-4">
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-status-success transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-center text-[12px] font-extrabold uppercase tracking-[0.05em] text-status-success">
        {unlocked
          ? "You've unlocked free shipping!"
          : `You're ${formatPrice(remaining)} away from free shipping!`}
      </p>
    </div>
  );
}

function TrustBadgeRow() {
  const items = [
    { label: "Authentic Games", icon: <ShieldIcon /> },
    { label: "Tested Before Shipping", icon: <ControllerIcon /> },
    { label: "1-Year Warranty", icon: <CheckIcon /> },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-card bg-white/5 px-2 py-3 text-center text-white/55">
          <span className="mx-auto flex justify-center text-brand-red">{item.icon}</span>
          <span className="mt-2 block text-[10px] font-bold uppercase leading-tight tracking-[0.05em]">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function OrderSummary({ subtotal }: { subtotal: number }) {
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 599;
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + shipping + tax;

  return (
    <aside className="sticky top-24 rounded-card border border-white/10 bg-[#1A1A1A] p-5 shadow-card">
      <h2 className="font-display text-4xl uppercase leading-none text-white">Order Summary</h2>
      <div className="mt-5">
        <FreeShippingProgressBar subtotal={subtotal} />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between text-white/65">
          <span>Subtotal</span>
          <span className="font-bold text-white">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-white/65">
          <span>Shipping</span>
          <span className="font-extrabold text-status-success">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-white/65">
          <span>Estimated tax</span>
          <span className="font-bold text-white">{formatPrice(tax)}</span>
        </div>
      </div>

      <div className="my-5 border-t border-white/10" />

      <div className="flex items-end justify-between gap-4">
        <span className="font-body text-[13px] font-extrabold uppercase tracking-[0.08em] text-white">
          Order Total
        </span>
        <span className="font-display text-4xl uppercase leading-none text-brand-red">
          {formatPrice(total)}
        </span>
      </div>

      <div className="mt-5">
        <TrustBadgeRow />
      </div>

      <Link
        href="/checkout"
        className="mt-5 flex h-[52px] w-full items-center justify-center rounded-btn bg-brand-red px-5 font-body text-[13px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-brand-red-dark"
      >
        Proceed to Checkout &gt;
      </Link>

      <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/35">
        {["VISA", "MC", "AMEX", "PayPal", "Pay"].map((label) => (
          <span key={label} className="rounded border border-white/10 px-2 py-1">
            {label}
          </span>
        ))}
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[12px] text-white/40">
        <LockIcon />
        Secure checkout - 256-bit SSL encryption
      </p>
    </aside>
  );
}

function EmptyCartState({ products }: { products: Game[] }) {
  const bestSellers = products
    .slice()
    .sort((a, b) => (b.salesCount ?? b.reviewCount) - (a.salesCount ?? a.reviewCount))
    .slice(0, 4);

  return (
    <div className="rounded-card border border-white/10 bg-[#1A1A1A] p-8 text-center shadow-card">
      <RetroControllerIcon />
      <h1 className="mt-5 font-display text-5xl uppercase leading-none text-white">Your Cart Is Empty</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
        Looks like you have not added any games yet.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex h-[50px] items-center justify-center rounded-btn bg-brand-red px-8 font-body text-[13px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-brand-red-dark"
      >
        Browse Games
      </Link>

      <div className="mt-10 text-left">
        <h2 className="font-display text-3xl uppercase leading-none text-white">Best Sellers</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} game={product} ctaVariant={2} showSaving />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CartPageClient({ products }: CartPageClientProps) {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const itemCount = useCartStore((state) => state.itemCount);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const saveForLater = useCartStore((state) => state.saveForLater);
  const moveToCart = useCartStore((state) => state.moveToCart);
  const [toast, setToast] = useState<string | null>(null);

  const activeItems = items.filter((item) => !item.savedForLater);
  const savedItems = items.filter((item) => item.savedForLater);

  const collectionRecommendations = useMemo(() => {
    const activeProductIds = new Set(activeItems.map((item) => item.game.id));
    const activeTags = new Set(activeItems.flatMap((item) => item.game.tags));
    const activeVendors = new Set(activeItems.map((item) => item.game.vendor));

    return products
      .filter((product) => !activeProductIds.has(product.id))
      .filter((product) => {
        if (!activeItems.length) return true;
        return product.tags.some((tag) => activeTags.has(tag)) || activeVendors.has(product.vendor);
      })
      .slice(0, 4);
  }, [activeItems, products]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleRemove = (item: CartItem) => {
    removeItem(item.id);
    showToast(`Removed ${item.game.title}`);
  };

  const handleSave = (item: CartItem) => {
    saveForLater(item.id);
    showToast(`Saved ${item.game.title} for later`);
  };

  const handleMoveToCart = (item: CartItem) => {
    moveToCart(item.id);
    showToast(`Moved ${item.game.title} to cart`);
  };

  const empty = activeItems.length === 0 && savedItems.length === 0;

  return (
    <main className="bg-bg-dark px-7 py-8 text-white md:py-12">
      {toast ? (
        <div className="fixed right-5 top-5 z-50 rounded-card border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm font-bold text-white shadow-card">
          {toast}
        </div>
      ) : null}

      <div className="mx-auto max-w-[1240px]">
        {empty ? (
          <EmptyCartState products={products} />
        ) : (
          <div className="grid gap-7 lg:grid-cols-[minmax(0,65fr)_minmax(320px,35fr)]">
            <section className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-5xl uppercase leading-none text-white">
                  Your Cart ({itemCount} Items)
                </h1>
                <Link
                  href="/products"
                  className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/55 transition hover:text-brand-red"
                >
                  ← Continue Shopping
                </Link>
              </div>

              <div className="overflow-hidden rounded-card border border-white/10 shadow-card">
                {activeItems.map((item, index) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    index={index}
                    onRemove={handleRemove}
                    onSave={handleSave}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-4 rounded-card border border-white/10 bg-[#1A1A1A] p-4 md:flex-row md:items-center md:justify-between">
                <Link
                  href="/products"
                  className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/55 transition hover:text-brand-red"
                >
                  ← Continue Shopping
                </Link>
                <form className="flex min-w-0 max-w-md flex-1 md:justify-end">
                  <input
                    type="text"
                    name="promo"
                    placeholder="Promo code"
                    className="h-11 min-w-0 flex-1 rounded-l-btn border border-white/10 bg-black/25 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand-red"
                  />
                  <button
                    type="submit"
                    className="h-11 rounded-r-btn bg-brand-red px-5 font-body text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-brand-red-dark"
                  >
                    Apply
                  </button>
                </form>
              </div>

              {savedItems.length ? (
                <section className="mt-8">
                  <h2 className="mb-4 font-display text-4xl uppercase leading-none text-white">
                    Saved For Later ({savedItems.length})
                  </h2>
                  <div className="overflow-hidden rounded-card border border-white/10 shadow-card">
                    {savedItems.map((item) => (
                      <SavedItemRow
                        key={item.id}
                        item={item}
                        onRemove={handleRemove}
                        onMoveToCart={handleMoveToCart}
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="mt-9">
                <h2 className="font-display text-4xl uppercase leading-none text-white">
                  Complete Your Collection
                </h2>
                <div className="mt-4 flex gap-4 overflow-x-auto pb-3">
                  {collectionRecommendations.map((product) => (
                    <div key={product.id} className="w-[260px] shrink-0">
                      <ProductCard game={product} ctaVariant={2} showSaving />
                    </div>
                  ))}
                </div>
              </section>
            </section>

            <OrderSummary subtotal={subtotal} />
          </div>
        )}
      </div>
    </main>
  );
}
