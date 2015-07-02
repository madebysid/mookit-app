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
                    this.props.messages.map(function(element, index){
                        return (
                            (self.props.messages[index].author != 'jerry') ? (<IncomingChat text={self.props.messages[index].text} author={element.author} />) : (<OutgoingChat text={self.props.messages[index].text} />)
                        )
                    })
                }
            </div>
        )
    }
})

var ChatInput = React.createClass({
    sendMessage: function() {
        if(this.state.message != ""){
            this.props.onSend(this.state.message)
            this.setState({
                message: ""
            })
        }
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
        var newMsg = this.state.messages
        newMsg.push({text: msg, author: "jerry"})
        this.setState({
            messages: newMsg
        })
    },
    RecieveMessage: function(){
        var newMsg = [],
            self = this
        newMsg = self.state.messages
        newMsg.push({text: "Hello de lo!", author: "Major Lazer"})
        self.setState({
            messages: newMsg
        })
    },


    getInitialState: function(){
        return {
            messages: []
        }
    },
    componentDidMount: function(){
        var self = this
        this.setState({
            messages: [{
                text: "Welcome to the annual villains conference! :|",
                author: "mojo jojo"
            },{
                text: "Hey all!",
                author: "professor evil"
            }]
        })
        var iId = setInterval(function(){
            self.RecieveMessage()
        },4000)
        setTimeout(function(){
            clearInterval(iId)
        },12000)
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
                <ChatWindow messages={this.state.messages}></ChatWindow>
                <ChatInput onSend={this.handleSend} style={InputStyle}></ChatInput>
            </div>
        )
    }

})

module.exports = Chat