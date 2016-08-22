import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchDataFromSSB } from '../core/actions/actions';
import shortid from 'shortid';

/* We defined pairs outside the component,
 * so we can set the initialState to what componentDidMount fetches
 */
const pairs = [];
let counter = 0;

class View extends Component {
  constructor() {
    super();
    this.search = this.search.bind(this);
    this.filterByName = this.filterByName.bind(this);
    this.state = {
      data: pairs,
    };
  }

  componentDidMount() {
    const { reduxData, fetchDataFromSSB } = this.props;
    // fetch initial data
    fetchDataFromSSB(reduxData);
  }

  filterByName() {
    const { reduxData } = this.props;
    // after iterating over newState, we push the right values to the array
    const filterPair = [];
    // so we can sort by alphabetical order
    ++counter;
    reduxData.forEach((pair) => {
      let keyVal;

      /* in order to use Array.prototype.sort, we need to set the right keys
       * based on the Region
       */

      if (pair.Region === 'Hedmark') {
        keyVal = `Hedmark-${shortid.generate()}`;
      }
      if (pair.Region === 'Akershus') {
        keyVal = `Akershus-${shortid.generate()}`;
      }
      if (pair.Region === 'Oslo') {
        keyVal = `Oslo-${shortid.generate()}`;
      }
      if (pair.Region === 'Østfold') {
        keyVal = `Østfold-${shortid.generate()}`;
      }
      if (pair.Region === 'Oppland') {
        keyVal = `Oppland-${shortid.generate()}`;
      }
      if (pair.Region === 'Buskerud') {
        keyVal = `Buskerud-${shortid.generate()}`;
      }
      if (pair.Region === 'Vestfold') {
        keyVal = `Vestfold-${shortid.generate()}`;
      }
      if (pair.Region === 'Telemark') {
        keyVal = `Telemark-${shortid.generate()}`;
      }
      if (pair.Region === 'Aust-Agder') {
        keyVal = `Augst-Agder-${shortid.generate()}`;
      }
      if (pair.Region === 'Vest-Agder') {
        keyVal = `Vest-Agder-${shortid.generate()}`;
      }
      if (pair.Region === 'Rogaland') {
        keyVal = `Rogaland-${shortid.generate()}`;
      }
      if (pair.Region === 'Sogn og Fjordane') {
        keyVal = `Sogn og Fjordane-${shortid.generate()}`;
      }
      if (pair.Region === 'Møre og Romsdal') {
        keyVal = `Møre og Romsdal-${shortid.generate()}`;
      }
      if (pair.Region === 'Sør-Trøndelag') {
        keyVal = `Sør-Trøndelag-${shortid.generate()}`;
      }
      if (pair.Region === 'Nord-Trøndelag') {
        keyVal = `Nord-Trøndelag-${shortid.generate()}`;
      }
      if (pair.Region === 'Nordland') {
        keyVal = `Nordland-${shortid.generate()}`;
      }
      if (pair.Region === 'Troms-Romsa') {
        keyVal = `Troms-Romsa-${shortid.generate()}`;
      }
      if (pair.Region === 'Finnmark-Finnmárku') {
        keyVal = `Finnmark-Finnmárku-${shortid.generate()}`;
      }
      // finally, we push the pair into our array as an React component
      filterPair.push(
        <tbody key={keyVal}>
          <tr>
            <td>{pair.Region}</td>
            <td>{pair.ContentsCode}</td>
            <td>{pair.value}</td>
          </tr>
        </tbody>
      );
    });
      // Now, we can sort the array, based on the right keys
    if (counter % 2 === 0) {
      filterPair.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        }
        if (a.key < b.key) {
          return -1;
        }
        return 0;
      });
    } else {
      filterPair.sort((a, b) => {
        if (a.key > b.key) {
          return -1;
        }
        if (a.key < b.key) {
          return 1;
        }
        return 1;
      });
    }
    // set the current state to show our filtered data
    return this.setState({ data: filterPair });
  }

  search(e) {
    e.preventDefault();
    const { reduxData } = this.props;

    const searchData = [];

    /* Similar to the previous function, we show the right data,
     * based on what you search for
    */

    reduxData.forEach((pair) => {
      if (e.target.value === pair.Region) {
        searchData.push(
          <tbody key={shortid.generate()}>
            <tr>
              <td>{pair.Region}</td>
              <td>{pair.ContentsCode}</td>
              <td>{pair.value}</td>
            </tr>
          </tbody>
        );
        return this.setState({ data: searchData });
      }
      if (e.target.value === pair.ContentsCode || e.target.value === 'Variabel') {
        searchData.push(
          <tbody key={shortid.generate()}>
            <tr>
              <td>{pair.Region}</td>
              <td>{pair.ContentsCode}</td>
              <td>{pair.value}</td>
            </tr>
          </tbody>
        );
        return this.setState({ data: searchData });
      }
      if (e.target.value === pair.value || e.target.value === 'Populasjon') {
        searchData.push(
          <tbody key={shortid.generate()}>
            <tr>
              <td>{pair.Region}</td>
              <td>{pair.ContentsCode}</td>
              <td>{pair.value}</td>
            </tr>
          </tbody>
        );
        return this.setState({ data: searchData });
      }
      return true;
    });
  }

  render() {
    const { data } = this.state;
    const { reduxData } = this.props;

    if (reduxData.length === 0 || reduxData === undefined) {
      return (
        <div className="container">
          <div className="row">
            <img className="col l8 push-l1" alt="gif" src={require('../resources/gif.gif')} />
          </div>
        </div>
      );
    } else {
      reduxData.filter((element) => {
        pairs.push(
          <tbody key={shortid.generate()}>
            <tr>
              <td>{element.Region}</td>
              <td>{element.ContentsCode}</td>
              <td>{element.value}</td>
            </tr>
          </tbody>
        );
        return true;
      });
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <h4 className="col l12 push-l3">Befolkningsutvikling. Fylker, siste kvartal</h4>
        </div>
        <nav className="nav-wrapper">
          <form>
            <div className="input-field blue-grey">
              <input id="search" type="search" onChange={this.search} required />
              <label htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons" onClick={() => document.location.reload()}>close</i>
            </div>
          </form>
        </nav>
        <table className="bordered">
          <thead>
            <tr>
              <th data-field="region">Region<img
                alt="FilterNameImg"
                onClick={this.filterByName}
                style={{
                  height: 30,
                }}
                src={require('../resources/down.png')}
              />
              </th>
              <th data-field="variable">Variabel </th>
              <th data-field="population">Populasjon </th>
            </tr>
          </thead>
         {data}
        </table>
      </div>
    );
  }
  }

View.propTypes = {
  reduxData: PropTypes.array,
  fetchDataFromSSB: PropTypes.func,
  newState: PropTypes.array,
};
function mapStateToProps(state) {
  const reduxData = state.data;
  return {
    reduxData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDataFromSSB,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(View);
