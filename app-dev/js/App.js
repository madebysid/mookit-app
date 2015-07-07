var React = require('react'),
    Router = require('react-router')
    routes = require('./routes.js'),
    Progress = require('./Progress.js'),
    RouteHandler = Router.RouteHandler

var App = React.createClass({
    render: function(){
        return (
            <div>
                <RouteHandler />
            </div>
        )
    }
})

Router.run(routes, function(Root){
    React.render(
        <Root />,
        document.getElementById('content')
    )
})

module.exports = App