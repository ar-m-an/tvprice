import React, {Component} from 'react';
import ProductCard from './ProductCard';
import Pagination from 'material-ui-pagination';

require('../../stylesheets/components/main_content.scss');


export default class MainContent extends React.Component {


    render() {
        let products = this.props.products.map(product => {
            return <ProductCard product={product}/>;
        });

        return (
            <div className="main-container" dir="rtl">
                <div className="card-panel">
                    <h5>محصولات</h5>
                    <hr/>
                    <div className="products-container row">
                        {products}
                    </div>
                    <div className="pagination center-align" dir="ltr">
                        {/*<Pagination current={this.props.page} total={this.props.numPages} display={5}/>*/}
                    </div>
                </div>
            </div>
        );
    }
}