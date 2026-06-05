"use client";

interface CheckoutStepIndicatorProps {
  currentStep: 1 | 2 | 3;
  steps: string[];
}

export function CheckoutStepIndicator({ currentStep, steps }: CheckoutStepIndicatorProps) {
  return (
    <nav aria-label="Checkout progress" className="mx-auto mb-8 flex justify-center">
      <ol className="flex flex-wrap items-center justify-center gap-3 rounded-card border border-border bg-[#1A1A1A] px-4 py-3 text-sm shadow-card">
        {steps.map((step, index) => {
          const stepNumber = (index + 1) as 1 | 2 | 3;
          const complete = stepNumber < currentStep;
          const active = stepNumber === currentStep;

          return (
            <li key={step} className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 font-body text-[12px] font-extrabold uppercase tracking-[0.08em] ${
                  complete || active ? "text-brand-red" : "text-white/35"
                } ${active ? "border-b-2 border-brand-red pb-1" : ""}`}
                aria-current={active ? "step" : undefined}
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full border text-[11px] ${
                    complete
                      ? "border-brand-red bg-brand-red text-white"
                      : active
                        ? "border-brand-red text-brand-red"
                        : "border-white/20 text-white/35"
                  }`}
                >
                  {complete ? "\u2713" : stepNumber}
                </span>
                {step}
              </span>
              {index < steps.length - 1 ? (
                <span className="font-body text-[12px] font-bold text-white/25" aria-hidden="true">
                  {"\u2192"}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
