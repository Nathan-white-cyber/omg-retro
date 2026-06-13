export interface PdpReviewsProps {
  productTitle: string;
  score: number;
  reviewCount: number;
}

const reviews = [
  {
    name: "Marcus T.",
    date: "May 18, 2026",
    stars: "★★★★★",
    body: "The cartridge arrived cleaner than anything I have found locally. It booted first try and the label looked exactly like the photos.",
  },
  {
    name: "Erin P.",
    date: "April 30, 2026",
    stars: "★★★★★",
    body: "Fast shipping, careful packaging, and the game played perfectly on original hardware. The testing notes made the purchase feel easy.",
  },
  {
    name: "Daniel R.",
    date: "April 12, 2026",
    stars: "★★★★★",
    body: "Great condition for a retro item. I especially appreciated that the contacts were cleaned before shipping.",
  },
  {
    name: "Sam K.",
    date: "March 27, 2026",
    stars: "★★★★☆",
    body: "Very happy overall. The box had a little shelf wear, but it matched the listing and the game itself was flawless.",
  },
];

export default function PdpReviews({ productTitle, score, reviewCount }: PdpReviewsProps) {
  const bars = [
    ["5 star", 68],
    ["4 star", 22],
    ["3 star", 7],
    ["2 star", 2],
    ["1 star", 1],
  ] as const;

  return (
    <section className="reviews-section" id="reviews">
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
                <div key={label} className="rs-bar-row">
                  <span>{label}</span>
                  <span className="rs-bar-track"><span className="rs-bar-fill" style={{ width: `${value}%` }} /></span>
                  <span>{value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="review-list">
            {reviews.map((review) => (
              <article key={`${review.name}-${review.date}`} className="review-card">
                <div className="review-top">
                  <div>
                    <div className="reviewer-name">{review.name}</div>
                    <div className="review-meta">{review.date} · Verified purchase</div>
                  </div>
                  <div className="review-stars">{review.stars}</div>
                </div>
                <p className="review-body">{review.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
