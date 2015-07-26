var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,

    Tabs = mui.Tabs,
    Tab = mui.Tab

var Course = React.createClass({
    mixins: [material, Router.Navigation],

    activeTab: function(tab){
        this.transitionTo(tab.props.label.toLowerCase())
    },

    render: function(){
        var self = this,
        TitleStyle = {
            backgroundColor: '#378E43',
            color: 'white',
            height: '40px',
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
        }
        return (
            <div>
                <div style= {TitleStyle}>
                    {localStorage.getItem('courseTitle')}
                </div>

                <Tabs tabItemContainerStyle={TabStyle} initialSelectedIndex={1}>
                    <Tab onActive={this.activeTab} style={TabInsideStyle} label="FORUMS" >
                        <div>
                            <div style={ExtraDivStyle}></div>
                            <RouteHandler />
                        </div>
                    </Tab>
                    <Tab onActive={this.activeTab} style={TabInsideStyle} label="LECTURES" >
                        <div>
                            <div style={ExtraDivStyle}></div>
                            <RouteHandler />
                        </div>
                    </Tab>
                    <Tab onActive={this.activeTab} style={TabInsideStyle} label="RESOURCES" >
                        <div>
                            <div style={ExtraDivStyle}></div>
                            <RouteHandler />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
})

module.exports = Course
