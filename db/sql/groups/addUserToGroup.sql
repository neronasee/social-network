INSERT INTO ${schema~}.users_groups(
  group_id,
  user_id
)
VALUES(
  ${group_id},
  ${user_id}
)
RETURNING *