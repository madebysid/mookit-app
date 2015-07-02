var React = require('react'),
    mui = require('material-ui'),
    material = require('./Material.js'),

    TextField = mui.TextField,
    IconButton = mui.IconButton,
    ListItem = mui.ListItem,
    Avatar = mui.Avatar

React.initializeTouchEvents(true)

var IncomingChat = React.createClass({
    render: function(){
        return (
            <ListItem disableTouchTap={true} leftAvatar={<Avatar />} secondaryText={<p>{this.props.author}</p>}>
                {this.props.text}
            </ListItem>
        )
    }
})

var OutgoingChat = React.createClass({
    render: function(){
        return (
            <ListItem disableTouchTap={true} style={{textAlign: 'right', backgroundColor: '#EDECEC'}} secondaryText={<p>You</p>}>
                {this.props.text}
            </ListItem>
        )
    }
})

var ChatWindow = React.createClass({
    componentWillUpdate: function() {
        var node = this.getDOMNode();
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    },

    componentDidUpdate: function() {
        if (this.shouldScrollBottom) {
            var node = this.getDOMNode();
            node.scrollTop = node.scrollHeight
        }
    },
    render: function(){
        var WindowStyle = {
            height: '55vh',
            margin: '-1vh 5vw',
            padding: '1vh',
            overflow: 'scroll'
        },
        self = this
        return (
            <div style={WindowStyle}>
                {
                    this.props.incoming.map(function(element, index){
                        return (
                            <IncomingChat text={element.text} author={element.author}></IncomingChat>
                        )
                    })
                }
                {
                    this.props.outgoing.map(function(element, index){
                        return (
                            <OutgoingChat text={self.props.outgoing[index]}></OutgoingChat>
                        )
                    })
                }
            </div>
        )
    }
})

var ChatInput = React.createClass({
    sendMessage: function() {
        this.props.onSend(this.state.message)
        this.setState({
            message: ""
        })
    },
    handleTextFieldChange: function(e) {
        this.setState({
            message: e.target.value
        });
    },


    getInitialState: function(){
        return {
            message: ""
        }
    },
    render: function(){
        var Style = {
            position: 'absolute',
            bottom: '-10vh',
            left: '5vw'
        },
        SendStyle = {
            position: 'absolute',
            bottom: '-10vh',
            right: '0'
        }
        return (
            <div>
                <TextField value={this.state.message} onChange={this.handleTextFieldChange} style={Style} hintText="Message" onEnterKeyDown={this.sendMessage}>

                </TextField>
                <IconButton onTouchStart={this.sendMessage} style={SendStyle} iconStyle={{color: '#838384'}} iconClassName="mdi mdi-send"></IconButton>
            </div>
        )
    }
})

var Chat = React.createClass({
    mixins: [material],


    handleSend: function(msg){
        var newMsg = this.state.outgoing
        newMsg.push(msg)
        this.setState({
            outgoing: newMsg
        })
    },


    getInitialState: function(){
        return {
            incoming: [],
            outgoing: []
        }
    },
    componentDidMount: function(){
        this.setState({
            incoming: [{
                text: "Welcome to the annual villains conference! :|",
                author: "mojo jojo"
            },{
                text: "Hey all!",
                author: "professor evil"
            }]
        })
    },

    render: function(){
        var spaceStyle = {
            width: '100%',
            height: '15px'
        },
        InputStyle={
            width: '100%'
        }

        return (
            <div>
                <div style={spaceStyle}></div>
                <ChatWindow incoming={this.state.incoming} outgoing={this.state.outgoing}></ChatWindow>
                <ChatInput onSend={this.handleSend} style={InputStyle}></ChatInput>
            </div>
        )
    }

})

module.exports = Chat