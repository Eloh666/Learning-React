import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';

let nextTodoId = 0;
const makeAddTodoAction = (text) => {
  return {
      type: "ADD_TODO",
      id: nextTodoId++,
      text
  }
};

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
        case "SHOW_ALL":
            return todos;
        case "SHOW_ACTIVE":
            return todos.filter((todo) => {
                if(!todo.completed)
                    return todo
            });
        case "SHOW_COMPLETED":
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


const mapStateToPropsTodoList = (state) => {  // store.getState() -- aka stuff I need from the store here
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
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
            <FilterLink filter="SHOW_ACTIVE">
                Active |
            </FilterLink>
            <FilterLink filter="SHOW_COMPLETED">
                Completed |
            </FilterLink>
            <FilterLink filter="SHOW_ALL">
                All
            </FilterLink>
        </p>
    );
};

const Link = ({active, children, onClickAction}) => {
    if(active){
        return(
            <span>{children}</span>
        )
    }
    return(
        <a href="#"
           onClick={(e) => {onClickAction(); e.preventDefault();}}
        >
            {children}
        </a>
    )
};

const mapStateToPropsFooter = (state, props) => {
    return {
        active : props.filter === state.visibilityFilter
    }
};
const mapDispatchToPropsFooter = (dispatch, props) => {
    return {
        onClickAction: () => {
        dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: props.filter
        })
    }}
};
const FilterLink = connect(
    mapStateToPropsFooter,
    mapDispatchToPropsFooter
)(Link);

// MAIN COMPONENT

const TodoApp = () => {
    return(
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    )
};

// --------------------------------------------------------------
// MAIN LOGIC
// --------------------------------------------------------------

const render = () => {
    ReactDOM.render(<Provider
        store = {Redux.createStore(todoApp)}
    >
        <TodoApp/>
    </Provider>,
        document.getElementById("app"));
};
render();


// TESTS -------------------------------------------------------

// const testAddTodo = () => {
//     const stateBefore = [];
//     const action = {
//         type: "ADD_TODO",
//         id: 0,
//         text: "Learn Redux"
//     };
//     const stateAfter = [
//         {
//             id: 0,
//             text: "Learn Redux",
//             completed: false
//         }
//     ]
//
//     deepFreeze(stateBefore);
//
//     expect(todos(stateBefore, action)).toEqual(stateAfter);
// };
//
// const testToggleTodo = () => {
//     const stateBefore = [
//         {
//             id: 0,
//             text: "Learn Redux",
//             completed: false
//         },
//         {
//             id: 1,
//             text: "Go Shopping",
//             completed: false
//         }
//     ];
//     const stateAfter = [
//         {
//             id: 0,
//             text: "Learn Redux",
//             completed: false
//         },
//         {
//             id: 1,
//             text: "Go Shopping",
//             completed: true
//         }
//     ];
//
//     const action = {
//         type: "TOGGLE_TODO",
//         id: 1
//     };
//
//     deepFreeze(stateBefore);
//
//     expect(todos(stateBefore, action)).toEqual(stateAfter);
// };

// TESTS EZ ----------------------------------------------------

// const addCounter = (list) => {
//     return [...list, 0]
// };
//
// const removeCounter = (list, index) => {
//     return [...list.slice(0,index), ...list.slice(index +1, list.legnth)];
// };
//
// const incrementCounter = (list, index) => {
//     return [...list.slice(0, index), list[index]+1, ...list.slice(index+1, list.length)];
// };
//
// const toggleTodo = (objectBefore) => {
//     return Object.assign({}, objectBefore, {completed: !objectBefore.completed})
//     // return {...objectBefore, !objectBefore.completed}
// };


// const testAddCounter = () => {
//     const listBefore = [];
//     const listAfter = [0];
//
//     deepFreeze(listBefore);
//
//     expect(addCounter(listBefore)).toEqual(listAfter);
//
// };
//
// const testRemoveCounter = () => {
//     const listBefore = [0,1,2];
//     const listAfter = [0,2];
//     deepFreeze(listBefore);
//
//     expect(removeCounter(listBefore, 1)).toEqual(listAfter);
// };
//
// const testIncrementCounter = () => {
//     const listBefore = [1,2,3,4,5];
//     const listAfter = [1,2,3,5,5];
//
//     deepFreeze(listBefore);
//
//     expect(incrementCounter(listBefore, 3)).toEqual(listAfter);
// };
//
// const testToggleTodo = () => {
//     const todoBefore = {
//         id: 0,
//         text: "Learn Redux",
//         completed: false
//     };
//     const todoAfter = {
//         id: 0,
//         text: "Learn Redux",
//         completed: true
//     };
//
//     expect(toggleTodo(todoBefore)).toEqual(todoAfter);
// };
// testAddCounter();
// testRemoveCounter();
// testIncrementCounter();
// testToggleTodo();

// COUNTER -----------------------------------------------------
//
// const counter = (state = 0, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }
//
// const Counter = ({
//     value,
//     onIncrement,
//     onDecrement
// }) => (
//     <div>
//         <h1>{value}</h1>
//         <button onClick={onIncrement}>+</button>
//         <button onClick={onDecrement}>-</button>
//     </div>
// );
//
// const { createStore } = Redux;
// const store = createStore(counter);
//
// const render = () => {
//     ReactDOM.render(
//         <Counter
//             value={store.getState()}
//             onIncrement={() =>
//         store.dispatch({
//           type: 'INCREMENT'
//         })
//       }
//             onDecrement={() =>
//         store.dispatch({
//           type: 'DECREMENT'
//         })
//       }
//         />,
//         document.getElementById('app')
//     );
// };
//
//
// store.subscribe(render);
// render();
