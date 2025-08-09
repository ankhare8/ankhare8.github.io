import { useState, useEffect, useRef } from "react";
import { verifyOTP, fetchEventBySlug } from "../api";

function OtpEntry({ email, eventSlug, onVerified }) {
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputsRef = useRef([]);

  // Helper: join digits into OTP string
  const otp = otpDigits.join("");

  // Move focus on input
  const handleInput = (e, idx) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return; // allow only 1 digit number or empty

    const newDigits = [...otpDigits];
    newDigits[idx] = val;
    setOtpDigits(newDigits);

    if (val && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  // Handle backspace/delete for navigation
  const handleKeyDown = (e, idx) => {
    if (["Backspace", "Delete"].includes(e.key) && !otpDigits[idx]) {
      if (idx > 0) {
        const prevInput = inputsRef.current[idx - 1];
        prevInput.focus();
        const newDigits = [...otpDigits];
        newDigits[idx - 1] = "";
        setOtpDigits(newDigits);
      }
    }
  };

  // Handle paste of full OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(paste)) {
      const digits = paste.split("");
      setOtpDigits(digits);
      // Focus the last input or submit button
      inputsRef.current[3].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const event = await fetchEventBySlug(eventSlug);
      const res = await verifyOTP(email, otp, event._id);

      if (res.status === "existing") {
        onVerified(res.rsvp);
      } else {
        onVerified(null); // New RSVP
      }
    } catch (err) {
      setError(err.message || "Verification failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 4-digit verification code sent to {email}.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit} className="space-y-6">
        <div
          className="flex items-center justify-center gap-3"
          onPaste={handlePaste}
        >
          {[0, 1, 2, 3].map((idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              value={otpDigits[idx]}
              onChange={(e) => handleInput(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              disabled={loading}
              autoComplete="one-time-code"
              aria-label={`Digit ${idx + 1}`}
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto">
          <button
            type="submit"
            disabled={loading || otp.length < 4}
            className="w-full inline-flex justify-center whitespace-nowrap rounded bg-gray-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-gray-950/10 hover:bg-teal-900 focus:outline-none focus:ring focus:ring-gray-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-gray-300 transition-colors duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
      {/* Optional resend link */}
      {/* <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{" "}
        <a
          className="font-medium text-gray-500 hover:text-gray-600 cursor-pointer"
          onClick={handleResend}
        >
          Resend
        </a>
      </div> */}
    </div>
  );
}

export default OtpEntry;
