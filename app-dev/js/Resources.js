var React = require('react'),
    mui = require('material-ui'),
    material = require('./Material.js')

var Resources = React.createClass({
    mixins: [material],

    render: function(){
        var spaceStyle = {
            width: '100%',
            height: '15px'
        }
        return (
            <div>
                <div style={spaceStyle}></div>
                Resources
            </div>
        )
    }

})

module.exports = Resources