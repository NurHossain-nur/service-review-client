import React from 'react';

const Partners = () => {
  const partners = [
    {
      name: "TechVerse",
      logo: "https://i.ibb.co/DfV9RsCg/Flux-Dev-A-sleek-modern-and-professional-minimal-tech-company-0.jpg",
      description: "TechVerse provides our cloud infrastructure and ensures uptime performance of all hosted services.",
    },
    {
      name: "EduBridge",
      logo: "https://i.ibb.co/QjbdPMMM/Flux-Dev-A-stylized-educational-brand-logo-featuring-a-promine-2.jpg",
      description: "EduBridge powers the educational content and guides our users in building digital skills.",
    },
    {
      name: "GreenRide",
      logo: "https://i.ibb.co/CKrZXx81/Flux-Dev-A-stylized-modern-and-ecofriendly-transport-company-l-3.jpg",
      description: "GreenRide collaborates with our Transport Services, offering eco-conscious mobility options to users.",
    },
  ];

  return (
    <div className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">Meet Our Partners</h2>
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
