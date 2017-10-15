INSERT INTO ${schema~}.groups(
  name,
  description,
  owner_id
)
VALUES(
  ${name},
  ${description},
  ${owner_id}
)
RETURNING *