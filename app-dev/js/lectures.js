var React = require('react'),
    material = require('./material.js'),
    mui = require('material-ui'),
    superagent = require('superagent'),
    Router = require('react-router'),
    Loader = require('./loader.js'),

    Card = mui.Card,
    CardText = mui.CardText,
    List = mui.List,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider,
    Icon = mui.FontIcon

var expanded = []

var sortByWeeks = function(data) {
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
}

var NormalText = React.createClass({
    handleClick: function(){
        this.props.onTouchTap()
    },

    render: function(){
        var ImgStyle = {
                float: 'left',
                width: '15vw',
                paddingTop: '0vh',
                paddingLeft: '0vw',
                paddingRight: '5vw',
                marginBottom: '5vh'
            },
            WeekTitleStyle = {
                fontFamily: 'RobotoRegular',
                fontSize: '1.3em',
                lineHeight: '1em'
            },
            WeekNumberStyle = {
                fontFamily: 'RobotoLight',
                fontSize: '1em',
                lineHeight: '0.5em',
                paddingLeft: '20vw'
            },
            WeekLengthStyle = {
                fontFamily: 'RobotoLight',
                fontSize: '1em',
                lineHeight: '0.5em',
                paddingLeft: '20vw'
            }
        return (
            <div onTouchTap={this.handleClick} style={{
                width: '100%'
            }}>
                <img style={ImgStyle} src={'img/' + this.props.data[0].week.slice(5) + '.png'}/>
                <p style={WeekTitleStyle}>{this.props.data[0].topic}</p>
                <p style={WeekNumberStyle}>{this.props.data[0].week}</p>
                <p style={WeekLengthStyle}>({this.props.data.length} Lectures)</p>
            </div>
        )
    }
})

var CardList = React.createClass({
    mixins: [Router.Navigation],

    handleClick: function(){
        this.props.onTouchTap()
    },
    goToLecture: function(lecture){
        var lectureId = lecture.forumsectionId
        if(lectureId != undefined) {
            localStorage.setItem('vurl', lecture.vurl)
            this.transitionTo("lecture", {lectureId: lectureId})
        }
    },

    render: function() {
        var self = this,
            ImgStyle = {
                float: 'left',
                width: '15vw',
                paddingTop: '0vh',
                paddingLeft: '0vw',
                paddingRight: '5vw'
            },
            WeekTitleStyle = {
                paddingLeft: '20vw',
                fontFamily: 'RobotoRegular',
                fontSize: '1.3em',
                lineHeight: '1em'
            },
            WeekNumberStyle = {
                paddingLeft: '20vw',
                fontFamily: 'RobotoLight',
                fontSize: '1em',
                lineHeight: '0.5em'
            }
        return (
            <div>
                <img style={ImgStyle} src={'img/' + this.props.data[0].week.slice(5) + '.png'}/>
                <p style={WeekTitleStyle} onTouchTap={self.handleClick}>
                    {this.props.data[0].topic}
                </p>
                <p style={WeekNumberStyle}>{this.props.data[0].week}</p>
                <List onTouchTap={this.goToLecture}>
                    {
                        this.props.data.map(function(element, index){
                            return (
                                <div>
                                    <ListItem onTouchTap={self.goToLecture.bind(this, element)} style={{
                                        marginLeft: '20vw',
                                        animation: 'fadeIn 0.3s ease ' + (index)*0.05 + 's',
                                        animationFillMode: 'forwards',
                                        opacity: '0'
                                    }}
                                      rightIcon={<Icon className="mdi mdi-play"/>}>
                                        {self.props.data[index].title}
                                    </ListItem>
                                    <ListDivider style = {{marginLeft: '20vw'}} />
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
});

var ExpandableListItem = React.createClass({
    handleTouch: function(){
        this.props.onTouchTap(this.props.id)
    },

    getInitialState: function() {
        return {
            expanded: this.props.expanded
        };
    },
    render: function(){
        var self = this,
        Styles = {
            backgroundColor: 'white',
            margin: expanded[this.props.id] ? '2vh 3vw' : '1vh 5vw',
            transition: '0.3s'
        }
        return (
            <div>
                <Card zDepth={expanded[this.props.id] ? 2 : 1} rounded={false} style={Styles}>
                    <CardText style={{padding: '0vh 3vw'}}>
                        {
                            expanded[this.props.id]
                            ? <CardList onTouchTap={this.handleTouch} data={this.props.data} />
                            : <NormalText onTouchTap={this.handleTouch} data={this.props.data}/>
                        }
                    </CardText>
                </Card>
            </div>
        )
    }
})

var Lectures = React.createClass({
    mixins: [material, Router.Navigation],

    handleTouch: function(id){
        var self = this
        expanded.forEach(function(element, index){
            expanded[index] = (index == id) ? !expanded[index] : false
        })
        self.setState({
            expanded: expanded
        })
    },


    getInitialState: function() {
        return {
            data: [{data: 'null'}],
            expanded: expanded
        };
    },
    componentDidMount: function() {
        var self = this
        self.refs.loader.showLoader()
        superagent
            .get(localStorage.getItem('mainUrl') + '/lectures/summary')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err, res) {
                self.refs.loader.hideLoader()
                if(err) {
                    if(err.timeout == 10000)
                        console.log('Timeout')
                }
                else {
                    self.setState({
                        data: sortByWeeks(res.body)
                    })
                }
            })
    },
    render: function(){
        var self = this
        return (
            <div style={{height: 'calc(99vh - 40px - 110px)', overflowY: 'scroll'}}>
                {
                    (this.state.data[0].data == 'null')
                    ? <div style={{paddingTop: '20px', textAlign: 'center', fontFamily: 'RobotoRegular'}}>No lectures available</div>
                    : self.state.data.map(function(element, index) {
                        return (
                            <div style={{
                                animation: 'flyInFromBottom 0.3s ease ' + (index)*0.1 + 's',
                                WebkitAnimation: 'flyInFromBottom 0.3s ease ' + (index)*0.1 + 's',
                                animationFillMode: 'forwards',
                                WebkitAnimationFillMode: 'forwards',
                                opacity: '0'
                            }}
                            key={index}>
                            <ExpandableListItem
                                data={self.state.data[index]}
                                id={index}
                                onTouchTap={self.handleTouch}
                                expanded={self.state.expanded}/>
                            </div>
                        )
                    })
                }
                <Loader ref="loader" />
            </div>
        )
    }
})

module.exports = Lectures
