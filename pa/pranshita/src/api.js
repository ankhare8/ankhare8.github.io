const API_BASE = import.meta.env.VITE_API_BASE

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "API request failed");
  }
  return res.json();
}

// Event APIs
export async function fetchEvents() {
  return request("/events");
}

export async function fetchEventBySlug(slug) {
  return request(`/events/${slug}`);
}


export async function fetchEventById(id) {
  return request(`/events/id/${id}`);
}

export async function createEvent(eventData) {
  return request("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

export async function updateEvent(slug, updates) {
  return request(`/events/${slug}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

// OTP APIs
export async function requestOTP(email, eventId) {
  return request("/rsvps/request-otp", {
    method: "POST",
    body: JSON.stringify({ email, eventId }),
  });
}

export async function verifyOTP(email, otp, eventId) {
  return request("/rsvps/verify-otp", {
    method: "POST",
    body: JSON.stringify({ email, otp, eventId }),
  });
}

// RSVP APIs
export async function submitRSVP(rsvpData) {
  // rsvpData should include: email, attending, guests, name, eventId
  return request("/rsvps", {
    method: "POST",
    body: JSON.stringify(rsvpData),
  });
}

export async function fetchRSVPByEditToken(editToken) {
  return request(`/rsvps/edit/${editToken}`);
}
