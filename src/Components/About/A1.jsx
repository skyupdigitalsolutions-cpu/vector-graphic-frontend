const A1 = () => (
  <>
    {/* Hero Image */}
      <div className="w-full">
        <img
          src="/images/About_banner.webp"
          alt="Food Packaging Design"
          className="w-full h-[250px] md:h-[400px] lg:h-[600px] object-cover"
        />
      </div>
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-10 lg:py-16 xl:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 xl:gap-14">
          {/* LEFT */}
          <div
            className="w-full lg:w-1/2 flex gap-3 sm:gap-4 lg:gap-5"
            style={{ height: "clamp(280px,42vw,520px)" }}
          >
            <div className="flex-1 h-full">
              <img
                src="/images/Rectangle 4.png"
                alt="Packaging boxes"
                className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
              />
            </div>
            <div className="flex-1 h-full flex flex-col gap-3 sm:gap-4 lg:gap-5">
              <div
                className="flex flex-col items-center justify-center text-center bg-[#d90429] rounded-2xl lg:rounded-3xl px-2"
                style={{
                  minHeight: "clamp(70px,13vw,140px)",
                  padding: "12px 10px",
                }}
              >
                <span
                  className="text-white leading-tight mb-2"
                  style={{
                    fontFamily: "'Ultra',Georgia,serif",
                    fontSize: "clamp(18px,3.5vw,40px)",
                  }}
                >
                  +20 Years
                </span>
                <span
                  className="text-white"
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "clamp(12px,1.6vw,20px)",
                  }}
                >
                  Experience
                </span>
              </div>
              <div className="flex-1 min-h-0">
                <img
                  src="/images/who_we_are.webp"
                  alt="Printing machine"
                  className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 max-w-[560px] flex flex-col justify-center">
            <p
              className="text-[#d90429] font-semibold mb-3"
              style={{
                fontFamily: "Poppins",
                fontSize: "clamp(11px,1vw,20px)",
                lineHeight: "33px",
                fontWeight: "600",
              }}
            >
              ABOUT US
            </p>
            <h2
              className="text-black leading-[1.05] mb-4 lg:mb-6"
              style={{
                fontFamily: "'Ultra',Georgia,serif",
                fontSize: "clamp(32px,4.2vw,50px)",
              }}
            >
              Who we are
            </h2>
            <p
              className="text-gray-600 leading-relaxed mb-8"
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "clamp(13px,1.1vw,18px)",
              }}
            >
              We are a Printing and Designing firm. We have 20+ years of
              experience in the pre-press and printing industries for Indian and
              international brands. Because of our clients, we have been able to
              build and its goal of sustainability and growth.
            </p>
            <p
              className="text-gray-600 leading-relaxed "
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "clamp(14px,1.1vw,18px)",
              }}
            >
              We also enable businesses to deliver unprecedented performance and
              customer delight levels by leveraging agile digital at scale. Our
              continuous learning agenda drives continuous improvement by
              developing and transferring digital skills, expertise, and ideas
              from our innovation ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default A1;
