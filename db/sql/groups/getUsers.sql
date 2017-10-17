SELECT 
  u.id,
  u.email,
  u.firstname,
  u.lastname,
  u.phone,
  u.gender,
  u.birthdate,
  c.name AS city
FROM ${schema~}.users_groups AS ug
INNER JOIN ${schema~}.users as u ON u.id = ug.user_id
INNER JOIN ${schema~}.cities as c ON u.city_id = c.id
WHERE ug.group_id = $1
