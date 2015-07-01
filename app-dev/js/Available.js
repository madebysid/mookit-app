var React = require('react'),
    material = require('./Material.js'),
    Link = require('react-router').Link,
    reqwest = require('reqwest'),
    mui = require('material-ui'),
    FlatButton = mui.FlatButton

var Available = React.createClass({
    mixins: [material],

    componentWillMount: function(){
        reqwest({
            url: './courseData.json',
            method: 'GET',
            success: function(data){
                console.log(data)
            }
        })
    },

    render: function(){
        return (
            <div>
                <Link to="/dash">Back</Link><br />
                Available
            </div>
        )
    }
})

module.exports = Available