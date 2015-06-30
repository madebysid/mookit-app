var React = require('react'),
    mui = require('material-ui'),
    material = require('./Material.js')

var Favourites = React.createClass({
    render: function(){
        return (
            <div>
                <a href="#/Dash">Back</a><br />
                Favourites Page
            </div>
        )
    }
})

module.exports = Favourites;