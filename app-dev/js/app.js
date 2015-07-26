var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),
    Gems = require('./gems.js'),
    RouteHandler = Router.RouteHandler,

    AppBar = mui.AppBar

var App = React.createClass({
    mixins: [material, Router.Navigation],

    render: function(){
        var self = this,
        AppBarStyle = {
            backgroundColor: '#378E43'
        }
        return (
            <div>
                <AppBar
                    iconClassNameLeft="mdi mdi-arrow-left"
                    onLeftIconButtonTouchTap={this.goBack}
                    zDepth={0}
                    style={AppBarStyle} />
                <Gems />
                <RouteHandler />
            </div>
        )
    }
})

module.exports = App
