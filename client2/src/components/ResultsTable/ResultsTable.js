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
  return data.map(movie => (
    <tr>
      <td>{movie.title}</td> 
      <td>{movie.release_date.substring(0, 10)}</td>
      <td>{movie.runtime}</td>
      <td>{movie.overview}</td>
      <td>{movie.vote_average}</td>
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
