import React from "react";


export default function HeroSection() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30px",
        paddingBottom: "10px",
        paddingLeft: "clamp(21px, 5vw, 157px)",
        paddingRight: "clamp(20px, 5vw, 156px)",
        margin: "10px auto",
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <h1
        style={{
          fontFamily: "Ultra, serif",
          fontWeight: "400",
          letterSpacing: "0",
          fontSize: "clamp(20px, 4.5vw, 50px)",
          lineHeight: "clamp(28px, 5.5vw, 64px)",
          maxWidth: "1127px",
          width: "100%",
          textAlign: "center",
          color: "#111",
          margin: "0 0 24px 0",
        }}
      >
        We build strong, high-performing brands through strategic design and
        creative solutions
      </h1>

      {/* Paragraph */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: "400",
          letterSpacing: "0",
          color: "#767676",
          fontSize: "clamp(14px, 1vw, 16px)",
          lineHeight: "clamp(18px, 1.8vw, 26px)",
          maxWidth: "1127px",
          width: "100%",
          textAlign: "center",
          margin: "0",
        }}
      >
        Our mission is to empower businesses with cutting-edge AI technologies
        that enhance performance, streamline operations, and drive growth. We
        believe in the transformative potential of AI and are dedicated to
        making it accessible to businesses of all sizes, across all industries.
      </p>
    
    </div>
  );
}