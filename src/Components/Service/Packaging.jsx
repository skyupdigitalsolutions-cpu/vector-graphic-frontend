import { div } from "framer-motion/client";

export default function Packaging() {
  const Package = [
    {
      icon: "/images/service_icon_1.svg",
      title: "Tin can Packaging",
      description:
        "Tin Can packaging is mainly made of metals and offers the best protection and durability. With the right creative mindset, we can create some of the best tin can packaging designs to make your products go off the shelves quickly!",
    },
    {
      icon: "/images/service_icon_1.svg",
      title: "Box Design",
      description:
        "Box packaging designs are among the most commonly used packaging forms across industries. It is versatile, cost-effective, and sustainable. It provides ample product protection to make your product look and feel new as ever!",
    },
    {
      icon: "/images/service_icon_1.svg",
      title: "Bottle Design",
      description:
        "Bottle packaging designs are versatile and super easy to use. Your customers can reuse it later, making it a sustainable packaging option for your business.",
    },
    {
      icon: "/images/service_icon_1.svg",
      title: "Pouch Design",
      description:
        "Pouch designs are witnessing increased adoption rates due to their versatility and customization advantages. Irrespective of your product size and shape, you can always get an eye-catching pouch design that attracts your target consumers.",
    },
  ];

  return (
    <div className="font-poppins px-[20px] lg:px-[75px] py-[50px] lg:py-[70px]">
      <h3 className="text-[24px] lg:text-[50px] font-extrabold">
        Packaging Design by material
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 lg:mt-[60px]">
        {Package.map((pack, index) => (
        <div className="w-[330px] lg:w-[300px]" key={index}>
            <div className="flex items-center mb-2">
                <img className="w-[48px] h-[48px]" src={pack.icon} alt={pack.title}/>
                <h3 className="text-[18px] font-semibold">{pack.title}</h3>
            </div>
            <div className="text-[14px] lg:text-[16px]">{pack.description}</div>
        </div>
      ))}
      </div>
    </div>
  );
}
