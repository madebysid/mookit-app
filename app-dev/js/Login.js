var React = require('react'),
    mui = require('material-ui'),
    material = require('./Material.js'),
    TextField= mui.TextField,
    FlatButton = mui.FlatButton,
    Tabs = mui.Tabs,
    Tab = mui.Tab,
    Card = mui.Card,
    CardText = mui.CardText

/*
*
*   LOGIN
*
* */

var LoginForm = React.createClass({

    loginDude: function(){
        window.location.hash = "/Dash"
    },

    render: function(){
        var textStyle = {
            width: '60vw',
            fontSize: '0.75em'
        },
        buttonStyle = {
            width: '20vw',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#52BA66',
            color: 'white',
            fontSize: '0.75em'
        }
        return (
            <div>
                <TextField style={textStyle} floatingLabelText="Username" />
                <TextField style={textStyle} floatingLabelText="Password">
                    <input type="password"/>
                </TextField>
                <FlatButton style={buttonStyle} label="Login" onClick={this.loginDude}></FlatButton>
            </div>
        )
    }
})

var SignUpForm = React.createClass({
    render: function(){
        return (
            <div>
                Sign Up Form
            </div>
        )
    }
})

var Login = React.createClass({
    mixins: [material],

    render: function(){
        var CardStyle = {
            width: '70vw',
            height: 'auto',
            marginTop: '25vh',
            marginLeft: 'auto',
            marginRight: 'auto',
            animation: 'fly-in-from-bottom .3s ease both',
        },
        tabStyle = {
            backgroundColor: 'white',
            color: 'red',
            opacity: '1',
            overflow: 'hidden'
        }
        return (
            <div>
                <Card style={CardStyle}>
                    <CardText>
                        <Tabs>
                            <Tab label="Login" style={tabStyle}>
                                <LoginForm></LoginForm>
                            </Tab>
                            <Tab label="Sign Up" style={tabStyle}>
                                <SignUpForm></SignUpForm>
                            </Tab>
                        </Tabs>
                    </CardText>
                </Card>
            </div>
        )
    }
})

module.exports = Login;