var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),
    superagent = require('superagent'),
    TopicNormal = require('./topicNormal.js'),
    Loader = require('./loader.js'),
    LazyRender = require('react-lazy-render'),

    List = mui.List,
    ListItem = mui.ListItem,
    IconButton = mui.IconButton

var topics = []

var Forums = React.createClass({
    mixins: [material, Router.Navigation],

    newForum: function(){
        localStorage.setItem('topicId', '1')
        this.transitionTo('newGeneralForum')
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
                        self.transitionTo('offline')
                }
                else{
                    topics = res.body
                    self.forceUpdate()
                }
            })
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        console.log(this.state.topics, nextState.topics)
        return nextState.topics != this.state.topics;
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

        // <List style={{paddingLeft: '20px', paddingBottom: '100px'}}>
        return (
            <div style={{height: '70vh', overflowY: 'scroll'}}>
                <List style={{paddingLeft: '20px', paddingBottom: '100px'}}>
                    {
                        topics.map(function(element, index) {
                            return (
                                <TopicNormal data={element} />
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
