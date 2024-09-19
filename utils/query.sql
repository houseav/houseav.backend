
-- enter with user postgres
psql -U postgres

-- switch database name
\c houseavdb

-- list databases
\l 

-- list user
\du


-- check if the password is setted
SELECT rolname, rolpassword IS NOT NULL AS password_set
FROM pg_authid
WHERE rolname = 'lucas';

