var React = require('react'),
    mui = require('material-ui'),
    material = require('./material.js'),

    AppBar = mui.AppBar,
    Card = mui.Card,
    CardText = mui.CardText,
    FlatButton = mui.FlatButton

module.exports = React.createClass({
    mixins: [material],

    render: function(){
        var AppBarStyle = {
            backgroundColor: '#378E43',
            opacity: '100'
        },
        Card1Style = {
            width: '100%',
            margin: '5px auto',
            height: '20%'
        },
        Card2Style = {
            position: 'absolute',
            width: '42%',
            margin: '5px',
            marginLeft: '0',
            height: '35%'
        },
        Card3Style = {
            position: 'absolute',
            right: '15px',
            width: '42%',
            margin: '5px',
            marginLeft: '0',
            height: '23%'
        },
        Card4Style = {
            position: 'absolute',
            width: '42%',
            margin: '5px',
            marginLeft: '0',
            height: '23%',
            bottom: '16px'
        },
        Card5Style = {
            position: 'absolute',
            width: '42%',
            margin: '5px',
            marginLeft: '0',
            height: '35%',
            right: '15px',
            bottom: '15px'
        }
        return (
            <div>
                <AppBar
                    iconClassNameRight="mdi mdi-dots-vertical" iconStyleRight={{opacity: '0.9'}}
                    zDepth={0}
                    style={AppBarStyle} />

                <div style={{padding: '20px'}}>
                    <Card style={Card1Style}>
                        <CardText>
                            Card 1
                        </CardText>
                    </Card>

                    <Card style={Card2Style}>
                        <CardText>
                            Card 2
                        </CardText>
                    </Card>

                    <Card style={Card3Style}>
                        <CardText>
                            Card 3
                        </CardText>
                    </Card>

                    <Card style={Card4Style}>
                        <CardText>
                            Card 4
                        </CardText>
                    </Card>

                    <Card style={Card5Style}>
                        <CardText>
                            Card 5
                        </CardText>
                    </Card>
                </div>
            </div>
        )
    }
})