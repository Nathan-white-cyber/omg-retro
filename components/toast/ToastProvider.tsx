"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ToastAction {
  label: string;
  href: string;
}

interface ToastInput {
  message: string;
  action?: ToastAction;
  duration?: number;
}

interface ToastState extends ToastInput {
  id: number;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);
const DEFAULT_TOAST_DURATION_MS = 3000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const nextId = useRef(1);

  const toast = useCallback((input: ToastInput) => {
    const id = nextId.current;
    nextId.current += 1;

    setToasts((current) => [
      ...current,
      {
        ...input,
        id,
        duration: input.duration ?? DEFAULT_TOAST_DURATION_MS,
      },
    ]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, input.duration ?? DEFAULT_TOAST_DURATION_MS);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-5 top-5 z-toast flex w-[min(360px,calc(100vw-40px))] flex-col gap-3">
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            aria-live="polite"
            className="rounded-card border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm font-bold text-white shadow-card"
          >
            <span>{item.message}</span>
            {item.action ? (
              <Link
                href={item.action.href}
                className="ml-3 whitespace-nowrap text-brand-red transition hover:text-brand-red-light"
              >
                {item.action.label}
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context.toast;
}
