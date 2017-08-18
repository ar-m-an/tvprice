import React, {Component} from 'react';
import Paper from 'material-ui/Paper';


require('../../stylesheets/components/product_card.scss');

export default class ProductCard extends React.Component {

    render() {
        return (
            <div className="product-card">
                <Paper>
                    <img src={this.props.product.image}/>
                    <h4>{this.props.product.title}</h4>
                </Paper>

            </div>
        )
    }
}