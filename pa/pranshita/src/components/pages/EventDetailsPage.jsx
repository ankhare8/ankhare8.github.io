import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchEventBySlug } from "../../api";

function EventDetailsPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchEventBySlug(slug)
      .then(setEvent)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  console.log(event);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Event not found</p>;

  const handleRsvpClick = () => {
    navigate(`/events/${slug}/rsvp`);
  };

  return (
    <div>
      <div className="card text-center sm:text-left">
        <p className="mt-2 alice">You are invited to join us to celebrate</p>
        <h1 className="title alice text-teal-900">{event.name}</h1>
        <p>{event.description}</p>
        <p className="my-2 alice">
          {new Date(event.date).toLocaleString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            hour12: true
          })}
        </p>
        <Link to={`${event.locationLink}`} target="blank" className="location my-2 alice">{event.location}</Link>
        <br />
        <button className="border-2 p-2 w-80 sm:w-100 hover:border-teal-900 hover:bg-transparent hover:text-teal-900 mt-5 rounded bg-teal-900 text-gray-100 transition" onClick={handleRsvpClick}>RSVP <span className="move">→</span></button>      
      </div>
    </div>
    
  );
}

export default EventDetailsPage;
