import React from "react";

const reviews = [
  {
    name: "Robert Reynolds",
    image: "img/lewis.jpg",
    stars: 5,
    comment: "I’ve been looking for a signature scent that doesn't smell like everyone else at the party, and this is it. It’s dark, slightly smoky, and totally addictive. It feels like a well-kept secret.",
    roomImage: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
  },
  {
    name: "Fernando Torres",
    image: "img/torres.jpg",
    stars: 5,
    comment: "I applied two sprays at 8:00 AM, and I could still smell the warm base notes on my skin while I was getting ready for bed. What’s even crazier? I picked up a sweater I wore three days ago, and it still smells exactly like the dry-down.",
    roomImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    name: "Elena Belova",
    image: "img/widow.jpg",
    stars: 5,
    comment: "What I love most is how it lingers and evolves. It starts off bright and punchy, but hours later, it settles into this intimate, creamy scent that stays close to my skin.",
    roomImage: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
  },
];

const ClientReviews = () => {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Comments Of Clients</h2>
      <p className="reviews-subtitle">
        Trusted by creatives, designers & professionals worldwide
      </p>

      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div
              className="room-image"
              style={{ backgroundImage: `url(${review.roomImage})` }}
            />
            <div className="review-content">
              <img src={review.image} alt={review.name} className="avatar" />
              <h4>{review.name}</h4>
              <div className="stars">
                {"★".repeat(review.stars)}
                <span>{"☆".repeat(5 - review.stars)}</span>
              </div>
              <p className="review-comment">“{review.comment}”</p>
            </div>
          </div>
        ))}
      </div>

      <a href="/reviews" className="show-more">
        Show more reviews <span>→</span>
      </a>
    </section>
  );
};

export default ClientReviews;
