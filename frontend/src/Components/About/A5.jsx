const clients = [
  { id: 1, name: "Cloudly" },
  { id: 2, name: "Cloudly" },
  { id: 3, name: "Cloudly" },
  { id: 4, name: "Cloudly" },
  { id: 5, name: "Cloudly" },
  { id: 6, name: "Cloudly" },
];

const CloudlyIcon = () => (
  <svg
    width="68"
    height="45"
    viewBox="0 0 68 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="22" r="15" fill="#1a1a1a" />
    <circle cx="36" cy="22" r="18" fill="#D9D9D9" />
  </svg>
);

const ClientCard = ({ name }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      background: "white",
      justifyContent: "flex-start",
      gap: "16px",
      borderRadius: "27.82px",
      padding: "0 32px",
      border: "0.87px solid #F1F2F9",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.01)",
      width: "320px",
      height: "140px",
      marginRight: "24px",
      flexShrink: 0,
      boxSizing: "border-box",
    }}
  >
    <CloudlyIcon />
    <span
      style={{
        fontSize: "26px",
        fontWeight: "700",
        color: "#111111",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "-0.5px",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  </div>
);

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
`;

const repeated = [...clients, ...clients, ...clients, ...clients];

const MarqueeRow = ({ direction = "left", speed = 30 }) => {
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        padding: "12px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: `${animationName} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {repeated.map((client, idx) => (
          <ClientCard key={idx} name={client.name} />
        ))}
      </div>
    </div>
  );
};

export default function A5() {
  return (
    <>
      <style>{marqueeKeyframes}</style>
      <section
        style={{
          background: "#f5f5f7",
          padding: "60px 0",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "500",
            color: "#333",
            fontFamily: "unbounded",
            marginBottom: "30px",
            letterSpacing: "0.02em",
          }}
        >
          Our Clients
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <MarqueeRow direction="left" speed={30} />
          <MarqueeRow direction="right" speed={25} />
        </div>
      </section>
    </>
  );
}
