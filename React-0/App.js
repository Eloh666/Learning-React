import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            input: "/* add your jsx here */",
            output: "",
            err: ""
        }
        this.update = this.update.bind(this)
    }

    update(e){
        let code = e.target.value;
        try {
            this.setState({
                output: babel.transform(code, {
                    stage: 0,
                    loose: "all"
                }).code,
                err: ""
            })
        }
        catch(err){
            this.setState({
                err: err.message
            })
        }
    }

    render(){
        return(
            <div>
                <header>
                    {this.state.err}
                </header>
                <div className="container">
                <textarea
                    onChange={this.update}
                    defaultValue={this.state.input}>
                </textarea>
                <pre>
                    {this.state.output}
                </pre>
                </div>
            </div>
        )
    }
}

//class App extends React.Component {
//    constructor(){
//        super();
//        this.state = {
//            data : [
//                {id: 1, name: "Simon Bailey"},
//                {id: 2, name: "Thomas Burleson"},
//                {id: 3, name: "Will Button"},
//                {id: 4, name: "Ben Clinkinbeard"},
//                {id: 5, name: "Kent Dodds"},
//                {id: 6, name: "Trevor Ewen"},
//                {id: 7, name: "Aaron Frost"},
//                {id: 8, name: "Joel Hooks"},
//                {id: 9, name: "Jafar Husain"},
//                {id: 10, name: "Tim Kindberg"},
//                {id: 11, name: "John Lindquist"},
//                {id: 12, name: "Joe Maddalone"},
//                {id: 13, name: "Tyler McGinnis"},
//                {id: 14, name: "Scott Moss"},
//                {id: 15, name: "Robert Penner"},
//                {id: 16, name: "Keith Peters"},
//                {id: 17, name: "Lukas Ruebbelke"},
//                {id: 18, name: "Brett Shollenberger"}
//        ]}
//
//    }
//
//    render(){
//        let rows = this.state.data.map(person => <PersonRow key={person.id} data={person}/>)
//
//        return <table>
//            <tbody>{rows}</tbody>
//        </table>
//    }
//}
//
//const PersonRow = (props) => {
//    return <tr>
//        <td>{props.data.id}</td>
//        <td>{props.data.name}</td>
//    </tr>
//}

//BETTER SLIDER ------------------------------------------------
//
//class App extends React.Component {
//    constructor(){
//        super();
//        this.update = this.update.bind(this)
//        this.state = {
//            red : 0
//        }
//    }
//
//    update(){
//        this.setState({
//            red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value
//        })
//    }
//
//    render(){
//        return(
//            <div>
//                <NumInput
//                    ref="red"
//                    update={this.update}
//                    min={0}
//                    max={255}
//                    val={+this.state.red}
//                    type="number"
//                    label="it's on"
//                />
//            </div>
//        )
//    }
//}
//
//class NumInput extends React.Component {
//    constructor(){
//        super();
//    }
//
//    render(){
//     let label = this.props.label !== "" ?
//     <label>{this.props.label} - {this.props.val}</label> : <label>Enter a fucking label pls</label>
//        return(
//            <div>
//                <input
//                    min = {this.props.min}
//                    max = {this.props.max}
//                    val = {this.props.val}
//                    step = {this.props.step}
//                    type = {this.props.type}
//                    ref = "inp"
//                    onChange={this.props.update}
//                />
//                <h1>{label}</h1>
//            </div>
//        )
//    }
//}
//
//NumInput.propTypes = {
//    min: React.PropTypes.number,
//    max: React.PropTypes.number,
//    step: React.PropTypes.number,
//    val: React.PropTypes.number,
//    label: React.PropTypes.string,
//    update: React.PropTypes.func.isRequired,
//    type: React.PropTypes.oneOf(["number","range"])
//};
//
//NumInput.defaultProps = {
//    min: 0,
//    max: 255,
//    step: 1,
//    val: 0,
//    label: "",
//    type: "range"
//};


// HO COPONENTS ------------------------------------------------
//
//let Mixin = InnerComponent => class extends React.Component {
//
//    constructor(){
//        super();
//        this.update = this.update.bind(this);
//        this.state = {
//            val : 0,
//            txt : "Button"
//        };
//    };
//
//    update(){
//        this.setState({
//            val: this.state.val +1
//        })
//    }
//
//    render(){
//        return (
//            <InnerComponent
//                update={this.update}
//                {...this.state}
//                {...this.props}
//            />
//        )
//    }
//};
//
//let Button = (props) => (<button onClick={props.update}>{props.txt} - {props.val}</button>);
//let Label = (props) => (<label onMouseMove={props.update}>{props.txt}: {props.val}</label>)
//
//let MixedButton = Mixin(Button);
//let MixedLabel = Mixin(Label)
//
//class App extends React.Component {
//    render(){
//        return(
//            <div>
//                <MixedButton txt="First Button"/>
//                <MixedLabel txt="  Label"/>
//            </div>
//        )}
//}


//COMPONENT MOUNTING -------------------------------------------
//
//class App extends React.Component {
//    constructor(){
//        super();
//        this.state = {
//            val: 0
//        };
//        this.update = this.update.bind(this);
//    }
//
//    update(){
//        this.setState({
//                val: this.state.val +1
//            })
//    }
//
//    componentWillMount(){
//        this.setState({
//            m: 2
//        })
//    }
//
//    render(){
//        return (
//            <div>
//                <h1>{this.state.val * this.state.m}</h1>
//                <button onClick={this.update}>Click Me</button>
//            </div>
//        )
//    }
//
//    componentDidMount(){
//        this.inc = setInterval(this.update, 500);
//    }
//
//    componentWillUnmount(){
//        clearInterval(this.inc);
//    }
//
//}
//
//class Wrapper extends React.Component {
//    constructor(){
//        super();
//    }
//    mount(){
//        ReactDOM.render(<App/>, document.getElementById("a"));
//    };
//    unmount(){
//        ReactDOM.unmountComponentAtNode(document.getElementById("a"));
//    }
//    render(){
//        return (
//            <div>
//                <button onClick={this.mount.bind(this)}>Mount</button>
//                <button onClick={this.unmount.bind(this)}>Unmount</button>
//                <div id="a"></div>
//            </div>
//        )
//    }
//}


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



export default App