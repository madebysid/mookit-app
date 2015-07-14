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
    Dialog = mui.Dialog

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

        data.forEach(function (element, index) {
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
    goBackDude: function(){
        var self = this
        if(this.state.lecture == true)
            self.setState({
                lecture: false
            })
        else{
            this.transitionTo('/courses')
            localStorage.setItem('token', '')
            localStorage.setItem('uid', '')
        }
    },


    getInitialState: function(){
        return {
            lecture: false,
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
            .unset('Content-Type')
            .timeout(10000)
            .end(function(err, res){
                if(err){
                    if(err.timeout==10000){
                        self.setState({
                            offline: true
                        })
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
        var AppBarStyle = {
            backgroundColor: '#378E43'
        },
        TitleStyle = {
            backgroundColor: '#378E43',
            color: 'white',
            height: '10vh',
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
        }
        return (
            <div>
                {
                    this.state.offline ? <Offline /> : null
                }
                <AppBar
                    iconElementRight={
                        <IconMenu iconButtonElement={
                            <IconButton iconStyle={{color: 'white'}} iconClassName="mdi mdi-dots-vertical"></IconButton>
                        }>
                          <MenuItem primaryText="Settings" index={0}/>
                          <MenuItem primaryText="About" index={1}/>
                        </IconMenu>
                    }
                    iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={this.goBackDude}
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
                            <CircularProgress mode="indeterminate" size={0.5} style={loaderStyle}/>
                            <Forums />
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
            </div>
        )
    }
})