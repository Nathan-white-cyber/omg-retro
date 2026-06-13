import type { CSSProperties } from "react";

export interface PdpReviewsProps {
  productTitle: string;
  score: number;
  reviewCount: number;
}

const reviews = [
  {
    initials: "MK",
    avatar: "#b8902f",
    name: "Marcus K.",
    age: "2 weeks ago",
    stars: "★★★★★",
    title: "Exactly what I hoped for",
    body: "The cartridge arrived cleaner than anything I have found locally. It booted first try and the label looked exactly like the photos.",
    yes: 47,
  },
  {
    initials: "EP",
    avatar: "#1fa34a",
    name: "Erin P.",
    age: "1 month ago",
    stars: "★★★★★",
    title: "Clean, tested, and packed right",
    body: "Fast shipping, careful packaging, and the game played perfectly on original hardware. The testing notes made the purchase feel easy.",
    yes: 31,
  },
  {
    initials: "DR",
    avatar: "#003087",
    name: "Daniel R.",
    age: "2 months ago",
    stars: "★★★★★",
    title: "Great condition for retro hardware",
    body: "Great condition for a retro item. I especially appreciated that the contacts were cleaned before shipping.",
    yes: 24,
  },
  {
    initials: "SK",
    avatar: "#6a4fb0",
    name: "Sam K.",
    age: "3 months ago",
    stars: "★★★★☆",
    title: "Matched the listing",
    body: "Very happy overall. The box had a little shelf wear, but it matched the listing and the game itself was flawless.",
    yes: 18,
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  );
}

export default function PdpReviews({ productTitle, score, reviewCount }: PdpReviewsProps) {
  const bars = [
    ["5", 68],
    ["4", 22],
    ["3", 7],
    ["2", 2],
    ["1", 1],
  ] as const;

  return (
    <section className="section band-alt" id="reviews">
      <div className="pdp-wrap">
        <div className="section-head">
          <h2>Customer Reviews</h2>
          <a href="#reviews" className="see-all">See All →</a>
        </div>
        <div className="reviews-grid">
          <div className="review-summary">
            <div className="rs-score"><span className="num">{score.toFixed(1)}</span><span className="out">/5</span></div>
            <div className="rs-stars">★★★★★</div>
            <div className="rs-count">{reviewCount.toLocaleString()} reviews for {productTitle}</div>
            <div className="rs-bars">
              {bars.map(([label, value]) => (
                <div key={label} className="rs-row">
                  <span className="lbl">{label}</span>
                  <span className="rs-track"><span style={{ width: `${value}%` }} /></span>
                  <span className="pct">{value}%</span>
                </div>
              ))}
            </div>
            <button type="button" className="btn-sm">Write a Review</button>
          </div>
          <div className="review-list">
            {reviews.map((review) => (
              <div key={`${review.name}-${review.age}`} className="review-item">
                <div className="review-head">
                  <span className="review-avatar" style={{ "--av": review.avatar } as CSSProperties}>{review.initials}</span>
                  <div className="review-who">
                    <span className="name">
                      {review.name}
                      <span className="verified">
                        <CheckIcon /> Verified Buyer
                      </span>
                    </span>
                    <span className="review-meta"><span className="stars">{review.stars}</span> · {review.age}</span>
                  </div>
                </div>
                <h5>{review.title}</h5>
                <p>{review.body}</p>
                <div className="review-foot">
                  <span>Was this helpful?</span>
                  <button type="button"><HeartIcon /> Yes ({review.yes})</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
