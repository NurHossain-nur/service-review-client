import React from 'react';

const Partners = () => {
  const partners = [
    {
      name: "Tech Solutions Inc.",
      logo: "https://i.ibb.co/Nb9WjSB/Bid1-min.png",
      description: "Provided early infrastructure and growth support.",
    },
    {
      name: "ReviewPro",
      logo: "https://i.ibb.co/Nb9WjSB/Bid1-min.png",
      description: "Our official review management partner.",
    },
    {
      name: "SecureHost",
      logo: "https://i.ibb.co/Nb9WjSB/Bid1-min.png",
      description: "Ensures secure and fast hosting services.",
    },
  ];

  return (
    <div className="my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Meet Our Partners</h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {partners.map((partner, index) => (
          <div key={index} className="bg-base-100 p-4 rounded-lg shadow">
            <img src={partner.logo} alt={partner.name} className="mx-auto h-24 mb-4" />
            <h3 className="text-xl font-semibold">{partner.name}</h3>
            <p className="text-sm text-muted">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
