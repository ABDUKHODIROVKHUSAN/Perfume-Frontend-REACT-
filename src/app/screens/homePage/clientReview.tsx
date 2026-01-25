import React from "react";

const reviews = [
  {
    name: "Andres Iniesta",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
    comment: "Amazing work team! I’m very happy to collab with you",
    roomImage: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
  },
  {
    name: "Cadrino Maleto",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    stars: 5,
    comment: "Cool! I hope we can collaboration again to build something great.",
    roomImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    name: "Christina Pora",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    stars: 4,
    comment: "Cute.. the result is perfect, looks elegant & comfortable",
    roomImage: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
  },
];

const ClientReviews = () => {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Our Clients Reviews</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <img src={review.roomImage} alt="Room" className="room-image" />
            <div className="review-content">
              <img src={review.image} alt={review.name} className="avatar" />
              <div className="review-text">
                <h4>{review.name}</h4>
                <div className="stars">
                  {"★".repeat(review.stars)}{" "}
                  {"☆".repeat(5 - review.stars)}
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="show-more">
       <a href="/reviews"> <span>Show More</span></a>
        <span className="arrow">→</span>
      </div>
    </section>
  );
};

export default ClientReviews;
