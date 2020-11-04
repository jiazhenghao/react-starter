const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}

export default {
  ROLE,
  users: [
    { id: 1, name: 'Kattie', role: ROLE.ADMIN },
    { id: 2, name: 'Sally', role: ROLE.BASIC },
    { id: 3, name: 'Joes', role: ROLE.BASIC }
  ],
  projects: [
    { id: 1, name: "Kattie's project", userId: 1 },
    { id: 2, name: "Sally's project", userId: 2 },
    { id: 3, name: "Joes's project", userId: 3 }
  ]
}
