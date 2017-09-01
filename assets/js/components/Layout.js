import React, {Component} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from  './MainContent';
import Footer from './Footer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import $ from 'jquery';

require('../../stylesheets/main.scss');

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            filterValues: {},
            totalPages: 10,
            currentPage: 1,
            productPerPage: 20
        };

        this.filterProps = {
            minPrice: 0,
            maxPrice: 30000000,
            minSize: 29,
            maxSize: 78,
            brands: ['SAMSUNG', 'LG', 'SONY', 'PANASONIC', 'PHILIPS']
        }
    }

    componentWillMount() {
        this.getProducts(1, {port: 'all'});
    }

    getProducts(page, filters) {
        let ajaxData = filters;
        ajaxData['page'] = page;
        ajaxData['productPerPage'] = this.state.productPerPage;

        $.ajax({
            url: 'http://127.0.0.1:8000/api/products/',
            dataType: 'json',
            cache: false,
            data: ajaxData,
            success: function (data) {
                this.setState(
                    {
                        currentPage: page,
                        products: data.products,
                        totalPages: parseInt(data.totalProducts / this.state.productPerPage + 1)
                    },
                    function () {
                        console.log(this.state);
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    updateFilter(filters) {
        this.setState({filterValues: filters})
        this.getProducts(1, filters);
        console.log(filters);
    }

    paginationUpdate(page) {
        this.setState({currentPage: page});
        this.getProducts(page, this.state.filterValues);
    }

    render() {

        return (
            <MuiThemeProvider>
            <div className="layout-container">
                <Header/>
                <div className="row">
                    <div className=" main-contetnt col s12 m9 l9">
                        <MainContent products={this.state.products}
                                     totalPages={this.state.totalPages}
                                     currentPage={this.state.currentPage}
                                     paginationUpdate={this.paginationUpdate.bind(this)}/>
                    </div>
                    <div className=" sidebar col s12 m3 l3">
                        <Sidebar updatedFilters={this.updateFilter.bind(this)} filterData={this.filterProps}/>
                    </div>

                </div>
                <Footer/>
            </div>
            </MuiThemeProvider>

        );
    }
}
