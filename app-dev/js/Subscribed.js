var React = require('react'),
    Link = require('react-router').Link,
    mui = require('material-ui'),
    material = require('./Material.js')

var Subscribed = React.createClass({
    render: function(){
        return (
            <div>
                <Link to="/dash">Back</Link><br />
                Subscribed Page
            </div>
        )
    }
})

module.exports = Subscribed;