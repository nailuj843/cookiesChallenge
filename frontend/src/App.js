import './App.css';
import Header from './Header';
import TodoContainer from './todo/TodoContainer';

function App() {
  return (
    <div className="App">
      <Header/>
      <TodoContainer></TodoContainer>
      <footer>
      </footer>
    </div>
  );
}

export default App;