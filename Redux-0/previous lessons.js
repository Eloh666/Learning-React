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