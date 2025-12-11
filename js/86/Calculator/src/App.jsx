
import { Component } from 'react'
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.handleClicks = this.handleClicks.bind(this)
    this.state = {
      current: '0',
      total: null,
      operator: null,
    }
  }

  handleClicks(button) {

    switch (button) {

      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          last: this.state.current,
          current: '',
          operator: button
        });
        break;

      case '=': {

        let answer = 0;
        switch (this.state.operator) {
          case '+':
            answer = Number(this.state.last) + Number(this.state.current);
            break;
          case '-':
            answer = Number(this.state.last) - Number(this.state.current);
            break;
          case '*':
            answer = Number(this.state.last) * Number(this.state.current);
            break;
          case '/':
            answer = Number(this.state.last) / Number(this.state.current);
            break;
          default:
            return;
        }
        this.setState({
          last: 0,
          current: answer.toString(),
          operator: null
        });
        break;
      }

      case 'C':
        this.setState({
          last: 0,
          current: '0',
          operator: null
        });
        break;

      default: {
        const existing = this.state.current === '0'
          ? ''
          : this.state.current;

        this.setState({
          current: existing + button
        });
      }
    }
  }

  render() {

    const Buttons = [7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '/', '.', 'C', '='].map(num => <button key={num} onClick={() => this.handleClicks(num)}>
      {num}
    </button>)


    return (
      <div className='calculator'>
        <input value={this.state.current} type="text" readOnly />

        {Buttons}

      </div>
    );
  }
}

export default App
