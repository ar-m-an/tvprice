import React, {Component} from 'react';

export default class Footer extends React.Component{

    render(){
        return(
            <div className="footer">
                <footer className="page-footer">
                    <div className="container" dir="rtl">
                        <div className="row">

                            <div className="col s12">
                                <h5 className="white-text">تامین کنندگان</h5>
                                <ul>
                                    <li><a className="grey-text text-lighten-3" href="#!">دیجی کالا</a></li>
                                    <li><a className="grey-text text-lighten-3" href="#!">زنبیل</a></li>
                                    <li><a className="grey-text text-lighten-3" href="#!">بانه کالا</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container">
                            © 2017 Copyright
                            <a className="grey-text text-lighten-4 right" href="#!"></a>
                        </div>
                    </div>
                </footer>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

            </div>
        )
    }
}