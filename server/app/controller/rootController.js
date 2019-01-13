const axios = require('axios');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path: 'variables.env' });

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);
connection.connect();

function get(req, res, next) {
  if (!connection) { connection.connect(); }

  const sqlQuery = generateSqlQueryFromRequestQuery(req.query);

  connection.query(sqlQuery, (error, result, fields) => {
    if (error) return res.send('Bad request');

    const preparedResult = prepareResult(result);
    return res.send(preparedResult);
  });
}

function post(req, res, next) {
  res.send('POST request');
}

function prepareResult(result) {
  const prepared = [];

  result.forEach((row, index) => {
    const isFirstItem = index === 0;
    const isNewMovie =
      !isFirstItem &&
      prepared[prepared.length - 1].movie_id !== row.movie_id;

    if (isFirstItem || isNewMovie) {
      prepared.push(row);
      prepared[prepared.length - 1].genres = [];
      delete prepared[prepared.length - 1].genre;

      return;
    }

    const isNewGenre = !prepared[prepared.length - 1].genres
      .some(genre => genre === row.genre);

    if (isNewGenre) {
      prepared[prepared.length - 1].genres.push(row.genre);
    }
  });

  return prepared.sort((a, b) => b.vote_average - a.vote_average);
}

const getAllDataQuery = `
  SELECT
    m.id AS movie_id,
    m.title,
    m.release_date,
    m.runtime,
    m.overview,
    m.vote_average,
    m.vote_count,
    cm.movie_character AS "character",
    cm.actor,
    g.name AS genre
  FROM Movie m
  JOIN CastMember cm ON cm.movie_id = m.id
  JOIN MovieGenre mg ON mg.movie_id = m.id
  JOIN Genre g ON g.id = mg.genre_id
  ORDER BY movie_id, genre, actor
`;

function generateSqlQueryFromRequestQuery(requestQuery) {
  const wantsToFindsWithSpecificTitle = requestQuery.hasOwnProperty('title');
  const wantsToFindsWithSpecificActor = requestQuery.hasOwnProperty('actor');
  const wantsToFindsWithSpecificTitleAndActor = wantsToFindsWithSpecificTitle && wantsToFindsWithSpecificActor;

  if (wantsToFindsWithSpecificTitleAndActor) {
    sqlQuery = `
      SELECT * FROM (${getAllDataQuery}) m
      WHERE
        m.actor LIKE "%${requestQuery.actor}%" AND
        m.title LIKE "%${requestQuery.title}%"
    `;
  } else if (wantsToFindsWithSpecificTitle) {
    sqlQuery = `
      SELECT * FROM (${getAllDataQuery}) m
      WHERE m.title LIKE "%${requestQuery.title}%"
    `;
  } else if (wantsToFindsWithSpecificActor) {
    sqlQuery = `
      SELECT * FROM (${getAllDataQuery}) m
      WHERE m.actor LIKE "%${requestQuery.actor}%"
    `;
  } else {
    sqlQuery = getAllDataQuery;
  }

  return sqlQuery;
}

module.exports = {
  get,
  post
};
