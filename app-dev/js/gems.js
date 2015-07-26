var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Chat = require('./chat.js'),
    Notifs = require('./notifs.js')

var Gems = React.createClass({
    mixins: [material],

    render: function(){
        return (
            <div>
                <Chat />
                <Notifs />
            </div>
        )
    }
})

module.exports = Gems
