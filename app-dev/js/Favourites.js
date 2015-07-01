var React = require('react'),
    Link = require('react-router').Link,
    mui = require('material-ui'),
    material = require('./Material.js')

var Favourites = React.createClass({
    render: function(){
        return (
            <div>
                <Link to="/dash">Back</Link><br />
                Favourites Page
            </div>
        )
    }
})

module.exports = Favourites;