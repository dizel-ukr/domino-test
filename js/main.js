class Dots extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let className = '';
    if(this.props.exist == 1){
      className = 'dot'
    }
    return(
      <div className={className}></div>
    )
  }
}

class Item extends React.Component{
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

class Domino extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rotation: 0,
      rotateSpeed: 0,
      firstNum: [],
      secondNum: [],
      scale: 1,
      isVisible: 'hidden'
    }

    this.rotateRight = this.rotateRight.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.generateNumber = this.generateNumber.bind(this);
    this.speedChange = this.speedChange.bind(this);
    this.zoomItem = this.zoomItem.bind(this);
    this.showAll = this.showAll.bind(this);

    this.collection = [[0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,1,0,0],[0,0,1,0,1,0,1,0,0],[1,0,1,0,0,0,1,0,1],[1,0,1,0,1,0,1,0,1],[1,0,1,1,0,1,1,0,1]];
  }

  generateNumber(){
    
    let newFirsNum = Math.floor(Math.random() * (6 - 0)) + 0;
    let newSecondNum = Math.floor(Math.random() * (6 - 0)) + 0;
    

    this.setState({
      rotation: 0,
      firstNum: this.collection[newFirsNum],
      secondNum: this.collection[newSecondNum]
    })
  }

  rotateLeft(){
    let newRotation = this.state.rotation - 45;

    if(newRotation < -360){
      newRotation = -45;
    }
    this.setState({
      rotation: newRotation
    })
  }
  rotateRight(){
    let newRotation = this.state.rotation + 45;

    if(newRotation > 360){
      newRotation = 45;
    }
    this.setState({
      rotation: newRotation
    })
  }
  speedChange(event){
    this.setState({
      rotateSpeed: event.target.value
    })
  }
  zoomItem(event){
    this.setState({
      scale: event.target.value
    })
  }
  showAll(){
    setTimeout(() => {
      this.setState({
        isVisible: ''
      })
    }, 2000)

    setTimeout(() => {
      this.setState({
        isVisible: 'hidden'
      })
    }, 5000)
  }
  componentDidMount(){
    this.generateNumber();
    this.showAll();
  }
  render(){
    let rotate = this.state.rotation,
        rotateSpeed = this.state.rotateSpeed,
        scaleItem = this.state.scale,
        firstNum = this.state.firstNum,
        secondNum = this.state.secondNum,
        visibility = this.state.isVisible;
        
    return (
      <div className="domino">
        <div className="domino__wrapper">
          <div className="domino__buttons">
            <input className="domino__button" type="button" onClick={this.rotateLeft} value="left"/>
            <input className="domino__button" type="button" onClick={this.generateNumber} value="new domino"/>
            <input className="domino__button" type="button" onClick={this.rotateRight} value="right"/>
          </div>
          <div className="domino__place">
            <div className="domino__item-wrapper"  style={{transform: `rotate(${rotate}deg) scale(${scaleItem})`, transition: `all ${rotateSpeed}s`}}>
            
              <Item
                firstSide={firstNum}
                secondSide={secondNum}
              />

            </div>
          </div>
          <div className="domino__controls">
            <label>
              <input className="domino__input-range" id="speed" type="range" min="1" max="5" step="0.5" onChange={this.speedChange}/>
              Animation speed
            </label>
            <label>
              <input className="domino__input-range" id="scale" type="range" min="1" max="1.3" step="0.05" onChange={this.zoomItem}/>
              Scale domino
            </label>
          </div>
        </div>
        <div className={"domino__all-items " + `${visibility}`} >
        {/* <input className="domino__button" type="button" onClick={this.showAll} value="right"/> */}
            {
              this.collection.map(function(el, i){
                return <Item
                          key={i}
                          firstSide={el}
                          secondSide={el}
                        />
              })
            }
        </div>
      </div>
    )
  }
}

ReactDOM.render(
    <Domino />,
    document.getElementById('root')
);