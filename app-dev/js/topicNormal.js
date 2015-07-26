var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Loader = require('./loader.js'),

    ListItem = mui.ListItem

var TopicNormal = React.createClass({
    mixins: [material],

    handleTouch: function(){
        this.props.onTouchTap()
    },

    render: function(){
        var self = this,
        styles = {
            position: 'absolute',
            top: 'calc(50% - 1.25em)',
            right: '10px',
            color: '#378E43'
        }
        return (
        (this.props.text == undefined)
            ? <div>No topics</div>
            : <ListItem
                onTouchTap={self.handleTouch}
                secondaryText={this.props.text.slice(0, 30) + ((this.props.text.length>30) ? '...' : ' ')}>
                    <p style={styles}>{this.props.replies}</p>
                </ListItem>
        )
    }
})

module.exports = TopicNormal
