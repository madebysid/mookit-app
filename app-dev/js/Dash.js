var React = require('react'),
    mui = require('material-ui'),
    material = require('./Material.js'),
    RaisedButton = mui.RaisedButton,
    AppBar = mui.AppBar,
    Avatar = mui.Avatar,
    Card = mui.Card,
    CardTitle = mui.CardTitle,
    CardMedia = mui.CardMedia,
    CardText = mui.CardText


/*
*
* DASHBOARD HEADER
*
* */

var DashHeaderBar = React.createClass({
    mixins: [material],

    leftTouch: function(){
        window.location.hash = "/Login"
    },

    render: function(){
        var AppBarStyle = {
            backgroundColor: "#238743",
        },
        AppBarExtensionStyle = {
            height: '35vh',
            backgroundColor: '#238743',
            color: "#ffffff",
        },
        AvatarStyle = {
            display: "block",
            height: "15vh",
            width: "auto",
            marginLeft: 'auto',
            marginRight: 'auto',
        }
        return (
            <div>
                <AppBar style={AppBarStyle} title='' onLeftIconButtonTouchTap={this.leftTouch}  zDepth={0} iconClassNameLeft="mdi mdi-arrow-left" iconClassNameRight="mdi mdi-dots-vertical" />
                <div style={AppBarExtensionStyle}>
                    <Avatar style={AvatarStyle} src="img/profile.jpg"/>
                    {this.props.children}
                </div>
            </div>
        )
    }
})

var DashUserDetails = React.createClass({
    mixins: [material],

    render: function(){
        var UserDetailStyle = {
            fontSize: '1.5em',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50vw',
            textAlign: 'center',
            marginTop: '2vh'
        }

        return (
            <div style={UserDetailStyle}>
                {this.props.name}
            </div>
        )
    }
})

var DashUserEngagements = React.createClass({
    render: function(){
        var EngagementStyle = {
            float: this.props.align,
            fontSize: '0.75em',
            textAlign: 'center',
            marginTop: '4vh',
            paddingLeft: '11vw',
            paddingRight: '18vw',
        }
        if (this.props.type=='discussions'){
            EngagementStyle['borderRight'] = '1px solid white'
        }

        return (
            <div style={EngagementStyle}>
                <p style={{fontFamily: 'RobotoBold', lineHeight: '0.1em'}}>7</p>
                {this.props.type.toUpperCase()}
                {/*Divider*/}
            </div>
        )
    }
})


var DashHeader = React.createClass({
    mixins: [material],

    render: function(){
        return (
            <div>
                <DashHeaderBar>
                    <DashUserDetails name="Siddhant Sinha"></DashUserDetails>
                    <DashUserEngagements type="discussions" align="left"></DashUserEngagements>
                    <DashUserEngagements type="topics" align="right"></DashUserEngagements>
                </DashHeaderBar>
            </div>
        )
    }
})






/*
 *
 * DASHBOARD BODY
 *
 * */





var DashCard = React.createClass({
    mixins: [material],

    render: function(){
        return (
            <Card style={this.props.styles}>
                <CardMedia className={this.props.mediaClass}>
                    <img src={this.props.img} />
                </CardMedia>
                <CardText className="CardText" style={{color: 'white'}}>
                    {this.props.children}
                </CardText>
            </Card>
        )
    }
})

var DashBody = React.createClass({
    mixins: [material],

    render: function(){
        var AvailableStyles = {
            backgroundColor: '#43A8DE',
            margin: '2vw',
            width: '46vw',
            float: 'left',
            height: '32vh',
            animation: 'fly-in-from-bottom .3s ease both',
            animationDelay: '0s',
            transformOrigin: 'top left'
        }

        var SubscribedStyles = {
            backgroundColor: '#7A53A2',
            margin: '2vw',
            width: '46vw',
            float: 'right',
            height: '15vh',
            animation: 'fly-in-from-bottom .3s ease both',
            animationDelay: '0.1s',
            transformOrigin: 'top left'
        }

        var FavouriteStyles = {
            backgroundColor: '#52BA66',
            margin: '2vw',
            width: '46vw',
            float: 'right',
            height: '15vh',
            animation: 'fly-in-from-bottom .3s ease both',
            animationDelay: '0.2s',
            transformOrigin: 'top left'
        }

        var DownloadStyles = {
            backgroundColor: '#FEC432',
            margin: '2vw',
            width: '96vw',
            marginTop: '0',
            float: 'left',
            height: '18vh',
            animation: 'fly-in-from-bottom .3s ease both',
            animationDelay: '0.3s',
            transformOrigin: 'top left'
        }

        return (
            <div>
                <a href="#/Available">
                    <DashCard styles={AvailableStyles} mediaClass="cardImg cardAvailable" img="img/tick.svg" imgBg="#43A8DE">Available</DashCard>
                </a>
                <a href="#/Subscribed">
                    <DashCard styles={SubscribedStyles} mediaClass="cardImg cardSubscribed" img="img/book.svg" imgBg="#7A53A2">Subscribed</DashCard>
                </a>
                <a href="#/Favourites">
                    <DashCard styles={FavouriteStyles} mediaClass="cardImg cardFavourites" img="img/heart.svg" imgBg="#52BA66">Favourites</DashCard>
                </a>
                <a href="#/Downloads">
                    <DashCard styles={DownloadStyles} mediaClass="cardImg cardDownloads" img="img/download.svg" imgBg="#FEC432">Downloads</DashCard>
                </a>
            </div>
        )
    }
})




















var Dash = React.createClass({
    mixins: [material],

    render: function(){
        return (
            <div>
               <DashHeader></DashHeader>
                <DashBody></DashBody>
            </div>
        )
    }
})

module.exports = Dash;