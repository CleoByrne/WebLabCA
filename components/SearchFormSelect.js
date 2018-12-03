import React, { Component } from 'react';
import Select from 'react-select';

// Define SearchForm Class

const options = [{
    value: 'engadget',
    label: 'Engadget'
},
    {
        value: 'the-irish-times',
        label: 'The Irish Times'
    },
    {
        value: 'entertainment-weekly',
        label: 'Entertainment Weekly'
    },
    {
        value: 'espn',
        label: 'ESPN'
    },
    {
        value: 'financial-post',
        label: 'Fnancial Post'
    },
    {
        value: 'techcrunch',
        label: 'Tehnology Post'
    }
];

export default class SearchFormSelect extends Component {

// constructor accepts props and initialises state

constructor(props) {

super(props);

this.state = {
    selectedOption: ""
};

}

handleChange = (selectedOption) => {
    this.props.setNewsSource(selectedOption.value);
    console.log("Option Selected: ", selectedOption);
}

render() {

return (

<div>

{/* Search Input */}

<div id="search">

<h3 className="header">Select From News Sources</h3>

{/* Note event handler */}

<Select
          options={options}
          onChange={this.handleChange}
        />

</div>

 <style jsx> {`
  
  /* CSS for this page */
  
  `}</style>
</div>


);

}

}