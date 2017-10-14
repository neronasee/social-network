SELECT 
  users.id,
  users.email,
  users.firstname,
  users.lastname,
  users.phone,
  users.gender,
  users.city_id,
  users.birthdate,
  cities.name AS city

FROM ${schema~}.users
INNER JOIN ${schema~}.cities ON users.city_id = cities.id
ORDER BY id
OFFSET ${offset} LIMIT ${limit}