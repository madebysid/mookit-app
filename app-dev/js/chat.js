var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),
    superagent = require('superagent'),
    socket = require('socket.io-client'),
    io = socket.connect(localStorage.getItem('mainUrl')),
    Loader = require('./loader.js'),

    IconButton = mui.IconButton,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider,
    Avatar = mui.Avatar,
    IconButton = mui.IconButton,
    TextField = mui.TextField,
    FlatButton = mui.FlatButton

var Incoming = React.createClass({
    render: function(){
        var ContainerStyle = {
                marginBottom: '20px'
            },
            MessageStyle = {
                backgroundColor: '#EDECEC',
                marginLeft: '60px',
                marginRight: '40px',
                borderRadius: '10px',
                padding: '10px'
            },
            SenderStyle = {
                color: 'black',
                opacity: '0.2',
                width: '100%',
                textAlign: 'right',
                fontSize: '0.7em',
                fontFamily: 'RobotoRegular'
            },
            arrowStyle = {
                float: 'left',
                marginTop: '10px',
                width: '0',
                height: '0',
                border: '10px solid',
                borderColor: 'transparent #EDECEC transparent transparent',
            }
        return (
            <div style={ContainerStyle}>
                <Avatar color={"white"} backgroundColor={'#56C7DE'} style={{float: 'left'}}>
                    {this.props.sender.slice(0,1).toUpperCase()}
                </Avatar>

                <div style={arrowStyle} />
                <div style={MessageStyle} className="incomingMsg">
                    {this.props.message}
                    <div style={SenderStyle}>
                        {this.props.sender}
                    </div>
                </div>
            </div>
        )
    }
})

var Outgoing = React.createClass({
    render: function(){
        var containerStyle = {
                marginBottom: '20px'
            },
            messageStyle = {
                backgroundColor: '#378E43',
                color: 'white',
                marginRight: '60px',
                marginLeft: '40px',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'right'
            },
            senderStyle = {
                color: 'white',
                opacity: '0.4',
                width: '100%',
                fontSize: '0.7em',
                fontFamily: 'RobotoRegular',
                textAlign: 'left'
            },
            arrowStyle = {
                float: 'right',
                marginTop: '10px',
                width: '0',
                height: '0',
                border: '10px solid',
                borderColor: 'transparent transparent transparent #378E43',
            }
        return (
            <div style={containerStyle}>
                <Avatar color={"white"} backgroundColor={'#49B752'} style={{float: 'right'}}>
                    Y
                </Avatar>

                <div style={arrowStyle} />
                <div style={messageStyle} className="outgoingMsg">
                    {this.props.message}
                    <div style={senderStyle}>
                        You
                    </div>
                </div>
            </div>
        )
    }
})

var ChatContainer = React.createClass({
    mixins: [Router.Navigation],

    loadPrevious: function(){
        var self = this
        self.refs.loader.showLoader()
        superagent
            .get(localStorage.getItem('mainUrl') + '/getChat/' + self.state.chats[0].timestamp)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err,res){
                console.log(res)
                self.refs.loader.hideLoader()
                if(err){
                    if(err.timeout==10000)
                        self.transitionTo('offline')
                }
                else{
                    newChat = res.body.reverse().concat(self.state.chats)
                    self.setState({
                        chats: newChat
                    })
                }
            })
    },
    sendMsg: function(){
        var msg = this.refs.msgInput.getValue()
        io.emit('chatMessage', msg, localStorage.getItem('uid'), localStorage.getItem('token'))
        this.forceUpdate();
        this.refs.msgInput.setValue('')
    },

    getInitialState: function(){
        return {
            chats: [{uid: 0}]
        }
    },
    componentDidMount: function(){
        var self = this
        self.refs.loader.showLoader()
        superagent
            .get(localStorage.getItem('mainUrl') + '/getChat/1')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err,res){
                self.refs.loader.hideLoader()
                if(err){
                    if(err.timeout==10000)
                        self.transitionTo('offline')
                }
                else{
                    self.setState({
                        chats: res.body.reverse()
                    })
                }
            })
    },

    componentWillUpdate: function() {
        var self = this,
            node = this.refs.chatContainer.getDOMNode()
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    },
    componentDidUpdate: function() {
        if (this.shouldScrollBottom) {
            var node = this.refs.chatContainer.getDOMNode();
            node.scrollTop = node.scrollHeight
        }
    },
    componentWillUnmount: function(){
        localStorage.setItem('lastSeenChat', Date.now().toString().slice(0,10))
    },
    render: function(){
        var self = this,
        ContainerStyle = {
            position: 'absolute',
            top: '60px',
            bottom: '0',
            width: '100vw',
            boxSizing: 'border-box',
            left: '0',
            backgroundColor: 'white',
            padding: '10px',
            overflowY: 'scroll',
            zIndex: '2'
        },
        arrowStyle = {
            position: 'absolute',
            width: '0',
            height: '0',
            right: '75px',
            top: '44px',
            border: '8px solid',
            borderColor: 'transparent transparent #fff transparent'
        },
        InputStyle = {
            left: '20px',
            width: '75vw'
        },
        SendStyle = {
            right: '-20px'
        },
        extraSpace = {
            height: '50px',
            backgroundColor: 'white'
        },
        fadeStyle = {
            position: 'fixed',
            top: '60px',
            zIndex: '4',
            height: '50px',
            width: '100vw',
            background: 'linear-gradient(white, transparent)'
        },
        btnStyle = {
            position: 'absolute',
            margin: '0 auto',
            left: '0',
            right: '0',
            width: '50vw',
            color: '#378E43'
        }
        return (
            <div className="notifContainer">
            <div style={arrowStyle}/>

            <div style={ContainerStyle} ref="chatContainer" >
                {
                    (self.state.chats[0].uid == 0)
                    ? <div style={{paddingTop: '20px', textAlign: 'center', fontFamily: 'RobotoRegular'}}>No chats available</div>
                : <div>
                    <div style={extraSpace}/>
                    <FlatButton label="Load Earlier" style={btnStyle} onTouchTap={this.loadPrevious}/>
                    <div style={extraSpace}/>
                    <div style={fadeStyle}/>
                    {
                    self.state.chats.map(function(element){
                            return (
                                (element.uid == localStorage.getItem('uid'))
                                ? <Outgoing message={element.msg}/>
                                : <Incoming sender={element.userName} message={element.msg}/>
                            )
                        })
                    }
                </div>
                }
                <Loader ref="loader" />
                <div style={extraSpace}/>
            </div>

            <div style={{position: 'fixed', bottom: '0', zIndex: '3', width: '100vw', backgroundColor: 'white'}}>
                <TextField ref="msgInput"
                    style={InputStyle}
                    hintText="Message"
                    onEnterKeyDown={this.sendMsg}/>
                <IconButton
                    iconClassName="mdi mdi-send"
                    iconStyle={{color: '#378E43'}}
                    style={SendStyle}
                    onTouchTap={this.sendMsg} />
            </div>

            </div>
        )
    }
})

var Chat = React.createClass({
    mixins: [material],

    toggleChat: function(){
        var self = this
        this.setState({
            opened: !self.state.opened
        })
    },
    updateUnread: function(){
        this.setState({
            unread: true
        })
    },

    getInitialState: function() {
        return {
            unread: false,
            lastSeen: localStorage.getItem('lastSeenChat'),
            opened: false
        };
    },
    componentDidMount: function(){
        io.on('authenticate', function(msg){ })
        io.emit('addUser', localStorage.getItem('uid'), localStorage.getItem('token'))
    },
    render: function(){
        var self = this,
        iconStyle = {
            position: 'absolute',
            right: '55px',
            top: '10px',
            opacity: '0.9'
        },
        UnreadStyle = {
            position: 'absolute',
            top: '20px',
            right: '65px',
            borderRadius: '50%',
            height: '10px',
            width: '10px',
            backgroundColor: '#F0592A',
            display: (this.state.unread) ? 'block' : 'none'
        }
        return (
            <div>
            <IconButton
                style={iconStyle}
                iconStyle={{color: 'white', fontSize: '20px'}}
                iconClassName="mdi mdi-message"
                onTouchTap={this.toggleChat} />

            <div style={UnreadStyle}></div>
            {
                this.state.opened ? <ChatContainer updateUnread={this.updateUnread}/> : null
            }
            </div>
        )
    }
})

module.exports = Chat
