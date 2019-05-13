import React from 'react';

export default class Dots extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      let className = '';
      if(this.props.exist == 1){
        className = "dot"
      }
      return(
        <div className={className}></div>
      )
    }
  }