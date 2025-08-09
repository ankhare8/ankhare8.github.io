import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventById } from "../api";

function RsvpDetails({ rsvp }) {
  const navigate = useNavigate();
  const [event, setEvent] = useState("");

    useEffect(() => {
      async function getEvent() {
        try {
          const event = await fetchEventById(rsvp.eventId);
          setEvent(event);
        } catch (err) {
          console.error("Failed to load event name", err);
        }
      }
      getEvent();
    }, [rsvp.eventId]);

  const handleModify = () => {
    navigate(`/events/edit/${rsvp.editToken}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg ">
        Your RSVP Details for
      </h2>
      <h2 className="text-2xl mb-4 alice mt-0">
        {event.name || "Your Event"}
      </h2>
      <p className="mb-2"><strong>Name:</strong> {rsvp.name || "Guest"}</p>
      <p className="mb-2"><strong>Email:</strong> {rsvp.email}</p>
      <p className="mb-2"><strong>Attending:</strong> {rsvp.attending ? "Yes" : "No"}</p>
      {rsvp.attending && (
        <p className="mb-4"><strong>Guests:</strong> {rsvp.guests}</p>
      )}
      <button
        onClick={handleModify}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-teal-900 transition w-100"
      >
        Modify RSVP
      </button>
    </div>
  );
}

export default RsvpDetails;
