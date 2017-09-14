import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      recentData: [],
      alltimeData: [],
      active: 'recent'
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentWillMount() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then(raw => raw.json())
    .then(data => {
      this.setState({
        recentData: data
      })
    })

    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    .then(raw => raw.json())
    .then(data => {
      this.setState({
        alltimeData: data
      })
    })
  }

  handleSort(e) {
    let type = e.target.getAttribute('value')
    this.setState({active: type})
  }

  render() {
    let active = this.state.active
    let data = this.state.active === 'recent' ?
               this.state.recentData :
               this.state.alltimeData
    return (
      <div className="App">
        <table>
          <caption>Free Code Camp Leader Board</caption>
          <thead>
            <tr>
              <th className="num">#</th>
              <th className="col-left">Camper Name</th>
              <th className="sort"
                  onClick={this.handleSort}
                  value="alltime">
                  All time points{active === 'alltime' ? '▼' : ''}
              </th>
              <th className="sort"
                  onClick={this.handleSort}
                  value="recent">
                  Points in past 30 days{active === 'recent' ? '▼' : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, i) => {
              return(
                <tr key={i}>
                  <td className="num">{i+1}.</td>
                  <td className="col-left"><img src={val.img} alt="profile pic"/>{val.username}</td>
                  <td>{val.alltime}</td>
                  <td>{val.recent}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}


export default App;
