--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (PGlite 0.2.0)
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = off;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET escape_string_warning = off;
SET row_security = off;

--
-- Name: meta; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA meta;


ALTER SCHEMA meta OWNER TO postgres;

--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: embeddings; Type: TABLE; Schema: meta; Owner: postgres
--

CREATE TABLE meta.embeddings (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    embedding public.vector(384) NOT NULL
);


ALTER TABLE meta.embeddings OWNER TO postgres;

--
-- Name: embeddings_id_seq; Type: SEQUENCE; Schema: meta; Owner: postgres
--

ALTER TABLE meta.embeddings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME meta.embeddings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: migrations; Type: TABLE; Schema: meta; Owner: postgres
--

CREATE TABLE meta.migrations (
    version text NOT NULL,
    name text,
    applied_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE meta.migrations OWNER TO postgres;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    id bigint NOT NULL,
    name text NOT NULL,
    birthdate date,
    last_modified timestamp with time zone DEFAULT now()
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.authors ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.authors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id bigint NOT NULL,
    title text NOT NULL,
    publication_year integer,
    genre text,
    author_id bigint,
    last_modified timestamp with time zone DEFAULT now()
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.books ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.books_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loans (
    id bigint NOT NULL,
    book_id bigint,
    member_id bigint,
    loan_date date DEFAULT CURRENT_DATE NOT NULL,
    return_date date,
    last_modified timestamp with time zone DEFAULT now()
);


ALTER TABLE public.loans OWNER TO postgres;

--
-- Name: loans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.loans ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.loans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    id bigint NOT NULL,
    name text NOT NULL,
    join_date date DEFAULT CURRENT_DATE NOT NULL,
    last_modified timestamp with time zone DEFAULT now()
);


ALTER TABLE public.members OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.members ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: embeddings; Type: TABLE DATA; Schema: meta; Owner: postgres
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: meta; Owner: postgres
--

INSERT INTO meta.migrations VALUES ('202407160001', 'embeddings', '2025-09-04 14:10:08.46+00');


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (1, 'Gabriel García Márquez', '1927-03-06', '2025-09-04 14:16:37.191+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (2, 'J.K. Rowling', '1965-07-31', '2025-09-04 14:16:37.191+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (3, 'George Orwell', '1903-06-25', '2025-09-04 14:16:37.191+00');


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (1, 'Cien años de soledad', 1967, 'Fiction', 1, '2025-09-04 14:16:37.191+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (2, 'Harry Potter and the Philosopher''s Stone', 1997, 'Fantasy', 2, '2025-09-04 14:16:37.191+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (3, '1984', 1949, 'Dystopian', 3, '2025-09-04 14:16:37.191+00');


--
-- Data for Name: loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.loans OVERRIDING SYSTEM VALUE VALUES (1, 1, 1, '2023-04-01', '2023-04-15', '2025-09-04 14:16:37.191+00');
INSERT INTO public.loans OVERRIDING SYSTEM VALUE VALUES (2, 2, 2, '2023-04-05', '2023-04-20', '2025-09-04 14:16:37.191+00');
INSERT INTO public.loans OVERRIDING SYSTEM VALUE VALUES (3, 3, 3, '2023-04-10', NULL, '2025-09-04 14:16:37.191+00');


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.members OVERRIDING SYSTEM VALUE VALUES (1, 'Alice Johnson', '2023-01-15', '2025-09-04 14:16:37.191+00');
INSERT INTO public.members OVERRIDING SYSTEM VALUE VALUES (2, 'Bob Smith', '2023-02-20', '2025-09-04 14:16:37.191+00');
INSERT INTO public.members OVERRIDING SYSTEM VALUE VALUES (3, 'Charlie Brown', '2023-03-10', '2025-09-04 14:16:37.191+00');


--
-- Name: embeddings_id_seq; Type: SEQUENCE SET; Schema: meta; Owner: postgres
--

SELECT pg_catalog.setval('meta.embeddings_id_seq', 1, false);


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_id_seq', 3, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 3, true);


--
-- Name: loans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loans_id_seq', 3, true);


--
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.members_id_seq', 3, true);


--
-- Name: embeddings embeddings_pkey; Type: CONSTRAINT; Schema: meta; Owner: postgres
--

ALTER TABLE ONLY meta.embeddings
    ADD CONSTRAINT embeddings_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: meta; Owner: postgres
--

ALTER TABLE ONLY meta.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: loans loans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_pkey PRIMARY KEY (id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: books books_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id);


--
-- Name: loans loans_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: loans loans_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id);


--
-- PostgreSQL database dump complete
--

