var React = require('react/addons'),
    mui = require('material-ui'),
    material = require('./material.js'),

    IconButton = mui.IconButton

var NotificationContainer = React.createClass({
    render: function(){
        var ContainerStyle = {
            position: 'absolute',
            top: '60px',
            bottom: '0',
            width: '100vw',
            boxSizing: 'border-box',
            left: '0',
            zIndex: '1000',
            backgroundColor: 'white',
            padding: '10px'
        }
        return (
            <div className="notificationContainer">
                <div style={ContainerStyle} >
                    Notification Container
                </div>
            </div>
        )
    }
})

module.exports = React.createClass({
    toggleNotification: function(){
        var self = this
        this.setState({
            unread: false,
            opened: !self.state.opened
        })
    },

    getInitialState: function(){
        return {
            unread: true,
            opened: false
        }
    },
    render: function(){
        var self = this,
            IconStyle = {
                position: 'absolute',
                color: 'white',
                top: '8px',
                right: '50px',
                opacity: '0.9',
                fontSize: '20px'
            },
            UnreadStyle = {
                position: 'absolute',
                top: '10px',
                right: '13px',
                borderRadius: '50%',
                height: '10px',
                width: '10px',
                backgroundColor: '#F0592A',
                display: (this.state.unread) ? 'block' : 'none'
            }

        return (
            <div>
                <div style={IconStyle}>
                    <IconButton
                        iconStyle={{color: 'white', fontSize: '20px'}}
                        iconClassName="mdi mdi-bell"
                        onTouchEnd={this.toggleNotification} />
                    <div style={UnreadStyle}></div>
                </div>
                {
                    this.state.opened ? <NotificationContainer /> : null
                }
            </div>
        )
    }
})