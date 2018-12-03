import React, { Component } from 'react';

// import page components
import Meta from '../components/Meta';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Build the page template from components
class Page extends Component {
    render() {
        return (
            <div className="page">
                {/* Content to output*/}
                <Meta />
                <Header />
                <Nav />
                {/* Render props passed to this Component */}
                {this.props.children}
                <Footer />
                <style jsx> {`
                    .page{
                        background-color:#004d4d; 
                        padding:0.2em,0.2em,0em,0.2em;
                        
                    }
                    
            
                 `}</style>
            </div> 
        );
    }
}

export default Page;

