import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import ProductCard from './ProductCard';
import Pagination from 'material-ui-pagination';

require('../../stylesheets/components/main_content.scss');


export default class MainContent extends React.Component {


    render() {
        let products = this.props.products.map(product => {
            return <ProductCard product={product}/>;
        });

        return (
            <div className="main-container">
                <Paper className="mui-paper">
                    Main Content
                    <hr/>
                    <div className="products-container">
                        {products}
                    </div>
                    <div className="pagination">
                        <Pagination current={this.props.page} total={this.props.numPages} display={5}/>
                    </div>
                </Paper>
            </div>
        );
    }
}