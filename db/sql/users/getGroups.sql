SELECT 
 g.name,
 g.description,
 g.owner_id
FROM ${schema~}.users_groups AS ug
INNER JOIN ${schema~}.groups as g ON g.id = ug.group_id
WHERE ug.user_id = $1