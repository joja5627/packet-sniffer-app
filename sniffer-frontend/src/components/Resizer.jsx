import React from 'react';

export default class Resizer extends React.Component {
    constructor(props) {
      super(props);
      let height = this.props.initialHeight ? this.props.initialHeight:"98%"
      let width = this.props.initialWidth ? this.props.initialWidth:"98%"
      this.state = {
        width:width,
        height:height,
        isResizing:false
      }
      this.funcResizing = this.funcResizing.bind(this)
    }
    
    funcResizing(clientX, clientY){
        // let width =   clientX - this.containerNode.offsetLeft + (16 / 2);
        // let height =  clientY - this.containerNode.offsetTop  + (16 / 2);

        this.setState({
            width:clientX,
            height:clientY
        })
   
    }
    componentDidMount(){
      window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    }
    componentWillUnmount(){
      window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
      window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    }
    onMouseDown(e) {
        
        this.setState({
            isResizing:true
        })
        this.funcResizing(e.clientX, e.clientY);
        /* */
        // console.log(e.screenX)
        // console.log(e.screenY)
        // console.log(e.currentTarget)
        // console.log(e.clientX, e.clientY)
        
    }
    onMouseMove(e) {
       if(this.state.isResizing)
            this.funcResizing(e.clientX, e.clientY);
    }
    onMouseUp(e) {
        this.setState({
            isResizing:false
        })
    }
    saveRef = ref => (this.containerNode = ref);


    render() {
     
      const container_style = {
        position:'relative',
        width:  this.state.width,
        height: this.state.height
        // border: '1px dashed black'
      }
    
      const resizer_arrow =  {
        position:'absolute',
        bottom:'5px',
        right:'7px',
        height:'10px',
        width:'10px',
        color:'white',
        borderBottom: 'solid 2px white',
        borderRight: 'solid 2px white',
        cursor:'se-resize',
    
      }
      
      const { children } = this.props;

      const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(
                child,{
                    graphHeight: this.state.height + 'px',
                    graphWidth: this.state.width + 'px',
             }));

      return (
        <div className={this.props.extraClasses}
            ref={this.saveRef}
            style={container_style}>
           {childrenWithProps}
           <div style={resizer_arrow}
                onMouseDown={this.onMouseDown.bind(this)}>
           </div>
          </div>
      );
    }
  };
  