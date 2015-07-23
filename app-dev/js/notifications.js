var React = require('react/addons'),
    mui = require('material-ui'),
    material = require('./material.js'),
    superagent = require('superagent'),
    Offline = require('./offline.js'),

    IconButton = mui.IconButton,
    CircularProgress = mui.CircularProgress,
    List = mui.List,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider,
    Avatar = mui.Avatar

var NotificationContainer = React.createClass({

    getInitialState: function(){
        return {
            notifs: [],
            loading: true,
            offline: false
        }
    },
    componentWillMount: function(){
        var self = this
        superagent
            .get(localStorage.getItem('mainUrl') + '/announcement/summary')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err,res){
                if(err){
                    if(err.timeout==10000)
                        self.setState({
                            offline: true,
                            loading: false
                        })
                }
                else{
                    self.setState({
                        notifs: res.body,
                        loading: false
                    })
                }
            })
    },

    render: function(){
        var ContainerStyle = {
            position: 'absolute',
            top: '60px',
            bottom: '0',
            width: '100vw',
            boxSizing: 'border-box',
            left: '0',
            zIndex: '16000',
            backgroundColor: 'white',
            padding: '10px',
            overflowY: 'scroll'
        },
        loaderStyle = {
            position: 'absolute',
            left: '0',
            right: '0',
            top: '30vh',
            margin: '0 auto',
            display: this.state.loading ? 'block' : 'none'
        }
        return (
            <div className="notificationContainer">
                <div style={ContainerStyle} >
                    {
                        this.state.offline ? <Offline /> : null
                    }
                    {
                        this.state.notifs.map(function(element, index){
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
                    <CircularProgress mode="indeterminate" size={0.5} style={loaderStyle}/>
                </div>
            </div>
        )
    }
})

module.exports = React.createClass({
    toggleNotification: function(){
        var self = this
        if(this.state.opened)
            this.props.onOpen()
        this.setState({
            unread: false,
            opened: !self.state.opened
        })
    },

    getInitialState: function(){
        return {
            unread: true,
            opened: this.props.opened
        }
    },
    render: function(){
        var self = this,
            IconStyle = {
                position: 'absolute',
                color: 'white',
                top: '8px',
                right: '10px',
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
                        onTouchTap={this.toggleNotification} />
                    <div style={UnreadStyle}></div>
                </div>
                {
                    this.state.opened ? <NotificationContainer /> : null
                }
            </div>
        )
    }
})
