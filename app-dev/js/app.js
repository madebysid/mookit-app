var React = require('react/addons'),
    material = require('./material.js'),
    mui = require('material-ui'),
    superagent = require('superagent'),
    Router = require('react-router'),
    Gems = require('./gems.js'),
    RouteHandler = Router.RouteHandler,
    Route = Router.Route,
    CSSTransitionGroup = React.addons.CSSTransitionGroup,

    AppBar = mui.AppBar,
    Dialog = mui.Dialog

var App = React.createClass({
    mixins: [material, Router.Navigation, Router.State],

    goBackDude: function(){
        var self = this
        if (this.getRoutes()[2].name == 'home')
            self.refs.confirmDialog.show()
        else
            self.goBack()
    },
    logout: function(){
        var self = this
        superagent
            .get(localStorage.getItem('mainUrl') + '/logout')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err, res){
                if(err){
                    if(err.timeout==10000)
                        console.log('Timeout')
                }
                else
                    self.transitionTo('login')
            })
    },
    render: function(){
        var self = this,
        AppBarStyle = {
            backgroundColor: '#378E43'
        },
        confirmActions = [
            {text: 'No'},
            {text: 'Yes', onTouchTap: self.logout}
        ]
        return (
            <div>
                <AppBar
                    iconClassNameLeft="mdi mdi-arrow-left"
                    onLeftIconButtonTouchTap={this.goBackDude}
                    zDepth={0}
                    style={AppBarStyle} />
                <Gems />
                <Dialog
                    ref="confirmDialog"
                    title="Confirm"
                    actions={confirmActions}>
                Are you sure you want to log out?
                </Dialog>

                <CSSTransitionGroup transitionName="newPage">
                    <RouteHandler />
                </CSSTransitionGroup>
            </div>
        )
    }
})

module.exports = App
