export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

export function addUser(user) {
  const users = getUsers();
  const newUser = { ...user, id: Date.now() };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser;
}

export function findUserByEmail(email) {
  return getUsers().find(u => u.email === email);
}

export function setSession(sessionData) {
  localStorage.setItem("session", JSON.stringify(sessionData));
}

export function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

export function clearSession() {
  localStorage.removeItem("session");
}

