import styles from './App.css';
import  TodoApp from './components/TodoApp';
import CarSellForm from './components/CarSellApp';
function App() {
  return (
    <div className={styles.App}>
      <h1>First task</h1>
      <hr/>
      <TodoApp/>
      <hr/>
      <h1>Second Task</h1>
      <hr/>
      <CarSellForm/>
   </div>
  );
}
export default App;