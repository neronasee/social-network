SELECT 
  id,
  name,
  description,
  owner_id

FROM ${schema~}.groups
ORDER BY id
OFFSET ${offset} LIMIT ${limit}