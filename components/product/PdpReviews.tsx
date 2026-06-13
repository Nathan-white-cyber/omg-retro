import type { CSSProperties } from "react";

export interface PdpReviewsProps {
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
    title: "Exactly as described - saves work perfectly",
    body: "Ordered the CIB copy and it arrived in fantastic shape. Box has minor shelf wear but the manual is crisp and the cartridge saves without a hitch. You can tell it was actually tested. This is the standard every retro shop should hold itself to.",
    yes: 47,
  },
  {
    initials: "SD",
    avatar: "#2f6bb0",
    name: "Sarah D.",
    age: "1 month ago",
    stars: "★★★★★",
    title: "My childhood, restored",
    body: "Bought this to replace the copy I lost years ago. Cleaned, tested, and shipped fast. Fired it up on my original N64 and it played flawlessly. The 1-year warranty made the purchase a no-brainer.",
    yes: 31,
  },
  {
    initials: "JL",
    avatar: "#3a7a3f",
    name: "Jordan L.",
    age: "1 month ago",
    stars: "★★★★☆",
    title: "Great game, packaging could be sturdier",
    body: "No complaints about the game itself - works great and was clearly cleaned. Knocking one star because the box corner got slightly dinged in transit. Support sorted it out quickly though, so still a happy customer.",
    yes: 12,
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function PdpReviews({ score, reviewCount }: PdpReviewsProps) {
  const bars = [
    ["5★", 88],
    ["4★", 9],
    ["3★", 2],
    ["2★", 1],
    ["1★", 0],
  ] as const;

  return (
    <section className="section band-alt" id="reviews">
      <div className="pdp-wrap">
        <div className="section-head">
          <h2>Customer Reviews</h2>
          <a href="#" className="see-all">Write a Review <ArrowIcon /></a>
        </div>
        <div className="reviews-grid">
          <div className="review-summary">
            <div className="rs-score"><span className="num">{score.toFixed(1)}</span><span className="out">/ 5</span></div>
            <div className="rs-stars">★★★★★</div>
            <div className="rs-count">Based on {reviewCount.toLocaleString()} verified reviews</div>
            <div className="rs-bars">
              {bars.map(([label, value]) => (
                <div key={label} className="rs-row">
                  <span className="lbl">{label}</span>
                  <span className="rs-track"><span style={{ width: `${value}%` }} /></span>
                  <span className="pct">{value}%</span>
                </div>
              ))}
            </div>
            <a href="#" className="btn btn-sm">Write a Review</a>
          </div>
          <div className="review-list">
            {reviews.map((review) => (
              <div key={`${review.name}-${review.age}`} className="review-item">
                <div className="review-head">
                  <span className="review-avatar" style={{ "--av": review.avatar } as CSSProperties}>{review.initials}</span>
                  <div className="review-who">
                    <span className="name">
                      {review.name}
                      <span className="verified"><CheckIcon /> Verified Buyer</span>
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
