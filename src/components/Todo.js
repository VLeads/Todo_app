import React, { useState } from 'react';
import '../Todo.css';
import { Button, List,ListItem,ListItemAvatar,ListItemText, Modal } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
//"./firebase" 👈 is local firebase (folder that we created firebase.js )
// "firebase" 👈 is dependancy firebase

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
const [open, setOpen] = useState(false);
const [input, setInput] = useState(props.todo.todo);

const handleOpen = () => {
    setOpen(true);
}

const updateTodo = () => {
    //update todo with new input text
    db.collection('todos').doc(props.todo.id).set({
        todo: input,
    }, { merge: true});
    setOpen(false);
}

    return (
        <>
        <Modal
        open={open}
        onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>Now do changes...</h1>
                <input  value={input} onChange={event => setInput(event.target.value) } />
               <Button onClick={updateTodo}>update Todo</Button>
            </div>
        </Modal>
       
        <List>
            <ListItem>
                <ListItemAvatar>
                    
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy deadline ⏰" />
                </ListItem>
                <Button variant="contained" style={{backgroundColor: "blue", color:"white"}} onClick={e => {setOpen(true); setInput(props.todo.todo);}}>Edit</Button>
                <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
            
        </List>
        </>
    )
}

export default Todo


