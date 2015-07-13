var React = require('react'),
    mui = require('material-ui'),
    material = require('./material.js'),
    links = require('./links.js'),
    superagent = require('superagent'),
    Router = require('react-router'),

    Card = mui.Card,
    CardText = mui.CardText,
    FlatButton = mui.FlatButton,
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField

module.exports = React.createClass({
    mixins: [material, Router.Navigation],

    login: function(){
        //var username = this.refs.username.getValue()
        //var password = this.refs.password.getValue()
        var url = links.loginMain + "/api/user/login.json";
        var self = this
        superagent
            .post(url)
            .type('form')
            .send({
                username: 'user',
                password: '1'
            })
            .end(function(err, res){
                console.log(res)
                if(err)
                    console.log('Wrong')
                else {
                    localStorage.setItem('token', res.body.token);
                    localStorage.setItem('uid', res.body.uid);
                    self.transitionTo('/course')
                }

            })
    },

    render: function(){
        var CardStyle = {
            width: '80%',
            position: 'absolute',
            margin: '0 auto',
            left: '0',
            right: '0',
            top: '50px'
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
            bottom: '50px',
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
        }
        return (
            <div>
                <div style={{backgroundColor: '#EDECEC'}}>
                    <Card style={CardStyle}>
                        <CardText>
                            <img src="img/logo.svg" style={LogoStyle}/>

                            <TextField ref="username" style={TextFieldStyle} floatingLabelText="Username"></TextField>
                            <TextField ref="password" style={TextFieldStyle} floatingLabelText="Password">
                                <input type="password" />
                            </TextField>
                            <FlatButton onTouchEnd={this.login} style={LoginStyle} label="Login"></FlatButton>

                            <div style={MoreTextStyle}>
                                or sign in using
                            </div>

                            <img src="img/facebook.svg" style={FacebookStyle}/>
                            <img src="img/twitter.svg" style={TwitterStyle}/>

                        </CardText>
                    </Card>
                </div>

                <div style={SignUpContainer}>
                    Don't have an account yet? <br />
                    <FlatButton style={SignUpStyle} label="Sign Up"></FlatButton>
                </div>
            </div>
        )
    }
})