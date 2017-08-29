import React, {Component} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from  './MainContent';
import Footer from './Footer';

import $ from 'jquery';

require('../../stylesheets/main.scss');

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {products: []};
    }

    componentWillMount() {
        // this.setState({products: this.getProducts()});
        this.getProducts();
    }

    getProducts() {
        // return [{
        //     id: 1,
        //     title: "تلويزيون ال اي دي هوشمند سامسونگ مدل 50KU7970 سايز 50 اينچ",
        //     url: "https://www.digikala.com/Product/DKP-193857/%D8%AA%D9%84%D9%88%D9%8A%D8%B2%D9%8A%D9%88%D9%86-%D8%A7%D9%84-%D8%A7%D9%8A-%D8%AF%D9%8A-%D9%87%D9%88%D8%B4%D9%85%D9%86%D8%AF-%D8%A7%D9%84-%D8%AC%D9%8A-%D9%8",
        //     price: 2334000,
        //     image: "https://file.digi-kala.com/digikala/Image/Webstore/Product/P_193857/220/LG-43UH65200GI-Smart-LED-TV-43-Inch-99c10f.jpg",
        //     "category": "tv"
        // }, {
        //     "id": 2,
        //     "title": "تلويزيون ال اي دي هوشمند سامسونگ مدل 49K6960 سايز 49 اينچ",
        //     "url": "https://www.digikala.com/Product/DKP-191279/%D8%AA%D9%84%D9%88%D9%8A%D8%B2%D9%8A%D9%88%D9%86-%D8%A7%D9%84-%D8%A7%D9%8A-%D8%AF%D9%8A-%D9%87%D9%88%D8%B4%D9%85%D9%86%D8%AF-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%",
        //     "price": 2600000,
        //     "image": "https://file.digi-kala.com/digikala/Image/Webstore/Product/P_191279/220/Samsung-49K6960-Smart-LED-TV-49-Inch-2da571.jpg",
        //     "category": "tv"
        // }];
        $.ajax({
            url: 'http://127.0.0.1:8000/api/products/',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({products: data}, function () {
                    console.log(this.state);
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    updateFilter(filters) {

    }

    render() {
        return (
            <div className="layout-container">
                <Header/>
                <div className="row">
                    <div className=" main-contetnt col s12 m9 l9">
                        <MainContent products={this.state.products} numPages={10} page={1}/>
                    </div>
                    <div className=" sidebar col s12 m3 l3">
                        <Sidebar updatedFilters={this.updateFilter.bind(this)}/>
                    </div>

                </div>
                <Footer/>
            </div>

        );
    }
}
