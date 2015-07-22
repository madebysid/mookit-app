var React = require('react'),
    mui = require('material-ui'),
    material = require('./material.js'),
    Animate = React.addons.CSSTransitionGroup,
    superagent = require('superagent'),
    Offline = require('./offline.js'),

    Card = mui.Card,
    CardMedia = mui.CardMedia,
    CardText = mui.CardText,
    CardTitle = mui.CardTitle,
    List = mui.List,
    ListItem = mui.ListItem,
    FontIcon = mui.FontIcon,
    IconButton = mui.IconButton,
    LinearProgress = mui.LinearProgress,
    Dialog = mui.Dialog,
    Avatar = mui.Avatar,
    TextField = mui.TextField,
    FlatButton = mui.FlatButton

var TopicNormal = React.createClass({
    render: function(){
        var styles = {
            position: 'absolute',
            top: 'calc(50% - 1.25em)',
            right: '10px',
            color: '#378E43'
        }
        return (
            <Animate transitionName="topics" transitionAppear={true}>
                <ListItem onTouchTap={this.props.toggle} secondaryText={this.props.text} secondaryTextLines={1}>
                    <p style={styles}>{this.props.replies}</p>
                </ListItem>
            </Animate>
        )
    }
})

var TopicExpanded = React.createClass({
    close: function(){
        var self = this
        setTimeout(function(){
            self.props.toggle()
        },300)

    },
    fetch: function(){
        var self = this
        this.setState({
            loading: true
        })
        superagent
            .get(localStorage.getItem('mainUrl') + '/forums/comments/' + this.props.tid)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .unset('Content-Type')
            .timeout(10000)
            .end(function(err, res){
                if(err){
                    if(err.timeout==10000){
                        self.setState({
                            offline: true
                        })
                    }
                }
                else{
                    console.log(res.body)
                    self.setState({
                        topicComments: res.body,
                        loading: false
                    })
                }
            })
    },
    reply: function(){
        this.setState({
            topicComments: []
        })
    },
    postReply: function(){
        var self = this
        if(self.refs.replyField.getValue() == ''){
            self.refs.replyField.setErrorText('This field is compulsory')
        }
        else{
            superagent
                .post(localStorage.getItem('mainUrl') + '/comments/' + this.props.tid)
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

    componentWillMount: function(){
        this.fetch()
    },
    getInitialState: function(){
        return {
            topicComments: [{avatar: null}],
            loading: false,
            offline: false
        }
    },
    render: function(){
        var self = this
        var expandedStyle = {
                position: 'absolute',
                backgroundColor: 'white',
                width: '100vw',
                left: '0',
                bottom: '0',
                top: '0',
                paddingLeft: '10px',
                zIndex: '10000',
                transitionDuration: '3s',
                padding: '10px',
                overflowY: 'scroll',
                marginBottom: '150px'
            },
            closeStyle = {
                position: 'fixed',
                top: '190px',
                right: '10px',
                zIndex: '2000'
            },
            descStyle = {
                padding: '10px',
                color: '#727272'
            },
            FABStyle = {
                position: 'fixed',
                bottom: '48px',
                right: '20px',
                backgroundColor: '#F0592A',
                borderRadius: '50%',
                boxShadow: '0px 0px 5px #727272'
            },
            ReplyStyle = {
                position: 'fixed',
                bottom: '48px',
                left: '20px',
                backgroundColor: 'white',
                width: 'calc(80% - 50px)'
            },
            loaderStyle = {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                zIndex: '5000',
                display: (this.state.loading) ? 'block' : 'none',
            },
            TopicCommentsStyle = {
                display: 'block',
                height: 'calc(100%)',
                overflowY: 'scroll'
            }
        return (
            <div style={expandedStyle}>
                {
                    this.state.offline ? <Offline /> : null
                }
                <Animate transitionName="topicsOpen" transitionAppear={true}>
                    <p style={{color: '#378E43'}}>{this.props.text}</p>
                    <IconButton
                        style={closeStyle}
                        onTouchTap={this.close}
                        iconClassName="mdi mdi-close"
                        iconStyle={{color: 'red'}}
                    />

                    <div style={descStyle} dangerouslySetInnerHTML={{__html: this.props.description}}>
                    </div>
                    <div style={TopicCommentsStyle}>
                    {
                        (self.state.topicComments[0].avatar == null)
                            ? <div>There are no replies</div>
                            : self.state.topicComments.map(function(element){
                                    return (
                                        <div>
                                            <ListItem disabled={true} leftAvatar={
                                        <Avatar src={localStorage.getItem('loginUrl') + "/sites/default/files" + element.avatar.slice(8)} />
                                    }>
                                                <div style={{color: '#F0592A', fontSize: '0.75em', lineHeight: '1.5em'}}>{element.username}</div>
                                                <div style={{color: '#727272'}} dangerouslySetInnerHTML={{__html: element.text}}></div>
                                            </ListItem>
                                        </div>
                                    )
                                })
                    }
                    </div>
                    <TextField
                        ref="replyField"
                        style={ReplyStyle}
                        floatingLabelText="Reply"
                        onFocus={self.reply}/>
                    <IconButton
                        iconStyle={{color: 'white'}}
                        style={FABStyle}
                        iconClassName="mdi mdi-reply"
                        onTouchTap={this.postReply}/>
                </Animate>
                <LinearProgress mode="indeterminate" style={loaderStyle}/>
            </div>
        )
    }
})

var ExpandableListItem = React.createClass({
    toggle: function(){
        var self = this
        this.setState({
            opened: !self.state.opened
        })
    },
    getInitialState: function(){
        return {
            opened: false
        }
    },
    render: function(){
        var ListStyle = {
                position: this.state.opened ? 'absolute' : 'inherit',
                margin: this.state.opened ? '0' : '10px',
                transitionDuration: '3s'
            },
            ToRender = this.state.opened ? TopicExpanded : TopicNormal
        return (
            <div>
                <ToRender refresh={this.props.refresh} style={ListStyle} toggle={this.toggle} text={this.props.data.topic} replies={this.props.data.numPosts} description={this.props.data.description} tid={this.props.data.tid} />
            </div>
        )
    }
})

var ForumCreate = React.createClass({
    create: function(){
        var self = this
        if(self.refs.forumTitle.getValue() == ''){
            self.refs.forumTitle.setErrorText('This field is compulsory')
        }
        if(self.refs.forumDesc.getValue() == ''){
            self.refs.forumDesc.setErrorText('This field is compulsory')
        }
        else{
            superagent
                .post(localStorage.getItem('mainUrl') + '/addForum')
                .type('form')
                .send({
                    subject: self.refs.forumTitle.getValue(),
                    description: self.refs.forumDesc.getValue(),
                    tid: 1,
                    topicId: 1})
                .timeout(10000)
                .set('token', localStorage.getItem('token'))
                .set('uid', localStorage.getItem('uid'))
                .end(function(err, res){
                    if(err){
                        if(err.timeout==10000)
                            console.log('Unable to process request')
                    }
                    else{
                        self.props.cancel()
                    }
                })
        }
    },
    cancel: function(){
        var self = this
        this.setState({
            reload: !self.state.reload
        })
        this.props.cancel();
    },
    clearErrors: function(){
        this.refs.forumTitle.setErrorText('')
        this.refs.forumDesc.setErrorText('')
    },

    getInitialState: function(){
        return {
            reload: false
        }
    },
    render: function(){
        var containerStyle = {
            zIndex: '6000',
            backgroundColor: 'white',
            height: '70vh',
            width: '100%'
        },
        TextFieldStyle = {
            display: 'block',
            width: '80vw',
            margin: '0 auto'
        },
        PostStyle = {
            position: 'absolute',
            right: '20px',
            bottom: '20px',
            fontFamily: 'RobotoLight',
            backgroundColor: '#378E43',
            color: 'white',
        },
        CancelStyle = {
            position: 'absolute',
            left: '20px',
            bottom: '20px',
            color: 'red'
        }
        return (
            <div style={containerStyle}>
                <Animate transitionName="topicsOpen" transitionAppear={true}>
                    <div>
                        <p style={{fontFamily: 'RobotoRegular', color: '#378E43', paddingLeft: '20px'}}>New Topic</p>
                        <TextField
                            ref="forumTitle"
                            style={TextFieldStyle}
                            floatingLabelText="Title"
                            onFocus={this.clearErrors} />

                        <TextField
                            ref="forumDesc"
                            style={TextFieldStyle}
                            floatingLabelText="Description"
                            multiLine={true}
                            onFocus={this.clearErrors}/>

                        <FlatButton
                            style={PostStyle}
                            onTouchTap={this.create}>
                            POST
                        </FlatButton>
                        <FlatButton onTouchTap={this.cancel} style={CancelStyle}>Cancel</FlatButton>
                    </div>
                </Animate>
            </div>
        )
    }
})

var ForumShow = React.createClass({
    newForum: function(){
        this.props.newForum()
    },
    fetch: function(){
        var self = this
        this.setState({
            loading: true
        })
        superagent
            .get(localStorage.getItem('mainUrl') + '/forums/getdiscussions/general')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err, res){
                if(err){
                    if(err.timeout==10000)
                        self.setState({
                            offline: true
                        })
                }
                else if(res.body[0].data != "null")
                    self.setState({
                        topics: res.body,
                        loading: false
                    })
                else
                    self.setState({
                        topics: 'Nothing to show',
                        loading: false
                    })
            })
    },

    getInitialState: function(){
        return {
            topics: [],
            loading: false,
            offline: false,
            newForum: this.props.newForum
        }
    },
    componentWillMount: function(){
        this.fetch()
    },
    render: function(){
        var self = this
        var DisTitleStyle = {
                paddingLeft: '20px',
                paddingTop: '20px',
                fontFamily: 'RobotoRegular'
            },
            FABStyle = {
                position: 'absolute',
                bottom: '0px',
                right: '20px',
                backgroundColor: '#F0592A',
                borderRadius: '50%',
                boxShadow: '0px 0px 5px #727272'
            }
        return (
            <div>
                {
                    this.state.offline ? <Offline /> : null
                }
                <div style={DisTitleStyle}>Discussions</div>
                <List style={{paddingLeft: '20px', paddingBottom: '0'}}>
                    {
                        self.state.topics.map(function(element, index){
                            return <ExpandableListItem refresh={self.fetch} key={index} data={element} />
                        })
                    }
                </List>

                <IconButton onTouchTap={this.newForum} iconStyle={{color: 'white'}} style={FABStyle} iconClassName="mdi mdi-border-color" />
            </div>
        )
    }
})

module.exports = React.createClass({

    newForum: function(){
        this.setState({
            newForum: true
        })
        this.props.createForum()
    },
    cancelNewForum: function(){
        this.setState({
            newForum: false
        })
        this.props.cancelCreate();
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            newForum: nextProps.forum
        })
    },


    getInitialState: function(){
        return {
            topics: [],
            loading: false,
            offline: false,
            newForum: this.props.newForum
        }
    },
    render: function(){
        var self = this
        return (
            <div style={{height: '70vh', overflowY: 'scroll'}}>
                {
                    this.state.newForum
                        ? <ForumCreate cancel={self.cancelNewForum}/>
                        : <ForumShow newForum={self.newForum}/>
                }
            </div>
        )
    }
})
