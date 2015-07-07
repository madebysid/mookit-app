var React = require('react'),
    mui = require('material-ui'),
    Router = require('react-router'),
    material = require('./Material.js'),

    links = require('./Links.js'),
    Progress = require('./Progress.js'),
    request = require('superagent'),

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



var SignUpForm = React.createClass({
    render: function(){
        return (
            <div>
                Sign Up Form
            </div>
        )
    }
})

var LoginForm = React.createClass({

    mixins: [Router.Navigation, Progress.Toggle],

    loginDude: function(){
        var self = this
        this.props.loader(true)

        request
            .get(links.login)
            .set('token', links.token)
            .set('uid', '4088')
            .end(function(err, res){
                window.location.hash = "/Dash"
                self.props.loader(false)
            })
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
                <FlatButton style={buttonStyle} onTouchStart={this.loginDude} label="Login" />
            </div>
        )
    }
})

var Login = React.createClass({
    mixins: [material],

    toggleLoader: function(value){
        this.setState({
            showLoader: value
        })
    },

    getInitialState: function(){
        return {
            showLoader: false
        }
    },

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
                <Progress show={this.state.showLoader}/>
                <Card style={CardStyle}>
                    <CardText>
                        <Tabs>
                            <Tab label="Login" style={tabStyle}>
                                <LoginForm loader={this.toggleLoader}></LoginForm>
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