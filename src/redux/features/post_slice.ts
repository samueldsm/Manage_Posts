import {createSlice} from "@reduxjs/toolkit";
import {IPost} from "@/interfaces/";

interface PostListInterface {
    posts: {arr: IPost[]}
}

const initialState: PostListInterface = {
    posts: []
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, {payload: {task, id, completed}})=>{       
            state.post.push({id, task, completed})
        },
        deleteTodo: (state, {payload: {todoId}})=>{
            state.post = state.post.filter(todo=> todo.id !== todoId)
        },
        editTodo: (state, {payload: {editedTodo}})=>{
            state.post = state.post.map(todo => todo.id === editedTodo.id ? editedTodo : todo);
        },
        toggleTodo: (state, {payload: {todoId}})=>{
            state.post = state.post.map(todo => todo.id === todoId ? {...todo, completed: !todo.completed} : todo);
        },
    }
})

export const {addTodo, deleteTodo, editTodo, toggleTodo} = todoSlice.actions;
export default todoSlice.reducer;
