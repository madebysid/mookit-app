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

    render: function(){
        var AppBarStyle = {
            backgroundColor: "#238743"
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
                <AppBar style={AppBarStyle} title='' zDepth={0} iconClassNameLeft="mdi mdi-arrow-left" iconClassNameRight="mdi mdi-dots-vertical" />
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
            textAlign: 'center',
            marginTop: '4vh',
            paddingLeft: '15vw',
            paddingRight: '15vw'
        }
        if (this.props.type=='discussions'){
            EngagementStyle['borderRight'] = '1px solid white'
        }

        return (
            <div style={EngagementStyle}>
                <p style={{fontFamily: 'Roboto-Bold', lineHeight: '0.1em'}}>7</p>
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
        var imgStyles = {
            overflow: 'hidden',
        }
        return (
            <div>
                <Card style={this.props.styles}>
                    <CardMedia style={imgStyles}>
                        <img src={this.props.img} className="cardImg"/>
                    </CardMedia>
                    <CardTitle title="Title"/>
                </Card>
            </div>
        )
    }
})

var DashBody = React.createClass({
    mixins: [material],

    render: function(){
        var AvailableStyles = {
            margin: '2vw',
            width: '46vw',
            float: 'left',
            height: '32vh',
            position: 'relative',
        }

        var SubscribedStyles = {
            margin: '2vw',
            width: '46vw',
            float: 'right',
            height: '15vh',
            position: 'relative',
        }

        var FavouriteStyles = {
            margin: '2vw',
            width: '46vw',
            float: 'right',
            height: '15vh',
            position: 'relative',
        }

        var DownloadStyles = {
            margin: '2vw',
            width: '100%',
            height: '30vh',
            position: 'relative',
        }

        return (
            <div>
                <DashCard styles={AvailableStyles} img="img/tick.svg" imgBg="#43A8DE" text="Available"></DashCard>
                <DashCard styles={SubscribedStyles} img="img/book.svg" imgBg="#7A53A2" text="Subscribed"></DashCard>
                <DashCard styles={FavouriteStyles} img="img/heart.svg" imgBg="#52BA66" text="Favourites"></DashCard>
                <DashCard styles={DownloadStyles} img="img/download.svg" imgBg="#FEC432" text="Subscribed"></DashCard>
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

React.render(
    <Dash />,
    document.getElementById('content')
)

module.exports = Dash;