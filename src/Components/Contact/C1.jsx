import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ChevronDown } from "lucide-react";

/* ───────────────── TOAST ───────────────── */
const Toast = ({ message, type, visible }) => (
  <div
    style={{
      position: "fixed",
      top: "30px",
      right: "30px",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 20px",
      borderRadius: "10px",
      minWidth: "300px",
      maxWidth: "420px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "14px",
      fontWeight: 500,
      color: "#fff",
      background:
        type === "success"
          ? "linear-gradient(135deg, #16a34a, #15803d)"
          : "linear-gradient(135deg, #C92020, #991b1b)",
      border:
        type === "success"
          ? "1px solid rgba(134,239,172,0.3)"
          : "1px solid rgba(252,165,165,0.3)",
      transform: visible ? "translateX(0)" : "translateX(120%)",
      opacity: visible ? 1 : 0,
      transition:
        "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
    }}
  >
    <span style={{ fontSize: "20px", flexShrink: 0 }}>
      {type === "success" ? "✅" : "⚠️"}
    </span>
    <span>{message}</span>
  </div>
);

/* ───────────────── COMPONENT ───────────────── */
export const C1 = () => {
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  };

  const formikk = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      CompanyName: "",
      Email: "",
      YourInterest: "",
      PhoneNumber: "",
      Message: "",
      Agree: false,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: yup.object({
      FirstName: yup
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(30, "First name must be less than 30 characters")
        .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Only letters allowed")
        .required("First name is required"),
      LastName: yup
        .string()
        .trim()
        .min(1, "Last name must be at least 1 character")
        .max(30, "Last name must be less than 30 characters")
        .required("Last name is required"),
      CompanyName: yup.string().trim().max(100, "Maximum 100 characters"),
      Email: yup
        .string()
        .trim()
        .email("Enter a valid email address")
        .matches(
          /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
          "Email must end with @gmail.com",
        )
        .required("Email is required"),
      YourInterest: yup
        .string()
        .oneOf(["Design", "Printing", "Packaging"], "Select a valid interest")
        .required("Please select your interest"),
      PhoneNumber: yup
        .string()
        .required(" mobile number is required")
        .matches(/^(\+91|0)?[6-9]\d{9}$/, "Enter valid 10-digit number"),
      Message: yup
        .string()
        .trim()
        .min(5, "Minimum 5 characters")
        .max(500, "Maximum 500 characters")
        .required("Message is required"),
      Agree: yup.bool().oneOf([true], "You must accept the terms to continue"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch(
          "https://vector-graphics-backend.onrender.com/api/contacts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname: values.FirstName,
              lastname: values.LastName,
              company_name: values.CompanyName,
              email: values.Email,
              your_interest: [values.YourInterest],
              phone_number: Number(values.PhoneNumber),
              message: values.Message,
              isActive: true,
            }),
          },
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Something went wrong");

        showToast("Successfully submitted! We'll be in touch soon.", "success");
        resetForm();
      } catch (error) {
        console.error("Submit error:", error);
        showToast(
          error.message || "Something went wrong. Please try again.",
          "error",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSubmitClick = () => {
    formikk.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        showToast("Please fill all required fields correctly.", "error");
        formikk.setTouched({
          FirstName: true,
          LastName: true,
          Email: true,
          YourInterest: true,
          PhoneNumber: true,
          Message: true,
          Agree: true,
        });
      }
    });
  };

  const baseInput = {
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#111111",
    fontSize: "16px",
    fontFamily: "'Poppins', sans-serif",
    padding: "16px 20px",
    borderRadius: "6px",
    outline: "none",
    boxSizing: "border-box",
    display: "block",
    WebkitBoxShadow: "0 0 0px 1000px #ffffff inset",
  };

  const inputStyle = (field) => ({
    ...baseInput,
    border:
      formikk.touched[field] && formikk.errors[field]
        ? "1.5px solid #ff6b6b"
        : "1px solid #000000",
  });

  const labelStyle = {
    fontSize: "16px",
    color: "#ffffff",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "8px",
    display: "block",
    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
    fontWeight: "400",
    width: "100%",
  };

  const fieldStyle = { display: "flex", flexDirection: "column" };
  const errorStyle = { fontSize: "11px", color: "#ff6b6b", marginTop: "4px" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ultra&family=Poppins:wght@400;500;600&display=swap');

        .c1-section {
          width: 100%;
          overflow-x: hidden;
          background: url('/images/bg.webp') center / cover no-repeat, #181C23;
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        .c1-top-bg { width: 100%; }

        .c1-top-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 60px 24px 60px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .c1-form-bg { width: 100%;overflow: hidden;
  background: url("/images/CB.webp") right -250px / cover no-repeat; overflow: hidden;}

        .c1-form-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px 150px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .c1-heading {
          font-family: 'Ultra', serif;
          text-align: center;
          font-size: 50px;
          line-height: 1.1;
          margin: 0;
          color: #fff;
        }

        .c1-desc {
          text-align: center;
          font-size: 16px;
          color: #767676;
          max-width: 1100px;
          margin: 16px 0 0 0;
          line-height: 28px;
        }

        .c1-card-glow {
          width: 100%;
          max-width: 900px;
          border-radius: 60px;
           background: url("/images/cimage.png") right center / 105% 108% no-repeat;    
        }

        .c1-card-wrap {
        
          width: 100%;
          border-radius: 60px;
          padding: 19px;
          background: url("/images/glasseffect_2.webp") right center / 101% 105% no-repeat;
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(18px);
        }

        .c1-card {
  width: 100%;
  border-radius: 50px;
  padding: 46px 52px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
 background: rgba(20, 23, 30, 0.25);
  

}
        .c1-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 1;
  pointer-events: none;
  z-index: 0;
 
  background-repeat: repeat;
  background-size: 300px 300px;
  mix-blend-mode: overlay;
}

        .c1-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 0;
          background: transparent;
          backdrop-filter: none;
  -webkit-backdrop-filter: none;
        }

        .c1-form {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .c1-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .c1-bottom {
          display: flex;
          align-items: center;
          font-size: 18px;
          justify-content: space-between;
          margin-top: 8px;
          gap: 16px;
        }

        .c1-checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.50);
          font-size: 16px;
          cursor: pointer;
        }

        .c1-checkbox {
          width: 24px;
          height: 24px;
          accent-color: #C92020;
          flex-shrink: 0;
          cursor: pointer;
        }

        .c1-submit {
          background: #C92020;
          color: #fff;
          border: none;
          padding: 13px 44px;
          border-radius: 6px;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.15s;
        }
        .c1-submit:hover:not(:disabled) {
          background: #a81a1a;
          transform: translateY(-1px);
        }
        .c1-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        
        select.c1-inp {
          appearance: none;
            -webkit-appearance: none;
            padding-right: 40px;
           cursor: pointer;
            }
        textarea.c1-inp { resize: none; min-height: 120px; }

        /* TABLET */
        @media (max-width: 1024px) {
          .c1-heading { font-size: 44px; }
          .c1-card { border-radius: 28px; padding: 40px; }
          .c1-card-wrap { border-radius: 38px; }
          .c1-card-glow { border-radius: 40px; }
        }

        /* MOBILE */
       /* MOBILE */
/* MOBILE */
@media (max-width: 640px) {
  .c1-top-bg { background: #ffffff;}
  .c1-top-inner { padding: 50px 16px 40px 16px; }
  .c1-heading { font-size: 20px; color: #111111; font-family:'Ultra'; }
  .c1-desc {
    font-size: 14px;
    color: #767676;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    line-height: 150%;
    text-align: center;
    width: 353px;
    max-width: 100%;
  }

  .c1-form-bg { 
    background: url("/images/CB.webp") center top -400px / 145% 140% no-repeat, #181C23;
  }
  .c1-form-inner { padding: 30px 16px 60px 16px; }

  /* ✅ Remove all card wrapper styling — no black box */
  .c1-card-glow {
    border-radius: 16px;
  padding: 2px;
  
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.10) 100%
  );
  width: 100%;
  }

  .c1-card-wrap {
   border-radius: 15px;
  padding: 0;
  background: none;
  backdrop-filter: none;
  
  -webkit-backdrop-filter: none;
   background: url("/images/cimage.png")  ;
    border: 20px solid rgba(255, 255, 255, 0.1);
  }

  /* ✅ Card itself gets a subtle glass look directly */
  .c1-card {
    border-radius: 16px;
    padding: 28px 20px;
    min-height: auto;
    background: url("/images/cimage.png") center -0px / cover no-repeat;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .c1-form { gap: 20px; }

  .c1-row { grid-template-columns: 1fr; gap: 20px; }

  .c1-bottom {
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .c1-submit {
    width: 190px !important;
    height: 52px !important;
    padding: 14px 34px !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    border-radius: 6px !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important;
  }

  .c1-checkbox-label { font-size: 14px; }
}
      `}</style>

      <section className="c1-section">
        <div className="c1-top-bg">
          <div className="c1-top-inner">
            <h1 className="c1-heading">Get in touch</h1>
            <p className="c1-desc">
              Explore our gallery of completed projects across design,
              packaging, and print production. Each showcase highlights our
              attention to detail, technical accuracy, and commitment to
              delivering high-quality visual solutions for our clients.
            </p>
          </div>
        </div>

        <div className="c1-form-bg ">
          <div className="c1-form-inner">
            <div className="c1-card-glow">
              <div className="c1-card-wrap  ">
                <div className="c1-card">
                  <form
                    onSubmit={formikk.handleSubmit}
                    className="c1-form "
                    noValidate
                  >
                    {/* ROW 1 — First Name / Last Name */}
                    <div className="c1-row">
                      <div style={fieldStyle}>
                        <label htmlFor="FirstName" style={labelStyle}>
                          First Name
                        </label>
                        <input
                          id="FirstName"
                          name="FirstName"
                          type="text"
                          placeholder="Enter First Name"
                          value={formikk.values.FirstName}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                          className="c1-inp"
                          style={inputStyle("FirstName")}
                        />
                        {formikk.touched.FirstName &&
                          formikk.errors.FirstName && (
                            <span style={errorStyle}>
                              {formikk.errors.FirstName}
                            </span>
                          )}
                      </div>
                      <div style={fieldStyle}>
                        <label htmlFor="LastName" style={labelStyle}>
                          Last Name
                        </label>
                        <input
                          id="LastName"
                          name="LastName"
                          type="text"
                          placeholder="Enter Last Name"
                          value={formikk.values.LastName}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                          className="c1-inp"
                          style={inputStyle("LastName")}
                        />
                        {formikk.touched.LastName &&
                          formikk.errors.LastName && (
                            <span style={errorStyle}>
                              {formikk.errors.LastName}
                            </span>
                          )}
                      </div>
                    </div>

                    {/* ROW 2 — Company Name / Email */}
                    <div className="c1-row">
                      <div style={fieldStyle}>
                        <label htmlFor="CompanyName" style={labelStyle}>
                          Company Name
                        </label>
                        <input
                          id="CompanyName"
                          name="CompanyName"
                          type="text"
                          placeholder="Enter Company Name"
                          value={formikk.values.CompanyName}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                          className="c1-inp"
                          style={inputStyle("CompanyName")}
                        />
                        {formikk.touched.CompanyName &&
                          formikk.errors.CompanyName && (
                            <span style={errorStyle}>
                              {formikk.errors.CompanyName}
                            </span>
                          )}
                      </div>
                      <div style={fieldStyle}>
                        <label htmlFor="Email" style={labelStyle}>
                          Email
                        </label>
                        <input
                          id="Email"
                          name="Email"
                          type="email"
                          placeholder="Enter your Email"
                          value={formikk.values.Email}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                          className="c1-inp"
                          style={inputStyle("Email")}
                        />
                        {formikk.touched.Email && formikk.errors.Email && (
                          <span style={errorStyle}>{formikk.errors.Email}</span>
                        )}
                      </div>
                    </div>

                    {/* ROW 3 — Your Interest / Phone Number */}
                    <div className="c1-row">
                      <div style={fieldStyle}>
                        <label htmlFor="YourInterest" style={labelStyle}>
                          Your Interest
                        </label>
                        <div style={{ position: "relative" }}>
                          <select
                            id="YourInterest"
                            name="YourInterest"
                            value={formikk.values.YourInterest}
                            onChange={formikk.handleChange}
                            onBlur={formikk.handleBlur}
                            className="c1-inp c1-select"
                            style={{
                              ...inputStyle("YourInterest"),
                              color:
                                formikk.values.YourInterest === ""
                                  ? "#9ca3af"
                                  : "#111111",
                            }}
                          >
                            <option value="" style={{ color: "#9ca3af" }}>
                              Select
                            </option>
                            <option value="Design" style={{ color: "#111111" }}>
                              Design
                            </option>
                            <option
                              value="Printing"
                              style={{ color: "#111111" }}
                            >
                              Printing
                            </option>
                            <option
                              value="Packaging"
                              style={{ color: "#111111" }}
                            >
                              Packaging
                            </option>
                          </select>
                          <ChevronDown
                            size={18}
                            style={{
                              position: "absolute",
                              right: "16px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              pointerEvents: "none",
                              color: "#555",
                            }}
                          />
                        </div>
                        {formikk.touched.YourInterest &&
                          formikk.errors.YourInterest && (
                            <span style={errorStyle}>
                              {formikk.errors.YourInterest}
                            </span>
                          )}
                      </div>
                      <div style={fieldStyle}>
                        <label htmlFor="PhoneNumber" style={labelStyle}>
                          Phone Number
                        </label>
                        <input
                          id="PhoneNumber"
                          name="PhoneNumber"
                          type="tel"
                          placeholder="Enter your Mobile number"
                          value={formikk.values.PhoneNumber}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                          className="c1-inp"
                          style={inputStyle("PhoneNumber")}
                        />
                        {formikk.touched.PhoneNumber &&
                          formikk.errors.PhoneNumber && (
                            <span style={errorStyle}>
                              {formikk.errors.PhoneNumber}
                            </span>
                          )}
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div style={fieldStyle}>
                      <label htmlFor="Message" style={labelStyle}>
                        Message
                      </label>
                      <textarea
                        id="Message"
                        name="Message"
                        placeholder="Enter your Message here.."
                        value={formikk.values.Message}
                        onChange={formikk.handleChange}
                        onBlur={formikk.handleBlur}
                        className="c1-inp c1-textarea"
                        style={inputStyle("Message")}
                      />
                      {formikk.touched.Message && formikk.errors.Message && (
                        <span style={errorStyle}>{formikk.errors.Message}</span>
                      )}
                    </div>

                    {/* CHECKBOX + SUBMIT */}
                    <div className="c1-bottom font-poppins">
                      <div>
                        <label className="c1-checkbox-label" htmlFor="Agree">
                          <input
                            id="Agree"
                            type="checkbox"
                            name="Agree"
                            checked={formikk.values.Agree}
                            onChange={formikk.handleChange}
                            onBlur={formikk.handleBlur}
                            className="c1-checkbox"
                          />
                          I agree to allow to store and process my personal
                          data.*
                        </label>
                        {formikk.touched.Agree && formikk.errors.Agree && (
                          <span style={errorStyle}>{formikk.errors.Agree}</span>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="c1-submit"
                        disabled={formikk.isSubmitting}
                        onClick={handleSubmitClick}
                      >
                        {formikk.isSubmitting ? "Sending..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />
    </>
  );
};
