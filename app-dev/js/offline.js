var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),

    Dialog = mui.Dialog

module.exports = React.createClass({
    mixins: [material],

    componentWillMount: function(){
        var self = this
        console.log(self.refs.OfflineDialog)
    },


    render: function(){
        var standardActions = [
            { text: 'Okay' }
        ]
        return (
            <div>
                <Dialog
                    ref="OfflineDialog"
                    title="Error"
                    actions={standardActions}>
                    We're having trouble connecting to our servers. Please check your internet connection or try again later.
                </Dialog>
            </div>

        )
    }
})