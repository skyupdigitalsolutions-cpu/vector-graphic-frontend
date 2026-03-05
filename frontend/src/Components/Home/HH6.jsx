const testimonials = [
  {
    id: 1,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "JOHN SMITH",
    title: "Founder of Awesomeux Technology",
    avatar: "https://i.pravatar.cc/60?img=12",
  },
  {
    id: 2,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "JOHN SMITH",
    title: "Founder of Awesomeux Technology",
    avatar: "https://i.pravatar.cc/60?img=12",
  },
];

const CARD_BG_IMAGE = "/images/cimage.png";

// Inline SVG noise texture as data URI (matches the grain image in the design spec)
const NOISE_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='1'/></svg>`;

function TestimonialCard({ testimonial }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;1,300;1,400&family=Ultra&display=swap');

        .tcw {
          position: relative;
          flex-shrink: 0;
          width: 580px;
          height: 376px;
        }

        /* Outer glow / shadow layer */
        .cs {
          position: absolute;
          inset: 12px;
          border-radius: 50px;
          
          background: transparent;
          box-shadow:
            0 0 80px 20px rgba(71, 69, 69, 0.9),
            0 20px 60px rgba(43, 43, 43, 0.8);
        }

        /* Main card mask */
        .cm {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow:
            0 32px 80px rgba(0,0,0,0.85),
            inset 0 1px 0 rgba(255,255,255,0.07),
            inset 0 -1px 0 rgba(0, 0, 0, 0);
        }

        /* Card background image */
        .cb {
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background-size: cover;
          background-position: center;
        
        }

        /* Grain / noise texture overlay — tile, 20% opacity, multiply */
        .cgrain {
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background-image: url("${NOISE_SVG}");
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.20;
          mix-blend-mode: multiply;
        }

        /* Subtle dark overlay for depth */
        .co {
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: linear-gradient(
            135deg,
            rgba(80,80,80,0.04) 0%,
            rgba(50, 49, 49, 0.3) 100%
          );
        }

        /* Top-left specular highlight */
        .csh {
          position: absolute;
          top: 0;
          left: 0;
          width: 280px;
          height: 200px;
          border-top-left-radius: 50px;
          pointer-events: none;
          background: radial-gradient(
            ellipse at 15% 15%,
            rgba(255,255,255,0.06) 0%,
            transparent 65%
          );
        }

        /* Content container */
        .cc {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
        }

        /* Opening quote mark */
        .cqm {
          position: absolute;
          top: 38px;
          left: 38px;
          font-size: 56px;
          color: #e03030;
          line-height: 1;
          font-family: Georgia, serif;
        }

        /* Quote text */
        .cqt {
          position: absolute;
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          text-align: left;
          overflow: hidden;
          width: 460px;
          height: 160px;
          top: 82px;
          left: 62px;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          line-height: 28px;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }

        /* Avatar + name + title block */
        .cab {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding-bottom: 30px;
        }

        .cai {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid #e03030;
          background: #111;
          object-fit: cover;
        }

        .can {
          color: white;
          letter-spacing: 0.08em;
          margin: 8px 0 0 0;
          font-family: 'Ultra', sans-serif;
          font-size: 14px;
        }

        .cat {
          color: rgba(255,255,255,0.45);
          margin: 2px 0 0 0;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 300;
        }

        /* Responsive — tablet */
        @media (max-width: 1280px) {
          .tcw { width: 480px; height: 360px; }
          .cqt { width: 370px; }
        }

        @media (max-width: 1024px) {
          .tcw { width: 340px; height: 340px; }
          .cqm { top: 28px; left: 24px; font-size: 42px; }
          .cqt { width: 270px; height: 150px; top: 66px; left: 30px; font-size: 12px; line-height: 22px; }
          .cab { padding-bottom: 24px; }
          .cai { width: 48px; height: 48px; }
          .can { font-size: 12px; }
          .cat { font-size: 11px; }
        }

        /* Responsive — mobile */
        @media (max-width: 640px) {
          .tcw { width: 100%; max-width: 340px; height: 320px; }
          .cqm { top: 24px; left: 20px; font-size: 36px; }
          .cqt { width: calc(100% - 44px); height: 140px; top: 60px; left: 22px; font-size: 11.5px; line-height: 21px; }
        }
      `}</style>
      <div className="tcw">
        <div className="cs" />
        <div className="cm">
          <div className="cb" style={{ backgroundImage: `url('${CARD_BG_IMAGE}')` }} />
          <div className="cgrain" />
          <div className="co" />
          <div className="csh" />
          <div className="cc">
            <span className="cqm">❝</span>
            <p className="cqt">{testimonial.text}</p>
            <div className="cab">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="cai"
              />
              <p className="can">{testimonial.name}</p>
              <p className="cat">{testimonial.title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TestimonialsSection() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;1,300;1,400&family=Ultra&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .ts {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-height: 772px;
          background: #000;
          padding: 64px 24px;
          box-sizing: border-box;
        }

        .th {
          position: relative;
          z-index: 10;
          text-align: center;
        }

        .th h2 {
          color: white;
          margin: 0;
          font-family: 'Ultra', serif;
          font-size: 50px;
          line-height: 160%;
          font-weight: 400;
        }

        @media (max-width: 1024px) {
          .th h2 { font-size: 38px; color: #C2C4C8; }
        }

        @media (max-width: 640px) {
          .th h2 { font-size: 22px; color: #C2C4C8; }
          .ts { min-height: unset; padding: 48px 16px; }
        }

        .tr {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 72px;
          gap: 60px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .tr { gap: 32px; margin-top: 48px; }
        }

        @media (max-width: 640px) {
          .tr {
            flex-direction: column;
            align-items: center;
            gap: 28px;
            margin-top: 40px;
          }
        }
      `}</style>
      <section className="ts">
        <div className="th">
          <h2>
            Don't take our word for it.
            <br />
            Over 50+ people trust us.
          </h2>
        </div>
        <div className="tr">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>
    </>
  );
}