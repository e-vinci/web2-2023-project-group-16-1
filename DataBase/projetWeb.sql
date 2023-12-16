DROP SCHEMA IF EXISTS projetWeb CASCADE;
CREATE SCHEMA projetWeb;

--Creat table

CREATE TABLE projetWeb.users
(
    id_user  SERIAL PRIMARY KEY  NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL CHECK ( users.username <> ' '),
    email    VARCHAR(255) UNIQUE NOT NULL CHECK ( users.email LIKE '%@%' ),
    mdp_hash VARCHAR(255)        NOT NULL CHECK ( users.mdp_hash <> ' ' )
);

CREATE TABLE projetWeb.influencers
(
    id_influencer SERIAL PRIMARY KEY,
    nom           VARCHAR(255) UNIQUE NOT NULL CHECK (influencers.nom <> ' '),
    description   VARCHAR(255)        NOT NULL CHECK (influencers.description <> ' ')
);

CREATE TABLE projetWeb.platforms
(
    id_platform SERIAL PRIMARY KEY,
    nom         VARCHAR(255) UNIQUE NOT NULL CHECK (platforms.nom <> ' ')
);

CREATE TABLE projetWeb.urls
(
    id_url      SERIAL PRIMARY KEY,
    url         VARCHAR(255),
    influenceur INTEGER REFERENCES projetWeb.influencers (id_influencer),
    platform    INTEGER REFERENCES projetWeb.platforms (id_platform),
    UNIQUE (influenceur, platform)
);

CREATE TABLE projetWeb.subscriptions
(
    id_user INTEGER REFERENCES projetWeb.users (id_user),
    url     INTEGER REFERENCES projetWeb.urls (id_url),
    PRIMARY KEY (id_user, url)
);

-- view
CREATE OR REPLACE VIEW projetWeb.allInfluencers AS
SELECT i.id_influencer, i.nom
FROM projetWeb.influencers i
ORDER BY (i.nom);

CREATE OR REPLACE VIEW projetWeb.allPlatforms AS
SELECT p.nom
FROM projetWeb.platforms p
ORDER BY (p.nom);

CREATE OR REPLACE VIEW projetWeb.listSubscription AS
SELECT us.id_user, ur.url, p.nom AS platform, i.nom AS influencer
FROM projetWeb.users us,
     projetWeb.subscriptions s,
     projetWeb.urls ur,
     projetWeb.platforms p,
     projetWeb.influencers i
WHERE us.id_user = s.id_user
  AND s.url = ur.id_url
  AND ur.influenceur = i.id_influencer
  AND ur.platform = p.id_platform
ORDER BY s.id_user, i.nom, p.nom;

CREATE OR REPLACE VIEW projetWeb.infoInfluencer AS
SELECT i.id_influencer, i.nom AS influencer, i.description, p.nom AS platform
FROM projetWeb.influencers i,
     projetWeb.urls u,
     projetWeb.platforms p
WHERE u.influenceur = i.id_influencer
  AND u.platform = p.id_platform
ORDER BY i.nom, p.nom;

CREATE OR REPLACE VIEW projetWeb.userAuth AS
SELECT u.id_user, u.email, u.username, u.mdp_hash
FROM projetWeb.users u;

-- function
CREATE OR REPLACE FUNCTION projetWeb.register(_username VARCHAR(255),
                                              _email VARCHAR(255),
                                              _password VARCHAR(255)) RETURNS INTEGER AS
$$
DECLARE
    _id_user INTEGER;
BEGIN
    INSERT INTO projetWeb.users(id_user, username, email, mdp_hash)
    VALUES (DEFAULT, _username, _email, _password)
    RETURNING projetWeb.users.id_user INTO _id_user;

    return _id_user;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION projetWeb.subscribeTo(_id_user INTEGER,
                                                 _influencer_name VARCHAR(255),
                                                 _platform_name VARCHAR(255)) RETURNS INTEGER AS
$$
DECLARE
    _id_influencer INTEGER;
    _id_platform   INTEGER;
    _id_url        INTEGER;
BEGIN

    IF NOT EXISTS(SELECT i.id_influencer
                  FROM projetWeb.influencers i
                  WHERE i.nom = _influencer_name) THEN
        RAISE 'nom influencer invalide';
    END IF;

    SELECT i.id_influencer
    INTO _id_influencer
    FROM projetWeb.influencers i
    WHERE i.nom = _influencer_name;

    IF NOT EXISTS(SELECT p.id_platform
                  FROM projetWeb.platforms p
                  WHERE p.nom = _platform_name) THEN
        RAISE 'nom invalide';
    END IF;

    SELECT p.id_platform
    INTO _id_platform
    FROM projetWeb.platforms p
    WHERE p.nom = _platform_name;

    SELECT u.id_url
    INTO _id_url
    FROM projetWeb.urls u
    WHERE u.platform = _id_platform
      AND u.influenceur = _id_influencer;

    IF NOT EXISTS(SELECT u.id_user
                  FROM projetWeb.users u
                  WHERE u.id_user = _id_user) THEN
        RAISE 'user invalide';
    END IF;

    INSERT INTO projetWeb.subscriptions(id_user, url)
    VALUES (_id_user, _id_url);

    RETURN _id_url;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION projetWeb.unSubscribe(_id_user INTEGER,
                                                 _influencer_name VARCHAR(255),
                                                 _platform_name VARCHAR(255)) RETURNS BOOLEAN AS
$$
DECLARE
    _id_influencer INTEGER;
    _id_platform   INTEGER;
    _id_url        INTEGER;
BEGIN

    IF NOT EXISTS(SELECT i.id_influencer
                  FROM projetWeb.influencers i
                  WHERE i.nom = _influencer_name) THEN
        RAISE 'nom influencer invalide';
    END IF;

    SELECT i.id_influencer
    INTO _id_influencer
    FROM projetWeb.influencers i
    WHERE i.nom = _influencer_name;

    IF NOT EXISTS(SELECT p.id_platform
                  FROM projetWeb.platforms p
                  WHERE p.nom = _platform_name) THEN
        RAISE 'nom invalide';
    END IF;

    SELECT p.id_platform
    INTO _id_platform
    FROM projetWeb.platforms p
    WHERE p.nom = _platform_name;

    SELECT u.id_url
    INTO _id_url
    FROM projetWeb.urls u
    WHERE u.platform = _id_platform
      AND u.influenceur = _id_influencer;

    IF NOT EXISTS(SELECT u.id_user
                  FROM projetWeb.users u
                  WHERE u.id_user = _id_user) THEN
        RAISE 'user invalide';
    END IF;

    DELETE
    FROM projetWeb.subscriptions su
    WHERE su.id_user = _id_user
      AND su.url = _id_url;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION projetWeb.deleteUser(_id_user INTEGER) RETURNS BOOLEAN AS
$$
DECLARE
BEGIN
    IF NOT EXISTS(SELECT u.id_user
                  FROM projetWeb.users u
                  WHERE u.id_user = _id_user) THEN
        RAISE 'user invalide';
    END IF;

    DELETE
    FROM projetWeb.users u
    WHERE u.id_user = _id_user;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- trigger

CREATE OR REPLACE FUNCTION projetWeb.deleteUserInfo() RETURNS TRIGGER AS
$$
DECLARE
BEGIN
    DELETE
    FROM projetWeb.subscriptions su
    WHERE su.id_user = OLD.id_user;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER triggerDelete
    BEFORE DELETE
    ON projetWeb.users
    FOR EACH ROW
EXECUTE PROCEDURE projetWeb.deleteUserInfo();

-- insert
INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Ninja',
        'Professional gamer, streamer, and esports personality - Known for Fortnite, Valorant, and Halo - Founder @TeamNinja');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Auronplay',
        'Spanish YouTuber, Twitch streamer, and content creator - Comedy and commentary content - Popular for his humorous approach to trending topics');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Ibai',
        'Spanish streamer, content creator, and entrepreneur - Owner of @G2esports - Hosts Ibai Llanos Show on Twitch - Engages with gaming and entertainment');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Rubius',
        'Spanish YouTuber, Twitch streamer, and social media influencer - Known for gaming, vlogs, and collaborations - Founder @VirtualHero');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'xQc',
        'Canadian Twitch streamer, content creator, and former professional Overwatch player - Engages in a variety of games and IRL content');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'TheGrefg',
        'Spanish YouTuber, Twitch streamer, and professional gamer - Known for Fortnite and a variety of games - Holds the record for most concurrent Twitch viewers');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Tfue',
        'American Twitch streamer, YouTuber, and professional Fortnite player - Former FaZe Clan member - Known for high-level gameplay and entertaining content');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Juansguarnizo',
        'Colombian YouTuber, Twitch streamer, and content creator - Known for gaming, vlogs, and comedy content - Popular in the Spanish-speaking gaming community');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Shroud',
        'Canadian Twitch streamer and former professional CS:GO player - Known for exceptional first-person shooter (FPS) gameplay - Co-owner @madrinas');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Pokimane',
        'Moroccan-Canadian Twitch streamer and YouTuber - Variety streamer with a focus on gaming and IRL content - Member of OfflineTV');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Gotaga',
        'French professional esports player, Twitch streamer, and content creator - Former professional Call of Duty player - Founder @GotagaTV');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Domingo',
        'French YouTuber, Twitch streamer, and entrepreneur - Founder of @LeStream - Known for gaming content, podcasts, and collaborations');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'Zerator',
        'French gaming icon and content creator - Renowned Twitch streamer with a passion for a variety of games - Founder of the Z Event charity marathon, raising funds for noble causes');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'MisterMV',
        'Versatile French content creator and live streamer - Expert in retro and indie games - Known for his engaging and entertaining streams, blending humor and gaming expertise');

INSERT INTO projetWeb.influencers(id_influencer, nom, description)
VALUES (DEFAULT, 'AlphaCast', 'Compte de secours AlphaCast');

INSERT INTO projetWeb.platforms(id_platform, nom)
VALUES (DEFAULT, 'Twiter / X');

-- User 1
INSERT INTO projetWeb.users(id_user, username, email, mdp_hash)
VALUES (DEFAULT, 'john_doe', 'john.doe@email.com', '$2a$10$3k9iGHAGLw7wTT.g95gCF.p0Gp4ymcAobR.XJYqAstDb7Aa8gw9um');

-- User 2
INSERT INTO projetWeb.users(id_user, username, email, mdp_hash)
VALUES (DEFAULT, 'jane_smith', 'jane.smith@email.com', '$2a$10$3k9iGHAGLw7wTT.g95gCF.p0Gp4ymcAobR.XJYqAstDb7Aa8gw9um');

INSERT INTO projetWeb.urls(id_url, url, influenceur, platform)
VALUES (DEFAULT, 'https://twitter.com/Ninja', 1, 1);

INSERT INTO projetWeb.urls(id_url, url, influenceur, platform)
VALUES (DEFAULT, 'https://twitter.com/auronplay', 2, 1);

INSERT INTO projetWeb.urls(id_url, url, influenceur, platform)
VALUES (DEFAULT, 'https://twitter.com/Ibai', 3, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/Rubius', 4, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/xQc', 5, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/TheGrefg', 6, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/Tfue', 7, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/JuanSGuarnizo', 8, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/shroud', 9, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/pokimanelol', 10, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/Gotaga', 11, 1);

INSERT INTO projetWeb.urls(url, influenceur, platform)
VALUES ('https://twitter.com/Domingo', 12, 1);

INSERT INTO projetWeb.urls(id_url, url, influenceur, platform)
VALUES (DEFAULT, 'https://twitter.com/ZeratoR', 13, 1);

INSERT INTO projetWeb.urls(id_url, url, influenceur, platform)
VALUES (DEFAULT, 'https://twitter.com/mistermv', 14, 1);

INSERT INTO projetWeb.urls(id_url, url, influenceur, platform)
VALUES (DEFAULT, 'https://twitter.com/AlphaCastFR2', 15, 1);

INSERT INTO projetWeb.subscriptions(id_user, url)
VALUES (1, 1);

INSERT INTO projetWeb.subscriptions(id_user, url)
VALUES (1, 2);

INSERT INTO projetWeb.subscriptions(id_user, url)
VALUES (1, 3);

INSERT INTO projetWeb.subscriptions(id_user, url)
VALUES (1, 4);

INSERT INTO projetWeb.subscriptions(id_user, url)
VALUES (2, 1);

INSERT INTO projetWeb.subscriptions(id_user, url)
VALUES (2, 2);

INSERT INTO projetWeb.subscriptions(id_user, url)
VALUES (2, 3);