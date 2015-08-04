var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Loader = require('./loader.js'),
    Router = require('react-router'),

    ListItem = mui.ListItem

var TopicNormal = React.createClass({
    mixins: [material, Router.Navigation],

    handleTouch: function() {
        var self = this
        localStorage.setItem('lectureTopicTitle', self.props.data.topic)
        localStorage.setItem('lectureTopicDesc', self.props.data.description)
        self.transitionTo('generalTopic', {topicId: self.props.data.tid})
    },

    render: function(){
        var self = this,
        styles = {
            position: 'absolute',
            // top: 'calc(50% - 1.25em)',
            right: '10px',
            color: '#378E43'
        }
        // <ListItem
        //     onTouchTap={self.handleTouch}
        //     secondaryText={this.props.data.topic.slice(0, 30) + ((this.props.data.topic.length>30) ? '...' : ' ')}>
        //         <p style={styles}>{this.props.data.numPosts}</p>
        //     </ListItem>
        return (
        (this.props.data.topic == undefined)
            ? <div>No topics</div>
            : <div onTouchTap={self.handleTouch}>
                {this.props.data.topic.slice(0, 30) + ((this.props.data.topic.length>30) ? '...' : ' ')}
                <p style={styles}>{this.props.data.numPosts}</p>
            </div>
        )
    }
})

module.exports = TopicNormal
