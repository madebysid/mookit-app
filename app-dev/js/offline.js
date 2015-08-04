var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),

    Dialog = mui.Dialog

var Offline = React.createClass({
    mixins: [material, Router.Navigation],

    componentDidMount: function(){
        var self = this
        self.refs.offlineDialog.show()
    },
    render: function(){
        var self = this,
        offlineActions = [
            {text: 'Okay'},
            {text: 'Retry', onTouchTap: self.goBack}
        ]
        return (
            <div>
                <Dialog
                    ref="offlineDialog"
                    title="Confirm"
                    actions={offlineActions}>
                We're having trouble connecting to our servers. Please try again later.
                </Dialog>

            </div>
        )
    }
})

module.exports = Offline
