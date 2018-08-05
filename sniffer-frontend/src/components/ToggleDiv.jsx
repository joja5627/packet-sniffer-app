import React, { Component } from 'react';

class ToggleDiv extends React.Component {
    constructor(){
        super();
        this.state = {
             showing: false 
        };
        this.clickHandler = this.clickHandler.bind(this)
    }
    clickHandler(){
        const { showing } = this.state;
        this.setState({ showing: !showing });
    }
    render() {
        const { showing } = this.state;
        const {buttonChild,divChildren } = this.props;
        const buttonChildWithProps = 
            React.Children.map(buttonChild, (child) =>
                React.cloneElement(child,{clickHandler:this.clickHandler}));

        return (
            <div>
                {buttonChildWithProps}
                { showing 
                    ? <div>
                        {divChildren}
                    </div>
                    : null
                }
            </div>  
        )
    }
}
export default ToggleDiv