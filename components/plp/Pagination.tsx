import Link from "next/link";

interface PaginationProps {
  page: number;
  pageCount: number;
  searchParams: Record<string, string | string[] | undefined>;
}

function pageHref(searchParams: PaginationProps["searchParams"], page: number) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "page") return;
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (value) {
      params.set(key, value);
    }
  });

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `?${query}` : "?";
}

function visiblePages(page: number, pageCount: number) {
  const pages = new Set([1, pageCount, page - 1, page, page + 1]);
  return Array.from(pages)
    .filter((item) => item >= 1 && item <= pageCount)
    .sort((a, b) => a - b);
}

export function Pagination({ page, pageCount, searchParams }: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const nextPage = Math.min(page + 1, pageCount);

  return (
    <nav className="mt-10 flex items-center justify-center" aria-label="Product pagination">
      <div className="hidden items-center gap-2 md:flex">
        {visiblePages(page, pageCount).map((item, index, pages) => {
          const previous = pages[index - 1];
          const showGap = previous && item - previous > 1;

          return (
            <span key={item} className="flex items-center gap-2">
              {showGap ? <span className="px-2 text-text-dark-muted">...</span> : null}
              <Link
                href={pageHref(searchParams, item)}
                className={`flex h-10 min-w-10 items-center justify-center rounded-btn border px-3 text-[13px] font-extrabold transition ${
                  item === page
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-border-cream bg-white text-text-dark hover:border-brand-red hover:text-brand-red"
                }`}
              >
                {item}
              </Link>
            </span>
          );
        })}
        <Link
          href={pageHref(searchParams, nextPage)}
          className="flex h-10 items-center rounded-btn border border-border-cream bg-white px-4 text-[13px] font-extrabold uppercase text-text-dark transition hover:border-brand-red hover:text-brand-red"
        >
          &gt;
        </Link>
      </div>

      <Link
        href={pageHref(searchParams, nextPage)}
        className="rounded-btn bg-brand-red px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-brand-red-dark md:hidden"
      >
        Load More
      </Link>
    </nav>
  );
}
