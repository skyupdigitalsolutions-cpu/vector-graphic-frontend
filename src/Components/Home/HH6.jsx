const clientsRow1 = [
  { id: 1,  name: "Client 1",  logo: "/images/logo_1.webp" },
  { id: 2,  name: "Client 2",  logo: "/images/logo_2.webp" },
  { id: 3,  name: "Client 3",  logo: "/images/logo_3.webp" },
  { id: 4,  name: "Client 4",  logo: "/images/logo_4.webp" },
  { id: 5,  name: "Client 5",  logo: "/images/logo_5.webp" },
  { id: 6,  name: "Client 6",  logo: "/images/logo_6.webp" },
  { id: 7,  name: "Client 7",  logo: "/images/logo_7.webp" },
  { id: 8,  name: "Client 8",  logo: "/images/logo_8.webp" },
  { id: 9,  name: "Client 9",  logo: "/images/logo_9.webp" },
  { id: 10, name: "Client 10", logo: "/images/logo_10.webp" },
];

const clientsRow2 = [
  { id: 1,  name: "Client 11", logo: "/images/logo_11.webp" },
  { id: 2,  name: "Client 12", logo: "/images/logo_12.webp" },
  { id: 3,  name: "Client 13", logo: "/images/logo_13.webp" },
  { id: 4,  name: "Client 14", logo: "/images/logo_14.webp" },
  { id: 5,  name: "Client 15", logo: "/images/logo_15.webp" },
  { id: 6,  name: "Client 16", logo: "/images/logo_16.webp" },
  { id: 7,  name: "Client 17", logo: "/images/logo_17.webp" },
  { id: 8,  name: "Client 18", logo: "/images/logo_18.webp" },
  { id: 9,  name: "Client 19", logo: "/images/logo_19.webp" },
  { id: 10, name: "Client 20", logo: "/images/logo_20.webp" },
];

const marqueeKeyframes = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');

  @keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .client-card {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 27.82px;
    overflow: hidden;
    width: 320px;
    height: 140px;
    margin-right: 24px;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .client-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-fit: contain;
    display: block;
  }

  .client-name {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: #000000;
    font-family: unbounded;
    margin-bottom: 30px;
    letter-spacing: 0.02em;
  }

  .client-marquee {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  @media (max-width: 768px) {
    .client-name {
      font-size: 16px;
    }
    .client-card {
      width: 160px;
      height: 70px;
      border-radius: 10px;
      margin-right: 12px;
    }
    .client-marquee {
      gap: 20px;
    }
  }
`;

const ClientCard = ({ name, logo }) => (
  <div className="client-card">
    <img src={logo} alt={name} />
  </div>
);

const MarqueeRow = ({ clients, direction = "left", speed = 30 }) => {
  const repeated = [...clients, ...clients, ...clients, ...clients];
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";
  return (
    <div style={{ overflow: "hidden", width: "100%", height:'100%', padding: "12px 0" }}>
      <div
        style={{
          display: "flex",
          animation: `${animationName} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {repeated.map((client, idx) => (
          <ClientCard key={idx} name={client.name} logo={client.logo} />
        ))}
      </div>
    </div>
  );
};

export default function Cloudy() {
  return (
    <>
      <style>{marqueeKeyframes}</style>
      <section
        style={{
          background: "black",
          padding: "60px 0",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <h2 className="client-name text-white">
          Our Clients
        </h2>
        <div className="client-marquee">
          <MarqueeRow clients={clientsRow1} direction="left"  speed={30} />
          <MarqueeRow clients={clientsRow2} direction="right" speed={30} />
        </div>
      </section>
    </>
  );
}