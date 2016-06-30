import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            val: 0
        };
        this.update = this.update.bind(this);
    }

    update(){
        this.setState({
                val: this.state.val +1
            })
    }

    render(){
        return (
            <div>
                <h1>{this.state.val}</h1>
                <button onClick={this.update}>Click Me</button>
            </div>
        )
    }
}

class Wrapper extends React.Component {
    constructor(){
        super();
    }
    mount(){
        ReactDOM.render(<App/>, document.getElementById("a"));
    };
    unmount(){
        ReactDOM.unmountComponentAtNode(document.getElementById("a"));
    }
    render(){
        return (
            <div>
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>Unmount</button>
                <div id="a"></div>
            </div>
        )
    }
}


// SUBCOMPs ----------------------------------------------------

//class App extends React.Component {
//    render(){
//        return  <Button>I <Heart></Heart>React</Button>
//    }
//}
//
//class Button extends React.Component {
//    render(){
//        return <button>{this.props.children}</button>
//    }
//}
//
//const Heart = () => (
//    <span>LOVE </span>
//)


// SLIDERS ----------------------------------------------------

//class App extends React.Component {
//    constructor(){
//        super();
//        this.state = {
//            red : 128,
//            green : 128,
//            blue : 128
//        }
//        this.update = this.update.bind(this)
//    }
//    update(e){
//        this.setState({
//            red : ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
//            green : ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
//            blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
//        })
//    }
//
//    render(){
//        return (
//            <div>
//                <Slider ref="red" update={this.update}  />
//                <h1>{this.state.red}</h1>
//                <Slider ref="green" update={this.update}  />
//                <h1>{this.state.green}</h1>
//                <Slider ref="blue" update={this.update}  />
//                <h1>{this.state.blue}</h1>
//            </div>
//        );
//    }
//}
//
//class Slider extends React.Component {
//    render(){
//        return (
//           <div>
//               <input
//                   ref="inp"
//                   type="range"
//                   min="0"
//                   max="255"
//                   onChange={this.props.update}
//               />
//           </div>
//        );
//    }
//}

// PROPS ------------------------------------------------------

//App.propTypes = {
//    cat: React.PropTypes.number.isRequired,
//    txt: React.PropTypes.string
//};
//
//App.defaultProps = {
//    txt: "somethingSomething"
//};
//



export default Wrapper