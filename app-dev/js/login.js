var React = require('react'),
    mui = require('material-ui'),
    material = require('./material.js'),
    superagent = require('superagent'),
    Router = require('react-router'),
    Offline = require('./offline.js'),
    courses = require('../courseList.json'),

    Card = mui.Card,
    CardText = mui.CardText,
    FlatButton = mui.FlatButton,
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    LinearProgress = mui.LinearProgress,
    Dialog = mui.Dialog

module.exports = React.createClass({
    mixins: [material, Router.Navigation, React.addons.LinkedStateMixin],

    login: function(){
        var self = this,
            username = this.state.username,
            password = this.state.password
        self.setState({
            loading: true
        })
        superagent
            .post(localStorage.getItem('loginUrl') + "/api/user/login.json")
            .type('form')
            .send({
                username: username,
                password: password
            })
            .timeout(10000)
            .end(function(err, res){
                self.setState({
                    loading: false
                })
                if(err){
                    if(err.timeout == 10000 || err.status == 106 || err.status == 0) {
                        self.setState({
                            offline: true
                        })
                    }
                    else if(err.status == 403 || err.status == 401){
                        self.refs.ErrorDialog.show()
                    }
                }
                else {
                    localStorage.setItem('token', res.body.token);
                    localStorage.setItem('uid', res.body.uid);
                    self.transitionTo('/course')
                }
            })
    },
    passUpdate: function(e){
        this.setState({
            password: e.target.value
        })
    },
    goBackDude: function(){
        this.transitionTo('/courses')
    },

    getInitialState: function(){
        localStorage.setItem('courseTitle', courses[0].title)
        localStorage.setItem('mainUrl', courses[0].main)
        localStorage.setItem('loginUrl', courses[0].login)
        localStorage.setItem('lastSeen', Date.now())
        return {
            username: '',
            password: '',
            loading: false,
            offline: false
        }
    },
    render: function(){
        var CardStyle = {
            width: '80%',
            position: 'absolute',
            margin: '0 auto',
            left: '0',
            right: '0',
            top: '20px'
        },
        LogoStyle = {
            display: 'block',
            margin: '0 auto',
            width: '75px',
            padding: '10px'
        },
        TextFieldStyle = {
            display: 'block',
            width: '75%',
            margin: '0 auto',
            fontSize: '0.8em'
        },
        LoginStyle = {
            backgroundColor: '#378E43',
            color: 'white',
            marginTop: '20px',
            display: 'block',
            width: '30%',
            margin: '0 auto',
            fontSize: '0.8em',
            fontFamily: 'RobotoLight'
        },
        ProgressStyle = {
            marginTop: '20px',
            display: 'block',
            width: '30%',
            margin: '0 auto'
        },
        MoreTextStyle = {
            fontSize: '0.8em',
            color: '#727272',
            paddingTop: '20px',
            textAlign: 'center'
        },
        SignUpContainer = {
            width: '80%',
            position: 'absolute',
            margin: '0 auto',
            left: '0',
            right: '0',
            bottom: '80px',
            textAlign: 'center',
            color: '#727272',
            fontSize: '0.8em'
        },
        SignUpStyle = {
            color: '#378E43'
        },
        FacebookStyle = {
            width: '32px',
            marginLeft: '60px',
            marginTop: '20px'
        },
        TwitterStyle = {
            width: '32px',
            float: 'right',
            marginRight: '60px',
            marginTop: '20px'
        },
        standardActions = [
            { text: 'Okay' }
        ];
        return (
            <div>
                {
                    this.state.offline ? <Offline /> : null
                }

                <div style={{backgroundColor: '#EDECEC'}}>
                    <Card style={CardStyle}>
                        <CardText>
                            <img src="img/logo.svg" style={LogoStyle}/>

                            <TextField
                                style={TextFieldStyle}
                                floatingLabelText="Username"
                                valueLink={this.linkState('username')}/>
                            <TextField
                                style={TextFieldStyle}
                                hintText="Password"
                                floatingLabelText="Password"
                                onChange={this.passUpdate}
                                onEnterKeyDown={this.login}>
                                <input type="password"/>
                            </TextField>

                            {
                                this.state.loading
                                    ? <LinearProgress mode="indeterminate" style={ProgressStyle} />
                                    : <FlatButton onTouchTap={this.login} style={LoginStyle}>Login</FlatButton>
                            }

                            <div style={MoreTextStyle}>
                                or sign in using
                            </div>

                            <img src="img/facebook.svg" style={FacebookStyle}/>
                            <img src="img/twitter.svg" style={TwitterStyle}/>

                        </CardText>
                    </Card>
                </div>

                <Dialog
                    title="Error"
                    actions={standardActions}
                    ref="ErrorDialog">
                    Please check username and/or password
                </Dialog>

                <div style={SignUpContainer}>
                    Don't have an account yet? <br />
                    <FlatButton style={SignUpStyle} label="Sign Up"></FlatButton>
                </div>
            </div>
        )
    }
})