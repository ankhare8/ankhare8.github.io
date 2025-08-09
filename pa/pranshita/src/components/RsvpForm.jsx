// components/RsvpForm.jsx
import { useState, useEffect } from "react";
import { fetchEventBySlug, submitRSVP } from "../api";


function RsvpForm({ email, eventSlug, onSubmitted }) {
  const [attending, setAttending] = useState(null);
  const [guests, setGuests] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState("")

  useEffect(() => {
    async function getEvent() {
      try {
        const event = await fetchEventBySlug(eventSlug);
        console.log(event)
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
      const name = firstName + " " + lastName
      const res = await submitRSVP({
        email,
        name,
        attending,
        guests,
        eventId: event._id,
      });

      console.log(res)
      
      onSubmitted(res.rsvp);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
  <div>
    {/* <h2>Edit Your RSVP for {event.name}</h2> */}
    <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
  >
    {/* Name */}
    <div>
      <label className="block">
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
          required
          className="mt-1 block w-full rounded border px-3 py-2"
        />
      </label>

            <label className="block">
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
          required
          className="mt-1 block w-full rounded border px-3 py-2"
        />
      </label>
    </div>

    {/* Attendance */}
    <fieldset>
      <legend className="text-sm font-medium text-gray-700 mb-2">
        Will you attend?
      </legend>
      <div className="flex gap-6">
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="attending"
            value="yes"
            checked={attending === true}
            onChange={() => setAttending(true)}
            required
            className="text-gray-600 focus:ring-gray-500"
          />
          Yes
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="attending"
            value="no"
            checked={attending === false}
            onChange={() => setAttending(false)}
            className="text-gray-600 focus:ring-gray-500"
          />
          No
        </label>
      </div>
    </fieldset>

    {/* Guests */}
    {attending && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of guests:
        </label>
        <input
          type="number"
          min="1"
          max="50"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
          disabled={loading}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-100"
        />
      </div>
    )}

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading || attending === null}
      className="w-full bg-gray-600 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {loading ? "Saving..." : "Submit RSVP"}
    </button>

    {/* Error Message */}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </form>
  </div>
  
);


}

export default RsvpForm;
