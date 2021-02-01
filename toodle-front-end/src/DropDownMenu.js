import React, { Component } from 'react';
import "./DropDownMenu.css";
// import chroma from 'chroma-js';
import Select from 'react-select';
const categories = [
    { value: 'python', label: 'python' },
    { value: 'php', label: 'php' },
    { value: 'go', label: 'go' },  

];
class DropDownMenu extends Component{
    state= {
        selectedOptions: [],
    }


    // handleMultiChange(event){
    //     //a string that would contains all the selected items
    //     const selected = [];
    //     let selectedOptions=(event.target.selectedOptions);
    //     //go throught he list of all multiselect options and push it onto our final objects
    //     for(let i = 0; i < selectedOptions.length; i++){
    //         selected.push(selectedOptions.item(i).value)
    //     }

    //     this.setState({selCategories: selected});
    // }
    //function to wrap all data topic object and send it to the backend for updates
    // handleSubmit(event){
    //     console.log(this.state.categories);
    //     event.preventDefault();
    // }

    handleChange = (selectedOptions) => {
        var options = [];
        this.setState({ selectedOptions });
        options.push(selectedOptions)
        console.log(options)
        return options
    }


    render(){          
        const { selectedOptions } = this.state;
        return(
            <div className="drop-down-menu-main-container">
                <strong>Select Category</strong>
                {/* <form onSubmit={this.getDropDownValue}> */}
                <Select isMulti value={selectedOptions} name="selected" onChange={this.handleChange} options={categories} />
                {/* {this.state.selectedOptions.map()} */}
                {/* <button onClick={() => getDropDownValue()}>Submit</button> */}
                {/* </form> */}
            </div>
        )
    }

}

export default DropDownMenu