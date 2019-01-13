import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'reactstrap';

const ResultsTable = props => (
  <>
    <legend>Movie Results</legend>
    <Table striped>
      <thead>
        <tr>
          <th>Title</th>
          <th>Release Date</th>
          <th>Runtime</th>
          <th>Overview</th>
          <th>Score</th>
          <th>Genres</th>
          <th>Character</th>
          <th>Actor</th>
        </tr>
      </thead>
      <tbody>
        {renderData(props.data)}
      </tbody>
    </Table>
  </>
);

function renderData(data) {
  console.log(data);
  return data.map(movie => (
    // movie_id: 11
    // title: "Star Wars"
    // release_date: "1977-05-24T23:00:00.000Z"
    // runtime: 121
    // overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.\r\n"
    // vote_average: 8.1
    // vote_count: 6778
    // genre: "Action"
    // character: "Princess Leia Organa"
    // actor: "Carrie Fisher"
    <tr>
      <td>{movie.title}</td> 
      <td>{movie.release_date.substring(0, 10)}</td>
      <td>{movie.runtime}</td>
      <td>{movie.overview}</td>
      <td>{movie.vote_average}</td>

      {/* <td>Todo, Another</td> */}
      <td>{movie.genres.join(', ')}</td>

      <td>{movie.character}</td>
      <td>{movie.actor}</td>
    </tr>
  ));
}

ResultsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ResultsTable;
