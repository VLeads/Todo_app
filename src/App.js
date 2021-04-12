import React, {
  useState, useEffect
} from 'react';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './App.css';
import db from './firebase';
import firebase from 'firebase';


function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState('');
  
//  when app loads, we need to listen to the database & fetch new todos as they get added/removed
   
// useEffect(function, dependenices);
useEffect(() => {
  // this code here... fires when app.js loads
  db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    setTodos(snapshot.docs.map(doc => ({id:doc.id, todo: doc.data().todo})))

    // in "orderBy" we're sorting our todo list based on timestamp i.e. the time todo entry added to firebase
    //  and sorting it in "desc" i.e. descending order. {"asc" used for ascending order}
  })
}, []);
 
//👆👉if "[]" is empty this function will fire one time when page refreshes. if "[input]" is given, this function useEffect will fire for every single input.

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault();  //this will stop the "REFRESH"
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');  //clear up input after clicking add todo button or enter
  }

  return ( <
    div className = "App" >
    <h1 > Hello World🚀 </h1>
    <form>
    <FormControl>
  <InputLabel>✅ Write your Todo</InputLabel>
  <Input value = {
    input
  }
  onChange = {
    event => setInput(event.target.value)
  } />
  
</FormControl>

    
    <Button disabled={!input} type="submit" onClick = {
      addTodo
    } variant="contained" color="primary">
    Add Todo
    </Button> 
    </form >

    <
    ul > {
      todos.map(todo => ( 
      <Todo todo={todo} />
      // <li > {todo} </li>
      ))
    } </ul>

    </div>
  );
}

export default App;