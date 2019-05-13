import React from 'react';
import Dots from './dots.jsx';

export default class Item extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        firstNum: this.props.firstSide,
        secondNum: this.props.secondSide
      }
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.firstSide !== prevProps.firstSide) {
        this.setState({
          firstNum: this.props.firstSide,
          secondNum: this.props.secondSide
        })
        
      }
    }
    render(){
      return (
        <div className="domino__item">
          <div className="domino__side">
          {
            this.state.firstNum.map(function(e, i){
              return <Dots key={i} exist={e}/>
            })
          }
          </div>
          <div className="domino__side">
          {
              this.state.secondNum.map(function(e, i){
                return <Dots key={i} exist={e}/>
              })
            }
          </div>
        </div>
      )
    }
  }