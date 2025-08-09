import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../api";

function EventListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold my-2">Upcoming Events:</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <Link to={`/events/${event.slug}`}>{event.name}</Link>
            <p className="text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventListPage;
