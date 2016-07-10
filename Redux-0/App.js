import React from 'react';
import {connect, Provider} from 'react-redux';
import {v4} from 'node-uuid';
import {configureStore} from './configureStore'
import {Router, Route, browserHistory, Link} from 'react-router';

const makeAddTodoAction = (text) => ({
    type: "ADD_TODO",
    id: v4(),
    text
});

// --------------------------------------------------------------
// STORE LOGIC
// --------------------------------------------------------------

const todo = (actionId, actionText) => {
    return {
        id: actionId,
        text: actionText,
        completed: false
    }
};

const toggleTodo = (todosList, id) => {
    return todosList.map((todo) => {
        if (todo.id === id){
            return Object.assign({}, todo, {completed: !todo.completed});
        }
        else{
            return todo;
        }
    })
};

const todos = (state = [], action) => {
    switch(action.type){
        case "ADD_TODO":
            return [
                ...state,
                todo(action.id, action.text)
            ];
        case "TOGGLE_TODO":
            return toggleTodo(state, action.id)

        default:
            return state;
    }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch(action.type){
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
};

const getVisibleTodos = (todos, filter) => {
    switch (filter){
        case "all":
            return todos;
        case "active":
            return todos.filter((todo) => {
                if(!todo.completed)
                    return todo
            });
        case "completed":
            return todos.filter((todo) => {
                if(todo.completed)
                    return todo
            });
    }
};

const todoApp = Redux.combineReducers(
    {
        visibilityFilter,
        todos
    }
);

// --------------------------------------------------------------
// COMPONENTS LOGIC
// --------------------------------------------------------------


// LISTs

const Todo = ({onClickAction, text, completed}) => {
    return <li
        onClick={onClickAction}
        style={{textDecoration: completed ? "line-through" : "none",
                                fontWeight: completed ? "normal" : "bold"
              }}
    > {text}</li>
};

const TodoList = ({todos, onClickActivation}) => {
    return (
        <ul>
            {todos.map((todo) =>
                <Todo
                    key={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    onClickAction={() => {onClickActivation(todo.id)}}
                />
            )}
        </ul>
    )
};


const mapStateToPropsTodoList = (state, ownProps) => {  // store.getState() -- aka stuff I need from the store here
    return {
        todos: getVisibleTodos(state.todos, ownProps.filter)
    }
};
const mapDispatchToPropsTodoList = (dispatch) => {          // store.dispatch() stuff I need to dispatch there
    return {
        onClickActivation: (id) => {
            const action = {
                type: "TOGGLE_TODO",
                id
            };
            dispatch(action);
        }
    }
};
const VisibleTodoList = connect(
    mapStateToPropsTodoList,
    mapDispatchToPropsTodoList
)(TodoList);  // the next component in line


// ADD BUTTONS

let AddTodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <input ref={node => {input = node;}}/>
            <button onClick={() => {
            const action = makeAddTodoAction(input.value);
                dispatch(action);
                input.value = "";
            }}>
                Add Todo
            </button>
        </div>
    )
};
AddTodo = connect()(AddTodo);

// FOOTER

const Footer = () => {
    return (
        <p>
            Show:
            <FilterLink filter="active">
                Active |
            </FilterLink>
            <FilterLink filter="completed">
                Completed |
            </FilterLink>
            <FilterLink filter="all">
                All
            </FilterLink>
        </p>
    );
};


const FilterLink = ({filter, children}) => (
    <Link
        to={filter === "all" ? "" : filter}
        activeStyle={{
            textDecoration: "none",
            color: "black"
        }}
    >{children}</Link>
);




// MAIN COMPONENT

const TodoApp = ({params}) => { //params from the router
    return(
        <div>
            <AddTodo />
            <VisibleTodoList filter={params.filter || "all"}/>
            <Footer />
        </div>
    )
};

// --------------------------------------------------------------
// MAIN LOGIC
// --------------------------------------------------------------

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/(:filter)" component={TodoApp}/>
        </Router>
    </Provider>
);
Root.PropTypes = {
    store: React.PropTypes.object.isRequired
};


const render = () => {
    ReactDOM.render(
        <Root store={configureStore(todoApp)}/>,
        document.getElementById("app")
    )
};

render();



