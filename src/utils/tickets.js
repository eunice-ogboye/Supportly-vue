
const STORAGE_KEY = "supportly_tickets";

// Get all tickets
export function getTickets() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Add a new ticket
export function addTicket(ticket) {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now(),
    title: ticket.title,
    description: ticket.description,
    status: ticket.status || "open",
  };
  tickets.push(newTicket);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

// Update a ticket
export function updateTicket(updatedTicket) {
  const tickets = getTickets().map((t) =>
    t.id === updatedTicket.id ? updatedTicket : t
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

// Delete a ticket
export function deleteTicket(id) {
  const tickets = getTickets().filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}
