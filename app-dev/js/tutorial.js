var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Swipe = require('react-swipe'),
    Router = require('react-router'),

    IconButton = mui.IconButton

module.exports = React.createClass({
    mixins: [material, Router.Navigation],


    nextImage: function(){
        var self = this
        this.refs.ReactSwipe.swipe.next();
        if(this.state.selected === "3")
            this.transitionTo("/dash")
        this.setState({
            selected: (parseInt(self.state.selected)+1).toString()
        })
    },

    getInitialState: function(){
        return {
            selected: "0"
        }
    },
    render: function(){
        var ContainerStyle = {
            backgroundColor: "#4CAE4E",
            height: '100%',
        },
        imgStyle = {
            position: 'absolute',
            left: '0',
            right: '0',
            margin: '0 auto',
            bottom: '20vh',
            width: '40vw',
        },
        markerContainerStyle = {
            position: 'absolute',
            left: '0',
            right: '0',
            margin: '0 auto',
            bottom: '5vh',
            width: '90px',
        },
        markerStyle = {
            float: 'left',
            borderRadius: '50%',
            backgroundColor: 'white',
            width: '10px',
            height: '10px',
            margin: '0 10px',
        },
        nextBtnStyle = {
            position: 'absolute',
            right: '10px',
            zIndex: '1000'
        }
        return (
            <div style={ContainerStyle}>
                <IconButton iconClassName="mdi mdi-chevron-right" iconStyle={{color: 'white'}} style={nextBtnStyle} onTouchTap={this.nextImage}>

                </IconButton>
                <Swipe ref="ReactSwipe" slideToIndex={1} continuous={false} >
                    <div style={{height: '100vh'}}>
                        <img style={imgStyle} src="img/iphone.svg"/>
                    </div>
                    <div style={{height: '100vh'}}>
                        <img style={imgStyle} src="img/iphone.svg"/>
                    </div>
                    <div style={{height: '100vh'}}>
                        <img style={imgStyle} src="img/iphone.svg"/>
                    </div>
                </Swipe>
                <div style={markerContainerStyle}>
                    <div ref="marker1" style={markerStyle}></div>
                    <div ref="marker2" style={markerStyle}></div>
                    <div ref="marker3" style={markerStyle}></div>
                </div>
            </div>
        )
    }
})