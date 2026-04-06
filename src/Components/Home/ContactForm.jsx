import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else {
      const digitsOnly = formData.phone.trim().replace(/\D/g, "");
      const localNumber = digitsOnly.slice(-10);
      if (!/^[6-9]\d{9}$/.test(localNumber)) {
        newErrors.phone = "Enter a valid 10-digit number.";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please share what's on your mind.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch(
        "https://vector-graphic-backend.onrender.com/api/connect-now",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 3000);
    } catch (error) {
      setErrors({ submit: error.message || "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "NAME", type: "text" },
    { name: "email", label: "EMAIL", type: "email" },
    { name: "phone", label: "PHONE", type: "tel" },
    { name: "message", label: "WHAT'S IN YOUR MIND", type: "textarea" },
  ];

  const getInputClass = (name) =>
    [
      "bg-transparent w-full py-0 pb-1 text-sm text-gray-900 font-light tracking-wide outline-none border-b-[3px] transition-colors duration-300",
      errors[name]
        ? "border-red-500"
        : focused === name
          ? "border-red-600"
          : "border-gray-300",
    ].join(" ");

  const getLabelClass = (name) =>
    [
      "block text-[18px] leading-none transition-colors duration-300",
      errors[name]
        ? "text-red-500"
        : focused === name
          ? "text-red-600"
          : "text-gray-400",
    ].join(" ");

  return (
    <div className="flex items-center justify-center font-poppins p-10">
      {/* Outer wrapper */}
      <div className="w-full max-w-7xl relative mt-8">
        {/* Heading on top border */}
        <h1
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0
                    text-[24px] lg:text-[50px] font-bold text-gray-900 whitespace-nowrap tracking-tight
                     bg-white px-4 z-10"
        >
          Connect Us Now!
        </h1>

        {/* Full 4-side border box */}
        <div className=" border border-black  lg:w-full lg:h-[600px] py-10 lg:py-32 lg:px-16">
          {/* Card: image + form side by side */}
          <div className="flex flex-col md:flex-row h-[405px] gap-20">
            {/* Image Panel */}
            <div className="w-full md:w-2/5 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80"
                alt="Interior decor with flower vase"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Form Panel */}
            <div className="flex-1 flex flex-col px-6 justify-center">
              {submitted ? (
                <div className="text-center">
                  <div className="text-4xl text-green-500">✓</div>
                  <p className="text-gray-700 font-medium">
                    Message sent successfully!
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className={getLabelClass(field.name)}>
                        {field.label}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused(null)}
                          rows={2}
                          className={`${getInputClass(field.name)} resize-none`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused(null)}
                          className={getInputClass(field.name)}
                        />
                      )}

                      {errors[field.name] && (
                        <p className="text-[12px] text-red-500 tracking-wide">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div>
                    <button
                      onClick={handleSubmit}
                      className="bg-[#C92020] hover:bg-[#d70a0a] active:scale-95 text-white text-[20px] font-semibold tracking-widest px-9 py-1 transition-all duration-200"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
