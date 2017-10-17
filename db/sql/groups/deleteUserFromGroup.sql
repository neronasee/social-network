DELETE FROM users_groups
WHERE user_id = ${user_id} AND group_id = ${group_id}
RETURNING id