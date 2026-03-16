import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/home" },
  { label: "About Us", href: "/aboutus" },
  { label: "Services", href: "/service" },
  { label: "Contact Us", href: "/contactus" },
];
const handleNavClick = (e, href) => {
  e.preventDefault();
  window.history.pushState(null, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#C92020] text-white flex justify-center font-urbanist">
      <div
        className="w-full max-w-[1192px]
                   mx-auto
                   px-[20px] sm:px-[40px] lg:px-0
                   pt-[50px] md:pt-[60px]
                   pb-[24px] md:pb-[30px]
                   flex flex-col"
      >
        {/* TOP AREA */}
        <div
          className="
            flex flex-col 
            md:flex-row 
            lg:flex-row
            gap-[32px] md:gap-[60px] lg:gap-[165px]
            items-start
          "
        >
          {/* LEFT BLOCK */}
          <div className="max-w-[420px] flex flex-col gap-[16px]">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-[180px] md:w-[220px]"
            />

            <p className="text-[14px] sm:text-[15px] md:text-[18px] leading-[140%] opacity-90">
              Images on this website are for representation purposes only.
              Actual landscapes, layouts, and features may vary. Some visuals
              are digitally created to illustrate the project concept.
              <br />
              Novara Nature Estate reserves the right to modify designs and
              details without prior notice. These images do not constitute a
              legal offer or commitment.
            </p>
          </div>

          {/* RIGHT SIDE (Tablet = stacked, Desktop = side-by-side) */}
          <div className="flex flex-col md:flex-col lg:flex-row gap-[32px] lg:gap-[165px]">
            {/* QUICK LINKS */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[15px] sm:text-[16px] md:text-[18px] font-semibold whitespace-nowrap">
                Quick Links
              </h3>

              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[15px] sm:text-[16px] md:text-[18px] opacity-90 hover:opacity-100"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CONTACT */}
            <div className="flex flex-col gap-[14px] md:gap-[16px]">
              <h3 className="text-[15px] sm:text-[16px] md:text-[18px] font-semibold">
                Contact Us
              </h3>

              <p className="text-[14px] sm:text-[15px] md:text-[18px] opacity-90">
                Email : <a href="mailto:info@gmail.com">info@gmail.com</a>
              </p>
              <p className="text-[14px] sm:text-[15px] md:text-[18px] opacity-90">
                <a href="tel:+91 9986655922">Phone : +91 9986655922</a>
              </p>

              <div className="flex gap-[18px] md:gap-[20px] mt-[6px]">
                <a
                  href="https://www.facebook.com/people/SKYUP-Digital-Solutions/61584820941998/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF size={18} className="transition-transform hover:scale-125" />
                </a>
                <a
                  href="https://www.instagram.com/skyupdigitalsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={18} className="transition-transform hover:scale-125" />
                </a>
                <a href="linkedin.com/company/110886969/admin/" target="_blank">
                  <FaTwitter size={18} className="transition-transform hover:scale-125" />
                </a>
                <a
                  href="https://www.youtube.com/@SKYUPDigitalSolutionsBengaluru"
                  target="_blank"
                >
                  <FaYoutube size={18} className="transition-transform hover:scale-125"/>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/40 mt-[32px] md:mt-[40px]" />

        {/* COPYRIGHT */}
        <div className="text-center lg:text-[18px] sm:text-[13px] md:text-[15px] opacity-90 pt-[12px] md:pt-[16px]">
          © 2026 <span>vectorgraphics.com </span>
          <span className="block sm:inline">
            Designed by SKYUP Digital Solutions.
          </span>
        </div>
      </div>
    </footer>
  );
}
