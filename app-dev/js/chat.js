var React = require('react/addons'),
    mui = require('material-ui'),
    material = require('./material.js'),
    superagent = require('superagent'),
    links = require('./links.js'),

    IconButton = mui.IconButton,
    FlatButton = mui.FlatButton,
    Avatar = mui.Avatar,
    TextField = mui.TextField

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
            }
        return (
            <div style={ContainerStyle}>
                <Avatar color={"white"} backgroundColor={'#56C7DE'} style={{float: 'left'}}>
                    {this.props.sender.slice(0,1).toUpperCase()}
                </Avatar>

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
        var ContainerStyle = {
                marginBottom: '20px'
            },
            MessageStyle = {
                backgroundColor: '#378E43',
                color: 'white',
                marginRight: '60px',
                marginLeft: '40px',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'right'
            },
            SenderStyle = {
                color: 'white',
                opacity: '0.4',
                width: '100%',
                fontSize: '0.7em',
                fontFamily: 'RobotoRegular',
                textAlign: 'left'
            }
        return (
            <div style={ContainerStyle}>
                <Avatar color={"white"} backgroundColor={'#49B752'} style={{float: 'right'}}>
                    Y
                </Avatar>

                <div style={MessageStyle} className="outgoingMsg">
                    {this.props.message}
                    <div style={SenderStyle}>
                        You
                    </div>
                </div>
            </div>
        )
    }
})

var ChatContainer = React.createClass({
    loadPrevious: function(){
        var self = this
        superagent
            .get(links.main + '/getChat/' + self.state.oldest)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .end(function(err,res){
                newChat = res.body.reverse().concat(self.state.chat)
                self.setState({
                    previousLoaded: true,
                    chat: newChat,
                    oldest: res.body[0].timestamp
                })
            })
    },

    componentWillUpdate: function() {
        var node = this.refs.chatContainer.getDOMNode();
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    },

    componentDidUpdate: function() {
        if (this.shouldScrollBottom) {
            var node = this.refs.chatContainer.getDOMNode();
            node.scrollTop = node.scrollHeight
        }
    },
    componentWillMount: function(){
        var self = this
        localStorage.setItem('lastSeen', Date.now())
        superagent
            .get(links.main + '/getChat/' + localStorage.getItem('lastSeen'))
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .end(function(err,res){
                self.setState({
                    chat: res.body.reverse(),
                    oldest: res.body[res.body.length-1].timestamp,
                    newest: res.body[0].timestamp
                })
            })
    },
    getInitialState: function(){
        return {
            chat: [],
            oldest: 0,
            newest: 0,
            previousLoaded: false
        }
    },
    render: function(){
        var ContainerStyle = {
            position: 'absolute',
            top: '60px',
            bottom: '0',
            width: '100vw',
            boxSizing: 'border-box',
            left: '0',
            zIndex: '1000',
            backgroundColor: 'white',
            padding: '20px',
            paddingTop: '40px',
            overflow: 'scroll',
            overflowX: 'hidden'
        },
        EmptyStyle = {
            position: 'absolute',
            top: '60px',
            zIndex: '2000',
            height: '20px',
            width: '100vw',
            backgroundColor: 'white'
        },
        FadeStyle = {
            position: 'absolute',
            top: '80px',
            zIndex: '2000',
            height: '50px',
            width: '100vw',
            background: 'linear-gradient(white, transparent)'
        },
        Empty2Style = {
            position: 'fixed',
            bottom: '0px',
            zIndex: '2000',
            height: '50px',
            width: '100vw',
            backgroundColor: 'white'
        },
        Empty3Style = {
            bottom: '50px',
            zIndex: '2000',
            height: '40px',
            width: '100vw',
            backgroundColor: 'white'
        },
        InputStyle = {
            position: 'fixed',
            bottom: '0',
            zIndex: '3000'
        },
        SendStyle = {
            position: 'fixed',
            bottom: '0',
            zIndex: '3000',
            right: '0'
        },
        previousStyle = {
            display: 'block',
            margin: '0px auto',
            width: '50vw',
            textAlign: 'center',
            fontSize: '0.8em',
            color: '#378E43',
            marginTop: '15px'
        }
        return (
            <div className="chatContainer">
                <div style={EmptyStyle} />
                <div style={FadeStyle} />
                <div style={ContainerStyle} ref="chatContainer">
                    <FlatButton style={previousStyle} onClick={this.loadPrevious}>Load Previous</FlatButton>
                    <div style={Empty3Style} />

                    {
                        this.state.chat.map(function(element){
                            return (
                                (element.uid == localStorage.getItem('uid'))
                                ? <Outgoing message={element.msg}/>
                                : <Incoming sender={element.userName} message={element.msg}/>
                            )
                        })
                    }

                    <div style={Empty3Style} />


                    <div style={Empty2Style} />
                    <TextField style={InputStyle} hintText="Message" />
                    <IconButton iconClassName="mdi mdi-send" style={SendStyle}/>
                </div>
            </div>
        )
    }
})

module.exports = React.createClass({
    toggleChat: function(){
        var self = this
        localStorage.setItem('lastSeen', Date.now())
        this.setState({
            unread: false,
            opened: !self.state.opened
        })
    },

    getInitialState: function(){
        var self = this
        setInterval(function(){
            superagent
                .get(links.main + '/getChat/' + Date.now())
                .set('token', localStorage.getItem('token'))
                .set('uid', localStorage.getItem('uid'))
                .end(function(err,res){
                    if (res.body[0].timestamp > parseInt(localStorage.getItem('lastSeen').slice(0,10)))
                    {
                        self.setState({
                            unread: true
                        })
                    }
                })
        }, 2000)
        return {
            unread: (Date.now() > localStorage.getItem('lastSeen') && localStorage.getItem('newMsg')),
            opened: false,
            new: false
        }
    },
    render: function(){
        var IconStyle = {
            position: 'absolute',
            color: 'white',
            top: '8px',
            right: '100px',
            opacity: '0.9',
            fontSize: '20px'
        },
        UnreadStyle = {
            position: 'absolute',
            top: '10px',
            right: '10px',
            borderRadius: '50%',
            height: '10px',
            width: '10px',
            backgroundColor: '#F0592A',
            display: (this.state.unread) ? 'block' : 'none'
        }

        return (
            <div>
                <div style={IconStyle}>
                    <IconButton
                        iconStyle={{color: 'white', fontSize: '20px'}}
                        iconClassName="mdi mdi-message"
                        onTouchEnd={this.toggleChat} />
                    <div style={UnreadStyle}></div>
                </div>
                {
                    this.state.opened ? <ChatContainer /> : null
                }
            </div>
        )
    }
})