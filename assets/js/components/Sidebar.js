import React, {Component} from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';

require('../../stylesheets/components/sidebar.scss');

export default class Sidebar extends React.Component {

    render() {
        return (
            <div className="sidebar-container">
                <Paper className="mui-paper">
                    Filters
                    <hr/>
                    <div className="filters-container">
                        <List>
                            <ListItem primaryText="اندازه صفحه نمایش"
                                      initiallyOpen={true}
                                      nestedItems={
                                          <ListItem><Checkbox label="کمتر از 40 اینج"/></ListItem>,
                                <Checkbox label="بیشتر از 52 اینج"/>
                            }/>
                        </List>
                        <Checkbox label="کمتر از 40 اینج"/>
                        <Checkbox label="بیشتر از 52 اینج"/>

                    </div>
                </Paper>
            </div>
        );
    }
}