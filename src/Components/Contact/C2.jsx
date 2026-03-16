import React from "react";

const C2 = () => {
  const cards = [
    {
      icon: (
        <img src="/images/IconMail.svg" alt="Email" className="w-[40px] h-[40px]" />
      ),
      title: "Email",
      desc: "Our friendly team is here to help.",
      href: "mailto:hi@agency.com",
      display: "hi@agency.com",
    },
    {
      icon: (
        <img src="/images/IconPhone.svg" alt="Phone" className="w-[40px] h-[40px]" />
      ),
      title: "Phone",
      desc: "Mon-Fri from 8am to 5pm.",
      href: "tel:+15550000000",
      display: "+1 (555) 000-0000",
    },
    {
      icon: (
        <img
          src="/images/IconLocation.svg"
          alt="Location"
          className="w-[40px] h-[40px]"
        />
      ),
      title: "Office",
      desc: "Come say hello at our office HQ.",
       href: "google.com/maps?ll=13.058405,77.592412&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=11820982111651408683",
       display: "100 Smith Street\nCollingwood VIC 3066 AU",
    },
  ];

  return (
    <div className="bg-[#ffffff] py-20 max-sm:py-10">
      {/* 1280 FRAME */}
      <div className="w-[1280px] mx-auto flex flex-col gap-[60px] box-border max-lg:w-full max-lg:px-8 max-sm:w-full max-sm:px-5 max-sm:gap-[60px]">
        {/* Header */}
        <div className="w-[834px] flex flex-col gap-[30px] max-lg:w-full max-sm:w-full max-sm:gap-4">
          <h1
            className="text-[50px] leading-[1.4] m-0 text-[#131313] max-sm:text-[28px] max-sm:leading-snug"
            style={{ fontFamily: "'Ultra', serif" }}
          >
            We'd love to hear from you
          </h1>

          <p
            className="text-[14px] lg:text-[20px] text-black/55 m-0"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Need something cleared up? Here are our most frequently asked
            questions.
          </p>
        </div>

        {/* Cards row */}
        <div className="flex gap-[25px] max-lg:flex-wrap max-sm:flex-col max-sm:gap-4">
          {cards.map((card, i) => (
            <a
              key={i}
  href={card.href}
              className="flex-1 flex flex-col gap-3 p-[24px_28px] rounded-2xl box-border max-lg:basis-[calc(50%-13px)] max-lg:min-w-[220px] max-sm:basis-full max-sm:w-full"
              style={{
                background: "#FFF2F2",
                border: "1.5px solid transparent",
                backgroundImage:
                  "linear-gradient(#FFF2F2, #FFF2F2), linear-gradient(135deg, #FA8B69, #FF2E27)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >

              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-white">
                {card.icon}
              </div>

              {/* Title & desc */}
              <div className="flex flex-col gap-[6px]">
                <h3
                  className="text-[20px] lg:text-[24px] m-0 font-semibold leading-[140%]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {card.title}
                </h3>

                <p
                  className="text-[16px] lg:text-[18px] text-black/50 m-0 font-normal leading-[140%]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {card.desc}
                </p>
              </div>

              {/* Link / address */}
              <p
                className="text-[18px] lg:text-[20px] m-0 font-normal leading-[140%] whitespace-pre-line"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {card.display}
              </p>
            </a> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default C2;
