import React, {Component} from 'react';


require('../../stylesheets/components/product_card.scss');

export default class ProductCard extends React.Component {

    render() {
        return (
            <div className="product-card col s12 m6 l3">
                <div className="card hoverable ">
                    <div className="card-image">
                        <img src={this.props.product.image}/>

                    </div>
                    <div className="card-content">
                        <span className="">
                            <strong>{this.props.product.title}</strong>
                        </span>
                        <p>{this.props.product.price} تومان</p>
                    </div>

                    <div className="card-action left-align">
                        <a className='activator'>
                            <i className="material-icons right">more_vert</i>
                        </a>
                        <a href={this.props.product.url} target="_blank" className="btn ">خرید</a>
                    </div>
                    <div className="card-reveal">
                        <a className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></a>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>
        )
    }
}