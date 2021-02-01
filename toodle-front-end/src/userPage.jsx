//main page to handle user login and registration forms:
import React from "react";
import Login from "./Login";
import Register from "./Registraion";
import "./userPage.css";


class UserFields extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoginActive: true,

        };
    }

    // componentDidMount() {
    //     //Add .right by default
    //     this.rightSide.classList.add("right");
    //   }
    

    changeState(){
        const { isLoginActive } = this.state;
        //if the login page is active, so the login button on the right side
        if(isLoginActive) {
            this.RightSide.classList.remove("right");
            this.RightSide.classList.add("left");

        } else {
            this.RightSide.classList.remove("left");
            this.RightSide.classList.add("right");
        }

        this.setState((prevState) => ({ isLoginActive: !prevState.isLoginActive }));
    }

    render(){
        const {isLoginActive } = this.state;
        //this variable to check whether we are looking at the register forms or login forms
        const current = isLoginActive ? "New user? Create an account" : " Already have an account? Sign in";
        const currentActive = isLoginActive ? "Login" : "Register";
        return(
        <div className="wrapper">
            <div className="mainContainer">
                <div className="Login">
                    <div className="containerN">
                        {isLoginActive && <Login containerRef={(ref) => this.current = ref}/> }
                        {!isLoginActive && <Register containerRef={(ref) => this.current = ref}/>}
                    </div>
                    <RightSide current={current} currentActive={currentActive} containerRef={ref => this.RightSide = ref} onClick={this.changeState.bind(this)}/>
                </div>
            </div>
        </div>
        )
    }

}


const RightSide = props => {
    return (<div className="right-side" ref={props.containerRef} onClick={props.onClick}>
    <div className="inner-container">
        <div className="text" style={{color: "white"}}>{props.current}</div>
    </div>
</div>);
};

export default UserFields;