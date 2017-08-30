import React, {Component} from 'react';

import $ from 'jquery';
import 'materialize-css';
import Rheostat from 'rheostat';
require('../../stylesheets/components/sidebar.scss');

export default class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedBrands: [],
            availableOnly: false,
            priceRange:[this.props.filterData.minPrice, this.props.filterData.maxPrice],
            sizeRange: [this.props.filterData.minSize, this.props.filterData.maxSize],
            port: 'all'
        }
        this.updatePriceRange = this.updatePriceRange.bind(this);
        this.updateSizeRange = this.updateSizeRange.bind(this);
        this.brandCheckboxes = this.props.filterData.brands.map(function (brand) {
            return (
                <p>
                    <input type="checkbox"
                           className="filled-in" id={brand}

                           value={brand}
                           ref={brand}
                    />
                    <label htmlFor={brand}>{brand}</label>
                </p>
            )
        });
        console.log(this.brandCheckboxes);
    }

    toggleBrandCheckbox(e){

    }

    updatePriceRange(sliderState) {
        this.setState({
            priceRange: sliderState.values,
        });
    }

    updateSizeRange(sliderState) {
        this.setState({
            sizeRange: sliderState.values,
        });
    }

    handlePortOptionChange(e){
        this.setState({
            port: e.target.value
        });
    }

    submitFilter(){
        let selectedBrands = [];
        this.props.filterData.brands.forEach(function (brand) {
            if(this.refs[brand].checked) selectedBrands.push(brand);
        }.bind(this));
        this.setState(
            {selectedBrands: selectedBrands,
             availableOnly: this.refs.availableOnly.checked},
            function () {
                this.props.updatedFilters(this.state);
        });

    }
    
    render() {


        return (

            <div className="filters-container" dir="rtl">
                <div className="">


                    <div>
                        <ul className="collapsible" data-collapsible="expandable">
                            <li>
                                <div className="collapsible-header"><h5>فیلتر</h5></div>
                            </li>
                            <li>
                                <div className="collapsible-header">برند</div>
                                <div className="collapsible-body">
                                    {this.brandCheckboxes}
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">قیمت</div>
                                <div className="collapsible-body">
                                    <Rheostat
                                        min={this.props.filterData.minPrice}
                                        max={this.props.filterData.maxPrice}
                                        values={this.state.priceRange}
                                        onValuesUpdated={this.updatePriceRange.bind(this)}
                                    />
                                    از {this.state.priceRange[0]} تا {this.state.priceRange[1]} تومان
                                    <p >
                                        <input type="checkbox" className="filled-in" id="available-products"  ref="availableOnly"/>
                                        <label htmlFor="available-products">کالاهای موجود</label>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">اندازه صفحه</div>
                                <div className="collapsible-body">
                                    <Rheostat
                                        min={this.props.filterData.minSize}
                                        max={this.props.filterData.maxSize}
                                        values={this.state.sizeRange}
                                        onValuesUpdated={this.updateSizeRange.bind(this)}
                                    />
                                    از {this.state.sizeRange[0]} تا {this.state.sizeRange[1]} اینج
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">رابط هوشمند</div>
                                <div className="collapsible-body">
                                    <p>
                                        <input type="radio" name="port" className="with-gap" id="port-all" value="all" checked={true}
                                               onChange={this.handlePortOptionChange.bind(this)} />
                                        <label htmlFor="port-all"> همه</label>
                                    </p>
                                    <p>
                                        <input type="radio" name="port" className="with-gap" id="port-true" value="true"
                                               onChange={this.handlePortOptionChange.bind(this)} />
                                        <label htmlFor="port-true"> دارد</label>
                                    </p>
                                    <p>
                                        <input type="radio" name="port" className="with-gap" id="port-false" value="false"
                                               onChange={this.handlePortOptionChange.bind(this)} />
                                        <label htmlFor="port-false"> ندارد</label>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header" dir="ltr">
                                    <a className="btn left" onClick={this.submitFilter.bind(this)}>اعمال فیلتر</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}