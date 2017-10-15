SELECT 
  id,
  name,
  description,
  owner_id
FROM ${schema~}.groups
WHERE id = $1