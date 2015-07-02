var React = require('react'),
    mui = require('material-ui'),
    material = require('./Material.js')

var Chat = React.createClass({
    mixins: [material],

    render: function(){
        var spaceStyle = {
            width: '100%',
            height: '15px'
        }
        return (
            <div>
                <div style={spaceStyle}></div>
                Chats
            </div>
        )
    }

})

module.exports = Chat