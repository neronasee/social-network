SELECT password_hash
FROM ${schema~}.users
WHERE users.email = $1