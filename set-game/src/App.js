import './App.css';
import { Colors, Shadings, Symbols } from './components/interfaces';
import { Shape } from './components/shape/Shape';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Shape symbol={Symbols.SQUIGGLE} color={Colors.PURPLE} shading={Shadings.STRIPED} />
      </header>
    </div>
  );
}

export default App;
