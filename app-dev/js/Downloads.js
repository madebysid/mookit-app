var React = require('react'),
    Link = require('react-router').Link,
    mui = require('material-ui'),
    material = require('./Material.js')

var Downloads = React.createClass({
    render: function(){
        return (
            <div>
                <Link to="/dash">Back</Link><br />
                Downloads Page
            </div>
        )
    }
})

module.exports = Downloads;