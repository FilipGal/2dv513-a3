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

function getGenres(req, res, next) {
  if (!connection) { connection.connect(); }

  const sqlQuery = `SELECT name FROM Genre ORDER BY name ASC`;

  connection.query(sqlQuery, (error, result, fields) => {
    if (error) return res.send('Bad request');

    return res.send(result);
  });
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
      prepared[prepared.length - 1].genres = [prepared[prepared.length - 1].genre];
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
  const wantsToFindWithSpecificTitle = requestQuery.hasOwnProperty('title');
  const wantsToFindWithSpecificActor = requestQuery.hasOwnProperty('actor');

  const wantsToFindWithSpecificTitleAndActor = wantsToFindWithSpecificTitle && wantsToFindWithSpecificActor;

  if (wantsToFindWithSpecificTitleAndActor) {
    sqlQuery = `
      SELECT * FROM (${getAllDataQuery}) m
      WHERE
        m.actor LIKE "%${requestQuery.actor}%" AND
        m.title LIKE "%${requestQuery.title}%"
        ${filterWithGenreIfRequested(requestQuery)}
        ${filterWithRuntimeIfRequested(requestQuery)}
        ${filterWithScoreIfRequested(requestQuery)}
    `;
  } else if (wantsToFindWithSpecificTitle) {
    sqlQuery = `
      SELECT * FROM (${getAllDataQuery}) m
      WHERE m.title LIKE "%${requestQuery.title}%"
      ${filterWithGenreIfRequested(requestQuery)}
      ${filterWithRuntimeIfRequested(requestQuery)}
      ${filterWithScoreIfRequested(requestQuery)}
    `;
  } else if (wantsToFindWithSpecificActor) {
    sqlQuery = `
      SELECT * FROM (${getAllDataQuery}) m
      WHERE m.actor LIKE "%${requestQuery.actor}%"
      ${filterWithGenreIfRequested(requestQuery)}
      ${filterWithRuntimeIfRequested(requestQuery)}
      ${filterWithScoreIfRequested(requestQuery)}
    `;
  } else {
    sqlQuery = getAllDataQuery;
  }

  const wantsToFindOnlyHighestRated = requestQuery.highestRated === 'true';

  if (wantsToFindOnlyHighestRated) {
    sqlQuery = `
      SELECT *
      FROM (${sqlQuery}) m
      WHERE m.vote_average IN (
        SELECT MAX(vote_average)
        FROM (${sqlQuery}) n
      )
    `;
  }

  return sqlQuery;
}

function filterWithGenreIfRequested(requestQuery) {
  return requestQuery.hasOwnProperty('genre')
    ? `AND m.genre LIKE "%${requestQuery.genre}%"`
    : '';
}

function filterWithRuntimeIfRequested(requestQuery) {
  const isRuntimeNotRequested = !requestQuery.hasOwnProperty('runtime');
  const isRuntimeNotANumber = Number(requestQuery.runtime) === NaN;

  if (isRuntimeNotRequested || isRuntimeNotANumber) { return ''; }

  return requestQuery.radioRuntime === 'atLeast'
    ? `AND m.runtime >= "${requestQuery.runtime}"`
    : `AND m.runtime <= "${requestQuery.runtime}"`;
}

function filterWithScoreIfRequested(requestQuery) {
  const isScoreNotRequested = !requestQuery.hasOwnProperty('score');
  const isScoreNotANumber = Number(requestQuery.score) === NaN;

  if (isScoreNotRequested || isScoreNotANumber) { return ''; }

  return requestQuery.radioScore === 'atLeast'
    ? `AND m.vote_average >= "${requestQuery.score}"`
    : `AND m.vote_average <= "${requestQuery.score}"`;
}

module.exports = {
  get,
  getGenres
};
