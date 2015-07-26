var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),
    superagent = require('superagent'),
    TopicNormal = require('./topicNormal.js'),
    Loader = require('./loader.js'),

    List = mui.List,
    IconButton = mui.IconButton

var Forums = React.createClass({
    mixins: [material, Router.Navigation],

    handleTouch: function(topic) {
        localStorage.setItem('lectureTopicTitle', topic.topic)
        localStorage.setItem('lectureTopicDesc', topic.description)
        this.transitionTo('generalTopic', {topicId: topic.tid})
        console.log(topic)
    },
    newForum: function(){
        localStorage.setItem('topicId', '1')
        this.transitionTo('newGeneralForum')
    },

    getInitialState: function(){
        return {
            topics: [{data: 'null'}]
        }
    },
    componentDidMount: function() {
        var self = this
        self.refs.loader.showLoader()
        superagent
            .get(localStorage.getItem('mainUrl') + '/forums/getdiscussions/general')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err, res){
                self.refs.loader.hideLoader()
                if(err){
                    if(err.timeout==10000)
                        console.log('Timeout')
                }
                else if(res.body[0].data != "null")
                    self.setState({
                        topics: res.body
                    })
                else
                    self.setState({
                        topics: 'Nothing to show'
                    })
            })
    },
    render: function(){
        var self = this,
        FABStyle = {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#F0592A',
            borderRadius: '50%',
            boxShadow: '0px 0px 5px #727272'
        }
        return (
            <div style={{height: '70vh', overflowY: 'scroll'}}>
            <List style={{paddingLeft: '20px', paddingBottom: '100px'}}>
                {
                    (this.state.topics[0].data == 'null')
                    ? <div style={{paddingTop: '20px', textAlign: 'center', fontFamily: 'RobotoRegular'}}>No forums available</div>
                    : self.state.topics.map(function(element, index){
                        return (
                            <div>
                                <TopicNormal text={element.topic} onTouchTap={self.handleTouch.bind(this, element)} replies={element.numPosts}/>
                            </div>
                        )
                    })

                }
            </List>
            <Loader ref="loader" />
            <IconButton
                onTouchTap={this.newForum}
                iconStyle={{color: 'white'}}
                style={FABStyle}
                iconClassName="mdi mdi-plus" />
            </div>
        )
    }
})


module.exports = Forums
