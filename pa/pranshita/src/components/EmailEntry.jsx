import { useState, useEffect } from "react";
import { requestOTP, fetchEventBySlug } from "../api";

function EmailEntry({ eventSlug, onEmailSubmit }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState("");

  useEffect(() => {
    async function getEvent() {
      try {
        const event = await fetchEventBySlug(eventSlug);
        setEvent(event);
      } catch (err) {
        console.error("Failed to load event name", err);
      }
    }
    getEvent();
  }, [eventSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await requestOTP(email, event._id);
      onEmailSubmit(email);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  return (
    <div className="card text-center">
      <h2 className="text-lg m-0 text-teal-900">RSVP to</h2>
      <h2 className="text-2xl mb-2 alice">{event.name}</h2>
      <p className="text-sm text-slate-500 mb-6 mt-0">
        Enter your email to receive a 4-digit OTP and get RSVP details
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block text-left text-sm font-medium text-gray-700">
          Email address
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="mt-1 block w-full rounded border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition"
            placeholder="rex@gmail.com"
            autoComplete="email"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded bg-teal-900 px-4 py-3 text-white font-semibold shadow hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
      {error && (
        <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}

export default EmailEntry;
