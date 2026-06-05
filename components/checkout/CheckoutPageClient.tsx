"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { CheckoutStepIndicator } from "@/components/checkout/CheckoutStepIndicator";
import { ConditionBadge } from "@/components/product/ConditionBadge";
import { CoverBlock } from "@/components/product/CoverBlock";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils/format";
import type { CartItem } from "@/types";

type CheckoutStep = 1 | 2 | 3;
type DeliveryMethod = "standard" | "expedited";
type BillingMode = "same" | "different";

const statesAndProvinces = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL",
  "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND",
  "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
  "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY", "AB", "BC", "MB", "NB", "NL", "NS",
  "NT", "NU", "ON", "PE", "QC", "SK", "YT",
];

const shippingSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  marketing: z.boolean(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z
    .string()
    .min(1, "ZIP/postal code is required")
    .regex(/^(\d{5}|[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d)$/, "Enter a valid ZIP or postal code"),
  country: z.literal("United States"),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9()+\-\s.]+$/.test(value), "Use numbers only"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
  saveCard: boolean;
}

const shippingResolver: Resolver<ShippingFormData> = async (values) => {
  const result = shippingSchema.safeParse(values);

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  return {
    values: {},
    errors: result.error.issues.reduce<Record<string, { type: string; message: string }>>((errors, issue) => {
      const key = issue.path[0];
      if (typeof key === "string") {
        errors[key] = {
          type: "validation",
          message: issue.message,
        };
      }
      return errors;
    }, {}),
  };
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-[12px] font-bold text-brand-red">{message}</p> : null;
}

function TextField({
  label,
  error,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-body text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/45">
        {label}
      </span>
      <input
        {...props}
        className={`h-11 w-full rounded-btn border bg-[#1A1A1A] px-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-brand-red focus:ring-2 focus:ring-brand-red/25 ${
          error ? "border-brand-red" : "border-border"
        } ${className}`}
      />
      <FieldError message={error} />
    </label>
  );
}

function SelectField({
  label,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block font-body text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/45">
        {label}
      </span>
      <select
        {...props}
        className={`h-11 w-full rounded-btn border bg-[#1A1A1A] px-3 text-sm text-white outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/25 ${
          error ? "border-brand-red" : "border-border"
        }`}
      >
        {children}
      </select>
      <FieldError message={error} />
    </label>
  );
}

function TruckIcon({ fast = false }: { fast?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M14 18V6a2 2 0 0 0-2-2H3v14h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2v-6h-4l-3-4v10h1" />
      {fast ? <path d="M2 9h5M2 13h4" /> : null}
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function DeliveryMethodSelector({
  subtotal,
  selected,
  onSelect,
}: {
  subtotal: number;
  selected: DeliveryMethod;
  onSelect: (method: DeliveryMethod) => void;
}) {
  const methods = [
    {
      id: "standard" as const,
      icon: <TruckIcon />,
      label: "Standard Shipping",
      eta: "3-7 business days",
      price: subtotal >= 7500 ? 0 : 499,
    },
    {
      id: "expedited" as const,
      icon: <TruckIcon fast />,
      label: "Expedited Shipping",
      eta: "1-3 business days",
      price: 999,
    },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {methods.map((method) => {
        const active = selected === method.id;
        return (
          <button
            key={method.id}
            type="button"
            className={`rounded-card border p-4 text-left transition ${
              active ? "border-brand-red bg-brand-red/10" : "border-border bg-[#1A1A1A] hover:border-brand-red/60"
            }`}
            onClick={() => onSelect(method.id)}
          >
            <span className="flex items-start gap-3">
              <span className="mt-0.5 text-brand-red">{method.icon}</span>
              <span className="flex-1">
                <span className="block font-bold text-white">{method.label}</span>
                <span className="mt-1 block text-sm text-white/45">{method.eta}</span>
              </span>
              <span
                className={`mt-1 grid h-5 w-5 place-items-center rounded-full border ${
                  active ? "border-brand-red bg-brand-red" : "border-white/25"
                }`}
                aria-hidden="true"
              >
                {active ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
            </span>
            <span className="mt-4 block font-body text-sm font-extrabold uppercase tracking-[0.06em] text-status-success">
              {method.price === 0 ? "FREE" : formatPrice(method.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 font-display text-3xl uppercase leading-none text-white">
      {children}
    </h2>
  );
}

function cardBrand(cardNumber: string) {
  const clean = cardNumber.replace(/\D/g, "");
  if (clean.startsWith("4")) return "Visa";
  if (clean.startsWith("5")) return "Mastercard";
  if (clean.startsWith("3")) return "Amex";
  return "Card";
}

function compactAddress(data?: ShippingFormData) {
  if (!data) return "";
  return `${data.address1}, ${data.city}, ${data.state} ${data.zip}`;
}

function CheckoutSummary({
  step,
  items,
  subtotal,
  shipping,
  tax,
  total,
  expanded,
  onToggle,
}: {
  step: CheckoutStep;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const panel = (
    <aside className="rounded-card border border-border bg-[#1A1A1A] p-5 shadow-card lg:sticky lg:top-6">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-display text-4xl uppercase leading-none text-white">Order Summary</h2>
        {step === 1 ? (
          <Link href="/cart" className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-brand-red">
            Edit Cart
          </Link>
        ) : null}
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[60px_1fr] gap-3">
            <CoverBlock
              platform={item.game.platform}
              systemCode={item.game.systemCode}
              title={item.game.title}
              imageUrl={item.game.images[0]}
              coverColor={item.game.coverColor}
              aspect="square"
              className="h-[60px]"
            />
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-bold leading-snug text-white">{item.game.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <ConditionBadge condition={item.game.condition} />
                <span className="text-[12px] text-white/45">
                  {item.quantity} x {formatPrice(item.unitPrice)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-5 border-t border-white/10" />

      <div className="space-y-3 text-sm text-white/65">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-white">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-bold text-white">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated tax</span>
          <span className="font-bold text-white">{step === 1 ? "Calculated at next step" : formatPrice(tax)}</span>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
        <span className="font-body text-[13px] font-extrabold uppercase tracking-[0.08em] text-white">
          Order Total
        </span>
        <span className="font-display text-4xl uppercase leading-none text-brand-red">
          {formatPrice(total)}
        </span>
      </div>

      <div className="mt-6 space-y-2 text-[12px] font-bold text-white/50">
        {["Authentic games", "Tested on original hardware", "1-year warranty", "Packaged to protect original boxes"].map((text) => (
          <p key={text} className="flex items-center gap-2">
            <span className="text-brand-red">{"\u2713"}</span>
            {text}
          </p>
        ))}
      </div>

      <Link href="/info/contact" className="mt-5 inline-flex text-sm font-bold text-brand-red">
        Questions? Contact us
      </Link>
    </aside>
  );

  return (
    <>
      <button
        type="button"
        className="mb-4 flex w-full items-center justify-between rounded-card border border-border bg-[#1A1A1A] p-4 font-body text-sm font-extrabold uppercase tracking-[0.06em] text-white lg:hidden"
        onClick={onToggle}
      >
        Order Total: {formatPrice(total)}
        <span aria-hidden="true">{expanded ? "\u25B2" : "\u25BC"}</span>
      </button>
      <div className={`${expanded ? "block" : "hidden"} lg:block`}>{panel}</div>
    </>
  );
}

export function CheckoutPageClient() {
  const router = useRouter();
  const storeItems = useCartStore((state) => state.items);
  const items = useMemo(() => storeItems.filter((item) => !item.savedForLater), [storeItems]);
  const subtotal = useCartStore((state) => state.subtotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const [step, setStep] = useState<CheckoutStep>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
    saveCard: false,
  });
  const [billingMode, setBillingMode] = useState<BillingMode>("same");
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingFormData>({
    mode: "onChange",
    resolver: shippingResolver,
    defaultValues: {
      email: "",
      marketing: false,
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      phone: "",
    },
  });

  useEffect(() => {
    if (!placingOrder && items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, placingOrder, router]);

  const shipping = deliveryMethod === "expedited" ? 999 : subtotal >= 7500 ? 0 : 499;
  const tax = Math.round(subtotal * 0.09);
  const orderItemCount = items.reduce((count, item) => count + item.quantity, 0);
  const brand = cardBrand(paymentData.cardNumber);
  const last4 = paymentData.cardNumber.replace(/\D/g, "").slice(-4);
  const paymentValid =
    paymentData.cardNumber.replace(/\D/g, "").length >= 12 &&
    paymentData.expiry.trim().length >= 4 &&
    paymentData.cvv.trim().length >= 3 &&
    paymentData.nameOnCard.trim().length >= 2;

  const onShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReview = () => {
    if (!paymentValid) return;
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = () => {
    if (!shippingData || placingOrder) return;
    setPlacingOrder(true);

    window.setTimeout(() => {
      const orderId = `OMG-${Date.now()}`;
      console.log("ORDER PLACED:", {
        shipping: shippingData,
        payment: { last4, brand },
        delivery: deliveryMethod,
        items,
        totals: { subtotal, shipping, tax, total: subtotal + shipping + tax },
      });
      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 2000);
  };

  const summaryTax = step === 1 ? 0 : tax;
  const summaryTotal = subtotal + shipping + summaryTax;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-bg-dark px-7 py-8 text-white md:py-12">
      <div className="mx-auto max-w-[1240px]">
        <CheckoutStepIndicator currentStep={step} steps={["Shipping", "Payment", "Review"]} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="lg:order-2">
            <CheckoutSummary
              step={step}
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={summaryTotal}
              expanded={mobileSummaryOpen}
              onToggle={() => setMobileSummaryOpen((open) => !open)}
            />
          </div>

          <div className="space-y-6 lg:order-1">
            {step === 1 ? (
              <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-6">
                <section className="rounded-card border border-border bg-bg-surface p-5 shadow-card">
                  <SectionTitle>Contact Information</SectionTitle>
                  <TextField label="Email" type="email" error={errors.email?.message} {...register("email")} />
                  <label className="mt-4 flex items-center gap-3 text-sm text-white/65">
                    <input type="checkbox" className="rounded border-border bg-[#1A1A1A] text-brand-red" {...register("marketing")} />
                    Email me with news and offers from OMG Retro
                  </label>
                </section>

                <section className="rounded-card border border-border bg-bg-surface p-5 shadow-card">
                  <SectionTitle>Shipping Address</SectionTitle>
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField label="First name" error={errors.firstName?.message} {...register("firstName")} />
                    <TextField label="Last name" error={errors.lastName?.message} {...register("lastName")} />
                  </div>
                  <div className="mt-4 space-y-4">
                    <TextField label="Address line 1" error={errors.address1?.message} {...register("address1")} />
                    <TextField label="Address line 2 optional" error={errors.address2?.message} {...register("address2")} />
                    <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
                      <TextField label="City" error={errors.city?.message} {...register("city")} />
                      <SelectField label="State" error={errors.state?.message} {...register("state")}>
                        <option value="">Select</option>
                        {statesAndProvinces.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </SelectField>
                      <TextField label="ZIP code" error={errors.zip?.message} {...register("zip")} />
                    </div>
                    <input type="hidden" value="United States" {...register("country")} />
                    <TextField label="Country" value="United States" disabled error={errors.country?.message} />
                    <TextField label="Phone optional" type="tel" error={errors.phone?.message} {...register("phone")} />
                  </div>
                </section>

                <section className="rounded-card border border-border bg-bg-surface p-5 shadow-card">
                  <SectionTitle>Delivery Method</SectionTitle>
                  <DeliveryMethodSelector subtotal={subtotal} selected={deliveryMethod} onSelect={setDeliveryMethod} />
                </section>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="h-[52px] w-full rounded-btn bg-brand-red font-body text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue to Payment {"\u2192"}
                </button>
                <Link href="/cart" className="inline-flex font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/55 transition hover:text-brand-red">
                  {"\u2190"} Return to Cart
                </Link>
              </form>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <section className="rounded-card border border-border bg-bg-surface p-5 shadow-card">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <SectionTitle>Shipping To</SectionTitle>
                      <p className="text-sm text-white/55">{compactAddress(shippingData ?? undefined)}</p>
                    </div>
                    <button type="button" className="text-sm font-bold text-brand-red" onClick={() => setStep(1)}>Edit</button>
                  </div>
                </section>

                <section className="rounded-card border border-border bg-bg-surface p-5 shadow-card">
                  <SectionTitle>Payment</SectionTitle>
                  {/* TODO: Replace with Stripe Elements */}
                  <div className="space-y-4">
                    <TextField
                      label={`Card number (${brand})`}
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(event) => setPaymentData((data) => ({ ...data, cardNumber: event.target.value }))}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField
                        label="Expiry date"
                        placeholder="MM/YY"
                        value={paymentData.expiry}
                        onChange={(event) => setPaymentData((data) => ({ ...data, expiry: event.target.value }))}
                      />
                      <TextField
                        label="CVV"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(event) => setPaymentData((data) => ({ ...data, cvv: event.target.value }))}
                      />
                    </div>
                    <TextField
                      label="Name on card"
                      value={paymentData.nameOnCard}
                      onChange={(event) => setPaymentData((data) => ({ ...data, nameOnCard: event.target.value }))}
                    />
                    <label className="flex items-center gap-3 text-sm text-white/65">
                      <input
                        type="checkbox"
                        className="rounded border-border bg-[#1A1A1A] text-brand-red"
                        checked={paymentData.saveCard}
                        onChange={(event) => setPaymentData((data) => ({ ...data, saveCard: event.target.checked }))}
                      />
                      Save card for future purchases
                    </label>
                  </div>
                </section>

                <section className="rounded-card border border-border bg-bg-surface p-5 shadow-card">
                  <SectionTitle>Billing Address</SectionTitle>
                  <div className="space-y-3">
                    {(["same", "different"] as BillingMode[]).map((mode) => (
                      <label key={mode} className="flex items-center gap-3 rounded-card border border-border bg-[#1A1A1A] p-3 text-sm font-bold text-white/70">
                        <input
                          type="radio"
                          name="billingMode"
                          className="text-brand-red"
                          checked={billingMode === mode}
                          onChange={() => setBillingMode(mode)}
                        />
                        {mode === "same" ? "Same as shipping address" : "Use different billing address"}
                      </label>
                    ))}
                  </div>
                  {billingMode === "different" ? (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <TextField label="First name" />
                      <TextField label="Last name" />
                      <TextField label="Address line 1" className="md:col-span-2" />
                      <TextField label="City" />
                      <TextField label="ZIP code" />
                    </div>
                  ) : null}
                </section>

                <button
                  type="button"
                  disabled={!paymentValid}
                  onClick={handleReview}
                  className="h-[52px] w-full rounded-btn bg-brand-red font-body text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Review Order {"\u2192"}
                </button>
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/45">
                  <span>{"\u{1F512}"} 256-bit SSL</span>
                  <span>VISA | MC | AMEX | PayPal</span>
                </div>
                <button type="button" className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/55 transition hover:text-brand-red" onClick={() => setStep(1)}>
                  {"\u2190"} Return to Shipping
                </button>
              </div>
            ) : null}

            {step === 3 && shippingData ? (
              <div className="space-y-6">
                <h1 className="font-display text-5xl uppercase leading-none text-white">Review Your Order</h1>

                <div className="grid gap-4 md:grid-cols-3">
                  <section className="rounded-card border border-border bg-bg-surface p-4">
                    <div className="mb-3 flex justify-between gap-3">
                      <h2 className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-white">Shipping Address</h2>
                      <button className="text-sm font-bold text-brand-red" onClick={() => setStep(1)}>Edit</button>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55">
                      {shippingData.firstName} {shippingData.lastName}<br />
                      {shippingData.address1}{shippingData.address2 ? `, ${shippingData.address2}` : ""}<br />
                      {shippingData.city}, {shippingData.state} {shippingData.zip}
                    </p>
                  </section>
                  <section className="rounded-card border border-border bg-bg-surface p-4">
                    <div className="mb-3 flex justify-between gap-3">
                      <h2 className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-white">Payment</h2>
                      <button className="text-sm font-bold text-brand-red" onClick={() => setStep(2)}>Edit</button>
                    </div>
                    <p className="text-sm text-white/55">{brand} ending in {last4}</p>
                  </section>
                  <section className="rounded-card border border-border bg-bg-surface p-4">
                    <div className="mb-3 flex justify-between gap-3">
                      <h2 className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-white">Delivery</h2>
                      <button className="text-sm font-bold text-brand-red" onClick={() => setStep(1)}>Edit</button>
                    </div>
                    <p className="text-sm text-white/55">
                      {deliveryMethod === "standard" ? "Standard Shipping" : "Expedited Shipping"}<br />
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </p>
                  </section>
                </div>

                <section className="rounded-card border border-border bg-bg-surface p-5 shadow-card">
                  <SectionTitle>Order Items ({orderItemCount})</SectionTitle>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="grid grid-cols-[60px_1fr_auto] gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <CoverBlock
                          platform={item.game.platform}
                          systemCode={item.game.systemCode}
                          title={item.game.title}
                          imageUrl={item.game.images[0]}
                          coverColor={item.game.coverColor}
                          aspect="square"
                          className="h-[60px]"
                        />
                        <div>
                          <p className="font-bold text-white">{item.game.title}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <ConditionBadge condition={item.game.condition} />
                            <span className="text-sm text-white/45">Qty {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-brand-red">{formatPrice(item.unitPrice * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-card border border-border bg-bg-surface p-5 shadow-card">
                  <div className="space-y-3 text-sm text-white/65">
                    <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
                    <div className="flex justify-between"><span>Estimated Tax</span><span>{formatPrice(tax)}</span></div>
                    <div className="flex justify-between border-t border-white/10 pt-4 font-display text-3xl uppercase text-brand-red">
                      <span>Order Total</span><span>{formatPrice(subtotal + shipping + tax)}</span>
                    </div>
                  </div>
                </section>

                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={placingOrder}
                  className="h-[52px] w-full rounded-btn bg-brand-red font-body text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark disabled:cursor-wait disabled:opacity-70"
                >
                  {placingOrder ? "Placing Order..." : "Place Order"}
                </button>
                <button type="button" className="block font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/55 transition hover:text-brand-red" onClick={() => setStep(2)}>
                  {"\u2190"} Return to Payment
                </button>
                <p className="text-sm text-white/45">
                  By placing your order you agree to our{" "}
                  <Link href="/info/terms" className="text-brand-red">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/info/privacy" className="text-brand-red">Privacy Policy</Link>.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
