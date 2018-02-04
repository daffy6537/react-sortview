import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortView from './sortview/index.js';
import './index.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          listA: ['A1', 'A2', 'A3', 'A4', 'A5'],
          listB: ['B1', 'B2', 'B3', 'B4', 'B5']
      };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">React-SortView</h1>
        </header>
        <div className="App-main">
            <h4 className="App-sub-title">Welcome to start to drag specific button for sort.</h4>
            <div className="Demo-box">
                <div className="Demo Demo-a">
                    <SortView
                        placeholderColor="#b8d4ff"
                        dragbtn="List-item-btn"
                        value={this.state.listA}
                        renderItem={(item, index) => (
                            <div className="List-item">
                                <span className="List-item-text">{item}</span>
                                <span className="List-item-btn">drag here!</span>
                            </div>
                        )}
                    />
                </div>
                <div className="Demo Demo-b">
                    <SortView
                        value={this.state.listB}
                        renderItem={(item, index) => (
                            <div className="List-item List-b">
                                <span className="List-item-text">{item}</span>
                                <span>drag anywhere!</span>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
