import React, {Component} from 'react';

import $ from 'jquery';
import 'materialize-css';
import Rheostat from 'rheostat';
require('../../stylesheets/components/sidebar.scss');

export default class Sidebar extends React.Component {

    componentDidMount(){
        this.slider = document.getElementById('test-slider');
        noUiSlider.create(slider, {
            start: [20, 80],
            connect: true,
            step: 1,
            orientation: 'horizontal', // 'horizontal' or 'vertical'
            range: {
                'min': 0,
                'max': 100
            },
            format: wNumb({
                decimals: 0
            })
        });

    }
    render() {
        // $(document).ready(function () {
        //     $('.collapsible').collapsible();
        // });

        return (

            <div className="filters-container" dir="rtl">
                <div className="">


                    <form>
                        <ul className="collapsible" data-collapsible="expandable">
                            <li>
                                <div className="collapsible-header"><h5>فیلتر</h5></div>
                            </li>
                            <li>
                                <div className="collapsible-header">برند</div>
                                <div className="collapsible-body">
                                    <p>
                                        <input type="checkbox" className="filled-in" id="filled-in-box"  />
                                        <label > Samsung</label>
                                    </p>
                                    <p>
                                        <input type="checkbox" className="filled-in" id="filled-in-box2"  />
                                        {/*<label forName="filled-in-box"> Samsung</label>*/}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">قیمت</div>
                                <div className="collapsible-body">
                                    <Rheostat
                                        min={1}
                                        max={100}
                                        values={[1, 100]}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">اندازه صفحه</div>
                                <div className="collapsible-body">
                                    <Rheostat
                                        min={1}
                                        max={100}
                                        values={[1, 100]}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">رابط هوشمند</div>
                                <div className="collapsible-body">
                                    {/*<input className="with-gap" name="group1" type="radio" id="test3"  />*/}
                                    {/*<label htmlFor="test3">همه</label>*/}
                                    {/*<input className="with-gap" name="group1" type="radio" id="test3"  />*/}
                                    {/*<label htmlFor="">دارد</label>*/}
                                    {/*<input className="with-gap" name="group1" type="radio" id="test3"  />*/}
                                    {/*<label htmlFor="test3">ندارد</label>*/}
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">
                                    <input type="submit" value="اعمال فیلتر" className="btn left"/>
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}