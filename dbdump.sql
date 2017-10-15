--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: sashavorona
--

CREATE TABLE cities (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE cities OWNER TO sashavorona;

--
-- Name: cities_city_id_seq; Type: SEQUENCE; Schema: public; Owner: sashavorona
--

CREATE SEQUENCE cities_city_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cities_city_id_seq OWNER TO sashavorona;

--
-- Name: cities_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sashavorona
--

ALTER SEQUENCE cities_city_id_seq OWNED BY cities.id;


--
-- Name: friendships; Type: TABLE; Schema: public; Owner: sashavorona
--

CREATE TABLE friendships (
    id integer NOT NULL,
    user_one_id bigint NOT NULL,
    user_two_id bigint NOT NULL,
    status smallint NOT NULL
);


ALTER TABLE friendships OWNER TO sashavorona;

--
-- Name: friendships_friendship_id_seq; Type: SEQUENCE; Schema: public; Owner: sashavorona
--

CREATE SEQUENCE friendships_friendship_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE friendships_friendship_id_seq OWNER TO sashavorona;

--
-- Name: friendships_friendship_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sashavorona
--

ALTER SEQUENCE friendships_friendship_id_seq OWNED BY friendships.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: sashavorona
--

CREATE TABLE groups (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text DEFAULT '''No description'''::text,
    owner_id integer NOT NULL
);


ALTER TABLE groups OWNER TO sashavorona;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: sashavorona
--

CREATE SEQUENCE groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE groups_id_seq OWNER TO sashavorona;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sashavorona
--

ALTER SEQUENCE groups_id_seq OWNED BY groups.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: sashavorona
--

CREATE TABLE users (
    id integer NOT NULL,
    password_hash character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    firstname character varying(55) NOT NULL,
    lastname character varying(55) NOT NULL,
    phone character varying(25) NOT NULL,
    gender smallint NOT NULL,
    city_id integer NOT NULL,
    birthdate date NOT NULL
);


ALTER TABLE users OWNER TO sashavorona;

--
-- Name: users_groups; Type: TABLE; Schema: public; Owner: sashavorona
--

CREATE TABLE users_groups (
    id integer NOT NULL,
    group_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE users_groups OWNER TO sashavorona;

--
-- Name: users_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: sashavorona
--

CREATE SEQUENCE users_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_groups_id_seq OWNER TO sashavorona;

--
-- Name: users_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sashavorona
--

ALTER SEQUENCE users_groups_id_seq OWNED BY users_groups.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: sashavorona
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO sashavorona;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sashavorona
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY cities ALTER COLUMN id SET DEFAULT nextval('cities_city_id_seq'::regclass);


--
-- Name: friendships id; Type: DEFAULT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY friendships ALTER COLUMN id SET DEFAULT nextval('friendships_friendship_id_seq'::regclass);


--
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY groups ALTER COLUMN id SET DEFAULT nextval('groups_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: users_groups id; Type: DEFAULT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY users_groups ALTER COLUMN id SET DEFAULT nextval('users_groups_id_seq'::regclass);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: sashavorona
--

COPY cities (id, name) FROM stdin;
301	Doyletown
317	Brennafort
326	Marianamouth
336	Cortneyfort
346	Ryantown
356	New Cleta
366	Lake Samaraberg
376	New Guillermo
386	Antwonhaven
201	Kundefurt
202	Stephenbury
203	Wendybury
204	Ritabury
205	South Bertram
206	Carlieberg
207	East Esmeralda
208	North Wilhelm
209	Hillston
210	South Simshire
211	Harmonybury
212	New Ariton
213	Ellaborough
214	New Fidelport
215	Maidashire
216	Hermanburgh
217	Jenkinsmouth
218	Collierfurt
219	Betsyshire
220	Port Davon
221	Lindbury
222	West Brenna
223	Lake Victoriaport
224	New Belle
225	Princeside
226	Port Marianashire
227	Port Leopold
228	Port Kyle
229	Port Novellaville
230	Kuhicville
231	Zoetown
232	Stiedemannberg
233	New Ian
234	North Jana
235	Hymanfurt
236	Gorczanychester
237	Corwintown
238	West Izaiahmouth
239	Kylerport
240	New Garnet
241	Vonhaven
242	Miachester
243	Port Giovannamouth
244	Gaymouth
245	Ryleyberg
246	Dereckfurt
247	West Leslie
248	Katlynfort
249	North Reesechester
250	Port Assunta
251	West Laviniaside
252	South Clareton
253	New Lillyburgh
254	Kautzerfurt
255	East Helga
256	South Chelseaberg
257	Port Loraine
258	Port Destany
259	Mathewshire
260	Port Libbie
261	Port Deborahbury
262	Erdmanchester
263	North Nils
264	Vickyhaven
265	Lake Helene
266	Amarahaven
267	Lenorafurt
268	Merlestad
269	North Ansleyport
270	South Annamarie
271	Kassandraland
281	New Cordellburgh
289	Adamsville
297	Babyton
302	Hilllchester
319	Nehatown
328	South Jeramy
338	Kossberg
348	New Kariton
358	South Sydnee
368	South Bernicechester
378	Schulistside
394	Camilleview
274	West Ayla
284	Laurieburgh
292	Keeleyhaven
300	Mackenziehaven
303	Haileemouth
318	Raphaelleview
327	New Earleneton
337	Herzogburgh
347	North Elodyville
357	West Anastacioview
367	O'Keefeberg
377	East Queenland
387	North Antoinette
275	West Fern
285	Elishatown
293	Jastburgh
304	Port Nola
311	Kemmerton
320	O'Haramouth
330	Port Russell
340	New Elta
350	Mauriciobury
360	Kiarraland
370	East Kristoffer
380	Cheyannechester
388	West Akeemchester
396	Predovicfort
276	Schulisthaven
286	North Lilliestad
294	Dorristown
305	Collierfurt
312	North Eusebio
321	West Lambertchester
331	East Orlando
341	Bradton
351	North Edside
361	Daishastad
371	Lake Tanya
381	Klockofort
389	Boehmville
397	East Jeniferview
273	New Mireya
283	Port Astridside
291	Port Fletcherfurt
299	Hellenbury
306	Shyanneborough
313	New Christianashire
322	East Calebbury
332	Fisherfurt
342	Port Cademouth
352	Garryburgh
362	Balistrerimouth
372	Lake Peterchester
382	Aiyanaport
390	Milanmouth
398	Torpstad
277	Owenberg
287	Hankberg
307	Tillmanborough
314	Armstrongshire
323	Khalidtown
333	South Godfrey
343	Kuvalismouth
353	New Arianna
363	East Maybelleland
373	East Diamond
383	Lake Ezequiel
391	Reganfurt
399	Zboncakberg
278	Lake Ethanland
288	Naderview
308	Dietrichmouth
315	Paucekberg
324	Sanfordchester
334	Lornaburgh
344	Jefferyfort
354	Lake Kaylahhaven
364	West Scottie
374	New Brionnaville
384	Zariahaven
392	Marianneton
400	Feeneyport
279	Jeradfurt
295	Aliyahborough
309	Port Chanceport
316	Genesisview
325	Lake Amyatown
335	West Floyd
345	Bodefurt
355	South Jonasborough
365	New Adell
375	Zeldaburgh
385	Ratkefurt
393	Goldnermouth
280	Ellisburgh
296	Travisport
310	Gerhardburgh
329	North Kendallmouth
339	Pacochaville
349	North Emilio
359	Elmoretown
369	Fishertown
379	Lake Loyce
395	Rennerside
272	Howellburgh
282	Colemanton
290	Schowalterton
298	West Kelsi
\.


--
-- Name: cities_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sashavorona
--

SELECT pg_catalog.setval('cities_city_id_seq', 400, true);


--
-- Data for Name: friendships; Type: TABLE DATA; Schema: public; Owner: sashavorona
--

COPY friendships (id, user_one_id, user_two_id, status) FROM stdin;
\.


--
-- Name: friendships_friendship_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sashavorona
--

SELECT pg_catalog.setval('friendships_friendship_id_seq', 1, false);


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: sashavorona
--

COPY groups (id, name, description, owner_id) FROM stdin;
\.


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sashavorona
--

SELECT pg_catalog.setval('groups_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: sashavorona
--

COPY users (id, password_hash, email, firstname, lastname, phone, gender, city_id, birthdate) FROM stdin;
148	$2a$10$NL0tQNANDRSb6ftrnjJ.meleqrKI7B9rXXQ17KhMp4CVKAtem6OMu	lo311121133211311g@hmail.com	pes1	barbos	1213322332335132223125	2	201	1980-12-25
174	$2a$10$QNspWob8yvPJKTgJDJG7Luch/aQxSrOI1tGAkCN5lv9/kVAF9ka86	lo213112123111g@hmail.com	pes	barbos	33513^a122212322113125	2	202	1988-12-25
178	$2a$10$0gt1T8IPvwyLBrInSHLKmuA9z3jSz6vl.y/9HCucOYw0nhU.Zvem6	lo213111g@hmail.com	pes	barbos	3351312221223122113125	2	202	1988-12-25
179	$2a$10$k1bC7Y/UPWbQRlvrXZ23luZ.hrcCqST2RQOA2WDR4xZOAYHr1v0BS	lo2131111g@hmail.com	pes	barbos	33513122212213122113125	2	202	1988-12-25
180	$2a$10$YTEINZKnJRRAYVRdtyZ7VeRSeL2HWRdrxjD55/xbTz40jcNoavUtq	lo21311111g@hmail.com	pes	barbos	335131212212213122113125	2	202	1988-12-25
141	$2a$10$Bpi.KbtYa9yubGGcJyw/xeOCs/idvwTAsrTZGIztutKh4IsawD69u	test2@gmail.com	testnameNEW	testlastnameNEW	456	2	205	1820-12-12
135	$2a$10$rykwWOcUGQAwcaDahrzbR.HpR82yh/EwpxSFdq2FoUKjiQZD5oDt.	lo313311311g@hmail.com	pes1	barbos	1	2	201	1980-12-25
1	123	loh@gmail.com	pes	barbos	1259	1	201	1970-12-25
144	$2a$10$X5MqREfjZ0qAzPBVtBku9.DqFBMWGLRocWadNoKszNEga15b7tAG6	lo31133211311g@hmail.com	pes1	barbos	12132335132223125	2	201	1980-12-25
145	$2a$10$lkFiUrFzPYIpZDIXb68Z1OkSOKk6jQU7Z4nBRghgNYVW2bSvgCy0W	lo311133211311g@hmail.com	pes1	barbos	121323335132223125	2	201	1980-12-25
146	$2a$10$ID3R3M890Jlgif5TTWtPieJp78W1/GvFqJCevD/Z11d03Lbp9tM6i	lo3111133211311g@hmail.com	pes1	barbos	1213323335132223125	2	201	1980-12-25
147	$2a$10$og0MO1yUOuuc4LVItCRH8u5z3SKoy.ROL0m8vtttrMOoj4vUClie6	lo31112133211311g@hmail.com	pes1	barbos	12133223335132223125	2	201	1980-12-25
149	$2a$10$ceS1bomP4ZZD0/YwfyLTR.M/m4k6RoUpEZsiN7XgaYBVnBMgBb3ni	lo3111231133211311g@hmail.com	pes1	barbos	12133222332335132223125	2	201	1980-12-25
150	$2a$10$2/29rzfOOwLx5WUNfcY35.9rM7eHUKBWEfpv/m7Cn.7w/5JwWQ/92	lo31111231133211311g@hmail.com	pes1	barbos	121333222332335132223125	2	201	1980-12-25
151	$2a$10$fVWtmgjWWn9Q9n7wMCes2OrTvLbZS.84Fsnci.ihbX0aumuzno0GC	lo311121231133211311g@hmail.com	pes1	barbos	1213133222332335132223125	2	201	1980-12-25
152	$2a$10$Gm1FpZaZWHeu4o8TwCm6J.NG4BZeBcOgx2uTtblh6/hLt3zoKsNOO	lo1311g@hmail.com	pes1	barbos	335132223125	2	201	1980-12-25
153	$2a$10$bsZtJ5oc1Dr42wj3AXMoaeRLJkt13xLcoXPks8gSkS3V0lnTgryBK	lo13111g@hmail.com	pes1	barbos	3351323223125	2	202	1980-12-25
154	$2a$10$icad110Cz9SHeO2mQ8obVeiOezyQ9ubqUjX2FITzCeeiUSfXaEqcy	lo133111g@hmail.com	pes	barbos	33513223223125	2	202	1980-12-25
155	$2a$10$bibuFN48Wo7SZCvHa9Uu..ZNLkL5nKdwUvPtEkwBMkWtUVGdyBicm	lo2133111g@hmail.com	pes	barbos	335132232213125	2	202	1988-12-25
160	$2a$10$qeKlrx6GBbG8ct2RMTs.lOb7sdHVpXhcVOxsn1oev0gZGgKVH0RGC	lo21313111g@hmail.com	pes	barbos	3351312232213125	2	202	1988-12-25
165	$2a$10$XmonNKRqXYWO7l.bnbm6VOKsHEP3pgjk3ujGFBIu5PUqCPpMo0G2m	lo213113111g@hmail.com	pes	barbos	33513122232213125	2	202	1988-12-25
169	$2a$10$v180MLOm/Sxp4c.BpLXuse8P5oPh.HViy4q5.awQ8DvKRe9h31Ika	lo2131123111g@hmail.com	pes	barbos	335131222322113125	2	202	1988-12-25
170	$2a$10$39oQB27FZg35XIuHZxGFae.Sg0mF.ts7vbLEYYBptZgX.qOdlAuCS	lo21311213111g@hmail.com	pes	barbos	3351312212322113125	2	202	1988-12-25
173	$2a$10$CidXt7.L/v/EvViIfYCDneVFQhVbYtp6g2P.yIbDAOcjqgUbXXL6C	lo213112113111g@hmail.com	pes	barbos	3351312212322113125	2	202	1988-12-25
\.


--
-- Data for Name: users_groups; Type: TABLE DATA; Schema: public; Owner: sashavorona
--

COPY users_groups (id, group_id, user_id) FROM stdin;
\.


--
-- Name: users_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sashavorona
--

SELECT pg_catalog.setval('users_groups_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sashavorona
--

SELECT pg_catalog.setval('users_id_seq', 180, true);


--
-- Name: cities cities_pk; Type: CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY cities
    ADD CONSTRAINT cities_pk PRIMARY KEY (id);


--
-- Name: friendships friendships_pk; Type: CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY friendships
    ADD CONSTRAINT friendships_pk PRIMARY KEY (id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_groups users_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY users_groups
    ADD CONSTRAINT users_groups_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: friendships friendships_user_one_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY friendships
    ADD CONSTRAINT friendships_user_one_id_fkey FOREIGN KEY (user_one_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: friendships friendships_user_two_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY friendships
    ADD CONSTRAINT friendships_user_two_id_fkey FOREIGN KEY (user_two_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: groups groups_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: users users_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_city_id_fkey FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL;


--
-- Name: users_groups users_groups_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY users_groups
    ADD CONSTRAINT users_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;


--
-- Name: users_groups users_groups_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sashavorona
--

ALTER TABLE ONLY users_groups
    ADD CONSTRAINT users_groups_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

