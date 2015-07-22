var React = require('react'),
    mui = require('material-ui'),
    material = require('./material.js'),
    Router = require('react-router'),
    superagent = require('superagent'),

    Forums = require('./forums.js'),
    Lectures = require('./lectures.js'),
    Resources = require('./resources.js'),
    Notifications = require('./notifications.js'),
    Chat = require('./chat.js'),
    Offline = require('./offline.js'),

    AppBar = mui.AppBar,
    Tabs = mui.Tabs,
    Tab = mui.Tab,
    IconButton = mui.IconButton,
    IconMenu = mui.IconMenu,
    MenuItem = require('material-ui/lib/menus/menu-item'),
    CircularProgress = mui.CircularProgress,
    Dialog = mui.Dialog,
    Snackbar = mui.Snackbar

var expanded = []

module.exports = React.createClass({
    mixins: [material, Router.Navigation],

    sortByWeeks: function(data) {
        var newData = [],
            maxWeek = 0

        data.forEach(function (element) {
            if (element.week.slice(5) > maxWeek)
                maxWeek = element.week.slice(5)
        })

        for (var i = 0; i <= maxWeek; i++) {
            newData[i] = new Array()
            expanded[i] = false
        }

        data.forEach(function (element) {
            newData[parseInt(element.week.slice(5))].push(element)
        })

        return newData
    },
    tabChange: function(){
        this.setState({
            lecture: false
        })
    },
    goToLecture: function(){
        this.setState({
            lecture: true
        })
    },
    createForum: function(){
        this.setState({
            newForum: true
        })
    },
    cancelCreate: function(){
        this.setState({
            newForum: false
        })
    },
    goBackDude: function(){
        var self = this
        if(self.state.lecture == true)
            self.setState({
                lecture: false
            })
        else if(self.state.newForum == true){
            self.setState({
                newForum: false
            })
        }
    },
    openSettings: function(){
        this.refs.settingsDialog.show();
    },
    saveSettings: function(){
        this.refs.settingsDialog.dismiss();
        this.refs.settingsSnackbar.show();
    },
    openAbout: function(){
        this.refs.aboutDialog.show();
    },
    menuOpen: function(e, item){
        item.props.index==0 ? this.openSettings() : this.openAbout();
    },
    logout: function(){
        this.transitionTo('/login')
    },


    getInitialState: function(){
        return {
            lecture: false,
            newForum: false,
            data: [],
            loading: true,
            error: false,
            offline: false
        }
    },
    componentWillMount: function(){
        var self = this
        superagent
            .get(localStorage.getItem('mainUrl') + '/lectures/summary')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err, res){
                if(err){
                    if(err.timeout==10000){
                        self.setState({
                            offline: true
                        })
                    }
                    else {
                        document.addEventListener("resume", function() {
                            self.refs.logoutDialog.show()
                        }, false);
                    }
                    self.setState({
                        error: true
                    })
                }
                else
                    self.setState({
                        data: self.sortByWeeks(res.body),
                        loading: false
                    })
            })
    },
    render: function(){
        var self = this,
        AppBarStyle = {
            backgroundColor: '#378E43'
        },
        TitleStyle = {
            backgroundColor: '#378E43',
            color: 'white',
            height: '60px',
            paddingLeft: '20vw',
            fontSize: '1.5em'
        },
        TabStyle = {
            backgroundColor: '#378E43'
        },
        TabInsideStyle = {
            fontSize: '0.8em',
            fontFamily: 'RobotoLight',
            overflow: 'scroll'
        },
        ExtraDivStyle = {
            width: '100%',
            height: '1vh',
            backgroundColor: '#378E43'
        },
        loaderStyle = {
            position: 'absolute',
            left: '0',
            right: '0',
            margin: '0 auto',
            top: '30vh',
            display: (this.state.loading) ? 'block' : 'none',
        },
        settingsDialog = [
            { text: 'Cancel' },
            { text: 'Save', onTouchTap: self.saveSettings }
        ],
        aboutDialog = [
            { text: 'Okay' }
        ],
        logoutDialog = [
            {text: 'Okay', onTouchTap: self.logout}
        ]
        return (
            <div>
                {
                    this.state.offline ? <Offline /> : null
                }
                <AppBar
                    iconElementRight={
                        <IconMenu onItemTouchTap={this.menuOpen} iconButtonElement={
                            <IconButton iconStyle={{color: 'white'}} iconClassName="mdi mdi-dots-vertical"></IconButton>
                        }>
                          <MenuItem index={0} primaryText="Settings" index={0}/>
                          <MenuItem index={1} primaryText="About" index={1}/>
                        </IconMenu>
                    }
                    iconClassNameLeft={(!this.state.lecture && !this.state.newForum) ? "none" : "mdi mdi-arrow-left"}
                    onLeftIconButtonTouchTap={this.goBackDude}
                    zDepth={0}
                    style={AppBarStyle} />

                <Notifications />
                <Chat />

                <div style= {TitleStyle}>
                    {localStorage.getItem('courseTitle')}
                </div>

                <Tabs onChange={this.tabChange} tabItemContainerStyle={TabStyle} initialSelectedIndex={1}>
                    <Tab style={TabInsideStyle} label="FORUMS" >
                        <div>
                            <div style={ExtraDivStyle}></div>
                            <CircularProgress mode="indeterminate" size={0.5} style={loaderStyle} />
                            <Forums createForum={this.createForum} cancelCreate={this.cancelCreate} forum={this.state.newForum}/>
                        </div>
                    </Tab>
                    <Tab style={TabInsideStyle} label="LECTURES" >
                        <div>
                            <div style={ExtraDivStyle}></div>
                            <CircularProgress mode="indeterminate" size={0.5} style={loaderStyle}/>
                            <Lectures goToLecture={this.goToLecture} lecture={this.state.lecture} expanded={expanded} repeatEntity={this.state.data} />
                        </div>
                    </Tab>
                    <Tab style={TabInsideStyle} label="RESOURCES" >
                        <div>
                            <div style={ExtraDivStyle}></div>
                            <CircularProgress mode="indeterminate" size={0.5} style={loaderStyle}/>
                            <Resources />
                        </div>
                    </Tab>
                </Tabs>



                <Dialog
                    ref="settingsDialog"
                    title="Settings"
                    actions={settingsDialog}
                    modal={true}>
                    Settings dialog. Put settings in here
                </Dialog>

                <Dialog
                    ref="aboutDialog"
                    title="About"
                    actions={aboutDialog}
                    modal={true}>
                    Something about the app, or the project, maybe
                </Dialog>

                <Dialog
                    ref="logoutDialog"
                    title="About"
                    actions={logoutDialog}
                    modal={true}>
                    You were logged out due to inactivity
                </Dialog>

                <Snackbar
                    ref="settingsSnackbar"
                    message="Settings saved"
                    action="Okay"
                    autoHideDuration={2000}
                    style={{position: 'absolute', left: '-30px'}}/>
            </div>
        )
    }
})
