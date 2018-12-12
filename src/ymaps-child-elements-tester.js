import React from "react";
import ReactDOM from "react-dom";

class RootComponent extends React.Component {
  constructor(props){
    super(props);
    console.log(`RootComponent: hello from constructor`);
    this.storage = {};
    this.addToStorage = this.addToStorage.bind(this);
  }
  componentDidMount(){
    console.log('RootComponent: componentDidMount');
  }
  componentDidUpdate(){
    console.log('RootComponent: componentDidUpdate');
  }
  addToStorage(message){
    console.log(`RootComponent: addToStorage before assignment to this.storage.msg, message is ${message}`)
    this.storage.msg = message;
    console.log(`RootComponent: addToStorage, message: ${message}`);
  }
  render(){
    console.log('RootComponent: render(), this.storage is', this.storage);
    return <p>Hi, guys! <ChildComponent messenger={this.addToStorage} /></p>;
  }
}

function ChildComponent(props){
  console.log('ChildComponent: hello from me!');
  props.messenger('hi there!');
  return null;
}

function App() {
  return <RootComponent />
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
