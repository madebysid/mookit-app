var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    superagent = require('superagent'),
    Loader = require('./loader.js'),

    IconButton = mui.IconButton,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider,
    Avatar = mui.Avatar

var NotificationContainer = React.createClass({

    getInitialState: function(){
        return {
            notifs: [{avatar: null}]
        }
    },
    componentDidMount: function(){
        var self = this
        self.refs.loader.showLoader()
        superagent
            .get(localStorage.getItem('mainUrl') + '/announcement/summary')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err,res){
                self.refs.loader.hideLoader()
                if(err){
                    if(err.timeout==10000)
                        console.log('Timeout')
                }
                else{
                    self.setState({
                        notifs: res.body
                    })
                }
            })
    },
    componentWillUpdate: function(){
        localStorage.setItem('lastSeenNotif', Date.now())
    },
    render: function(){
        var self = this,
        ContainerStyle = {
            position: 'absolute',
            top: '60px',
            bottom: '0',
            width: '100vw',
            boxSizing: 'border-box',
            left: '0',
            backgroundColor: 'white',
            padding: '10px',
            overflowY: 'scroll',
            zIndex: '2'
        },
        arrowStyle = {
            position: 'absolute',
            width: '0',
            height: '0',
            right: '25px',
            top: '44px',
            border: '8px solid',
            borderColor: 'transparent transparent #fff transparent'
        }
        return (
            <div className="notifContainer">
                <div style={arrowStyle}/>
                <div style={ContainerStyle} >
                {
                    (self.state.notifs[0].avatar == null)
                    ? <div style={{paddingTop: '20px', textAlign: 'center', fontFamily: 'RobotoRegular'}}>No announcements available</div>
                    : this.state.notifs.map(function(element, index){
                        return (
                            <div>
                                <ListItem
                                     leftAvatar={<Avatar src={localStorage.getItem('loginUrl') + "/sites/default/files" + element.uri.slice(8)}/>}
                                     disabled={true}
                                     secondaryText={
                                        <p dangerouslySetInnerHTML={{__html: element.body_value}} />
                                     }>
                                    {element.name}
                                </ListItem>
                                <ListDivider />
                            </div>
                        )
                    })
                }
                <Loader ref="loader" />
                </div>
            </div>
        )
    }
})

var Notifs = React.createClass({
    mixins: [material],

    toggleNotif: function(){
        var self = this
        this.setState({
            opened: !self.state.opened
        })
    },

    getInitialState: function() {
        return {
            unread: true,
            lastSeen: localStorage.getItem('lastSeenNotif'),
            opened: false
        };
    },
    render: function(){
        var self = this,
        iconStyle = {
            position: 'absolute',
            right: '10px',
            top: '10px',
            opacity: '0.9'
        },
        UnreadStyle = {
            position: 'absolute',
            top: '20px',
            right: '20px',
            borderRadius: '50%',
            height: '10px',
            width: '10px',
            backgroundColor: '#F0592A',
            display: (this.state.unread) ? 'block' : 'none'
        }
        return (
            <div>
            <IconButton
                style={iconStyle}
                iconStyle={{color: 'white', fontSize: '20px'}}
                iconClassName="mdi mdi-bell"
                onTouchTap={this.toggleNotif} />
            <div style={UnreadStyle}></div>
            {
                this.state.opened ? <NotificationContainer /> : null
            }
            </div>
        )
    }
})

module.exports = Notifs
