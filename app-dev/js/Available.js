var React = require('react'),
    mui = require('material-ui'),
    material = require('./Material.js')

var Available = React.createClass({
    render: function(){
        return (
            <div>
                <a href="#/Dash">Back</a><br />
                Available Courses
            </div>
        )
    }
})

module.exports = Available;