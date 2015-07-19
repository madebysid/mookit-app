var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),

    FlatButton = mui.FlatButton,
    Dialog = mui.Dialog

module.exports = React.createClass({
    mixins: [material, Router.Navigation],

    componentWillMount: function(){
        this.refs.offlineDialog.show()
    },


    render: function(){
        var standardActions = [
            { text: 'Okay' }
        ]
        var offlineStyle = {
            position: 'fixed',
            top: '0',
            backgroundColor: 'white',
            height: '100vh',
            width: '100%',
            zIndex: '10000',
        },
        imgStyle = {
            width: '50vw',
            position: 'absolute',
            left: '0',
            right: '0',
            top: '25vh',
            margin: '0 auto'
        },
        btnStyle = {
            color: '#378E43',
            width: '20vw',
            position: 'absolute',
            display: 'block',
            left: '0',
            right: '0',
            margin: '0 auto',
            top: '70vh'
        },
        textStyle = {
            color: '#727272',
            position: 'absolute',
            display: 'block',
            left: '0',
            right: '0',
            top: '60vh',
            margin: '0 auto',
            textAlign: 'center'
        }
        return (
            <Dialog
                title="Error"
                actions={standardActions}
                ref="offlineDialog">
                We're having trouble connecting to our servers. Please check your internet connection or try again later.
            </Dialog>
        )
    }
})