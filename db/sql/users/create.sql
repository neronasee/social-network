INSERT INTO ${schema~}.users(
  password_hash,
  email,
  firstname,
  lastname,
  phone,
  gender,
  city_id,
  birthdate
)
VALUES(
  ${password_hash},
  ${email},
  ${firstname},
  ${lastname},
  ${phone},
  ${gender},
  ${city_id},
  ${birthdate}
)
RETURNING id, email