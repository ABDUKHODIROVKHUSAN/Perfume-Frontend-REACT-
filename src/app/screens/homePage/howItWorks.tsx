import React from "react";

const steps = [
  {
    title: "Purchase Securely",
    description: "We ensure all transactions are safe and encrypted.",
    image:
    "/img/customer-paying.png",
        number: "1",
  },
  {
    title: "Ships From Warehouse",
    description: "Fast and reliable shipping from our nearest warehouse.",
    image:
    "/img/warehouse.png",
    number: "2",
  },
  {
    title: "Style Your Room",
    description: "Add beauty and comfort to your space with ease.",
    image:
    "/img/styled-house.jpeg",
    number: "3",
  },
];

const HowItWorks = () => {
  return (
    <section className="hiw-section">
      <h2 className="hiw-title">How It Works</h2>
      <p className="hiw-subtitle">
        A seamless experience from purchase to delivery.
      </p>
      <div className="hiw-steps">
        {steps.map((step, index) => (
          <div className="hiw-card" key={index}>
            <div className="hiw-image-container">
              <img src={step.image} alt={step.title} className="hiw-image" />
              <div className="hiw-number">{step.number}</div>
            </div>
            <h4 className="hiw-card-title">{step.title}</h4>
            <p className="hiw-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
