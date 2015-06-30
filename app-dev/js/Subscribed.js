var React = require('react'),
    mui = require('material-ui'),
    material = require('./Material.js')

var Subscribed = React.createClass({
    render: function(){
        return (
            <div>
                <a href="#/Dash">Back</a><br />
                Subscribed Page
            </div>
        )
    }
})

module.exports = Subscribed;