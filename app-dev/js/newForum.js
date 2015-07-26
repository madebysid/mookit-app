var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),
    superagent = require('superagent'),

    FlatButton = mui.FlatButton,
    TextField = mui.TextField

var newTopicForum = React.createClass({
    mixins: [material, Router.Navigation],

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
                   topicId: localStorage.getItem('topicId')})
               .timeout(10000)
               .set('token', localStorage.getItem('token'))
               .set('uid', localStorage.getItem('uid'))
               .end(function(err, res){
                   if(err){
                       if(err.timeout==10000)
                           console.log('Timeout')
                   }
                   else{
                       this.goBack()
                   }
               })
        }
    },
    clearErrors: function(){
        this.refs.forumTitle.setErrorText('')
        this.refs.forumDesc.setErrorText('')
    },

    render: function(){
        var TextFieldStyle = {
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
            <div style={{height: 'calc(100vh - 40px)', overflowY: 'scroll'}}>
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
                <FlatButton onTouchTap={this.goBack} style={CancelStyle}>Cancel</FlatButton>
            </div>
        )
    }
})

module.exports = newTopicForum
