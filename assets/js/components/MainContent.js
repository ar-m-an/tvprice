import React, {Component} from 'react';
import ProductCard from './ProductCard';
import UltimatePaginationMaterialUi from 'react-ultimate-pagination-material-ui';

require('../../stylesheets/components/main_content.scss');


export default class MainContent extends React.Component {

    onPageChange(page) {
        this.props.paginationUpdate(page);
        console.log(page)
    }

    render() {
        let products = this.props.products.map(product => {
            return <ProductCard product={product}/>;
        });

        return (
            <div className="main-container" dir="rtl">
                <div className="card-panel">
                    <div className="products-title">
                        <h5>محصولات</h5>
                    </div>
                    <div className="products-container row">
                        {products}
                    </div>
                    <div className="pagination center-align" dir="ltr">
                        <UltimatePaginationMaterialUi   currentPage={this.props.currentPage}
                                                        totalPages={this.props.totalPages}
                                                        onChange={this.onPageChange.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}