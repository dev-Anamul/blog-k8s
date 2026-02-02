rs.initiate({
  _id: "arc-one-rs",
  members: [
    { _id: 0, host: "mongo-master:27017", priority: 2 },
    { _id: 1, host: "mongo-slave-1:27017", priority: 1 },
    { _id: 2, host: "mongo-slave-2:27017", priority: 1 },
  ],
});

db.createUser({
  user: "root",
  pwd: "admin123",
  roles: [{ role: "dbOwner", db: "arc-one" }],
  passwordDigestor: "server",
});
