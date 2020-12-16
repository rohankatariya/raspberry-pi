import React from 'react';
import './App.css';
import axios from 'axios';

const length = [...Array(14).keys()]

class App extends React.Component {
  state = {
    selectedArray: new Array(14).fill(0).map(() => new Array(14).fill(0)),
    routes: {},
    name: ""
  }

  handleDeploy(data) {
    axios.post('https://postman-echo.com/post', data).then(res => console.log(res)).catch(err => console.log(err));
  }

  handleSave(index) {
    let name = ""
    if(this.state.name) {
      name = this.state.name
    } else {
      name = "Route " + index
    }
    const selectedArray = Object.freeze([...this.state.selectedArray]);
    this.setState({routes: {...this.state.routes, [name]: selectedArray}});
    this.setState({selectedArray: new Array(14).fill(0).map(() => new Array(14).fill(0))});
    this.setState({name: ""});
  }

  handleDelete(key) {
    const routes = this.state.routes;
    delete routes[key]
    this.setState({routes: routes});
  }

  render() {
  return (
    <div className="App">
      <div className="outerBox">
        <div className="title">title</div>
        <div className="content">
          <div>
            {
              length.map(key => {
                return <div key={key}>{
                  length.map(innerKey => {
                    return <div key={key +''+ innerKey} className={"radio " + (this.state.selectedArray[key][innerKey] === 1 ? "selected" : "unselected")} onClick={(e) => {
                      let op = Object.freeze([...this.state.selectedArray]);
                      op[key][innerKey] = (op[key][innerKey] === 0 ? 1 : 0);
                      this.setState({selectedArray: Object.freeze(op)})
                  }
                  }></div>
                })}</div>
              })
            }
            <input className="save text"
              type="text"
              placeholder="Enter Name to the route"
              onChange={(e) => this.setState({name: e.target.value})}
              value={this.state.name}
            />
            <button className="save" onClick={() => this.handleSave(Object.keys(Object.assign({}, this.state.routes)).length)}>Save</button>
            <button className="save" onClick={() => this.handleDeploy([...this.state.selectedArray])}>Deploy</button>
            <button className="save" onClick={() => this.setState({selectedArray: new Array(14).fill(0).map(() => new Array(14).fill(0))})}>Clear</button>
          </div>
          <div>
            {Object.keys(Object.assign({}, this.state.routes)).map((key, index) => {
              return <div key={index}><button className="save" onClick={() => {
                  let array = [...this.state.routes[key]];
                  this.setState({selectedArray: array})}
                }>{key}</button>
                <button className="save delete" onClick={() => this.handleDelete(key)}>X</button>
                </div>
            })}
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
