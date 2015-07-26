var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    superagent = require('superagent'),
    Router = require('react-router'),
    Loader = require('./loader.js'),

    ListItem = mui.ListItem,
    IconButton = mui.IconButton,
    ListItem = mui.ListItem,
    Avatar = mui.Avatar,
    TextField = mui.TextField

var TopicExpanded = React.createClass({
    mixins: [Router.State],

    fetch: function(){
        var self = this
        self.refs.loader.showLoader()
        superagent
            .get(localStorage.getItem('mainUrl') + '/forums/comments/' + this.getParams().topicId)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .unset('Content-Type')
            .timeout(10000)
            .end(function(err, res){
                self.refs.loader.hideLoader()
                if(err){
                    if(err.timeout==10000){
                        console.log('Timeout')
                    }
                }
                else{
                    self.setState({
                        topicComments: res.body
                    })
                }
            })
    },
    reply: function(){
        var self = this
        if(self.refs.replyField.getValue() == ''){
            self.refs.replyField.setErrorText('This field is compulsory')
        }
        else{
            superagent
                .post(localStorage.getItem('mainUrl') + '/comments/' + self.getParams().topicId)
                .type('form')
                .send({
                    "parentCommentId": 0,
                    "text": self.refs.replyField.getValue(),
                    "subject": self.refs.replyField.getValue()
                })
                .timeout(10000)
                .set('token', localStorage.getItem('token'))
                .set('uid', localStorage.getItem('uid'))
                .end(function(err, res){
                    if(err){
                        if(err.timeout==10000)
                            console.log('Unable to process request')
                    }
                    else{
                        self.refs.replyField.clearValue()
                        self.fetch()
                    }
                })
        }
    },

    componentDidMount: function(){
        this.fetch()
    },
    getInitialState: function(){
        return {
            topicComments: [{avatar: null}]
        }
    },
    render: function(){
        var self = this
        var expandedStyle = {
            backgroundColor: 'white',
            paddingLeft: '10px',
            padding: '10px',
            overflowY: 'scroll',
            height: '70vh'
        },
        descStyle = {
            padding: '10px',
            paddingTop: '0px',
            color: '#727272'
        },
        FABStyle = {
            float: 'right',
            bottom: '20px',
            right: '30px',
            backgroundColor: '#F0592A',
            borderRadius: '50%',
            boxShadow: '0px 0px 5px #727272'
        },
        InputStyle = {
            bottom: '20px',
            left: '20px',
            width: '60vw'
        }
        return (
            <div style={expandedStyle}>
                <p style={{color: '#378E43'}}>{localStorage.getItem('lectureTopicTitle')}</p>

                <div style={descStyle} dangerouslySetInnerHTML={{__html: localStorage.getItem('lectureTopicDesc')}}></div>
                {
                    (self.state.topicComments[0].avatar == null)
                        ? <div>There are no replies</div>
                        : self.state.topicComments.map(function(element){
                        return (
                            <div>
                                <ListItem disabled={true}
                                    leftAvatar={<Avatar src={localStorage.getItem('loginUrl') + "/sites/default/files" + element.avatar.slice(8)} />}>
                                    <div style={{color: '#F0592A', fontSize: '0.75em'}}>{element.username}</div>
                                    <div style={{color: '#727272'}} dangerouslySetInnerHTML={{__html: element.text}}></div>
                                </ListItem>
                            </div>
                        )
                    })
                }
                <Loader ref="loader" />

            <div style={{position: 'fixed', bottom: '0', zIndex: '3', width: '100vw', backgroundColor: 'white'}}>
                    <TextField ref="replyField"
                        style={InputStyle}
                        hintText="Reply"
                        onEnterKeyDown={this.reply}/>
                    <IconButton
                        iconStyle={{color: 'white'}}
                        style={FABStyle}
                        iconClassName="mdi mdi-reply"
                        onTouchTap={this.reply}/>
                </div>
            </div>
        )
    }
})

module.exports = TopicExpanded
