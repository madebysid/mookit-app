var React = require('react/addons'),
    mui = require('material-ui'),
    material = require('./material.js'),
    superagent = require('superagent'),
    Loader = require('./loader.js'),
    Router = require('react-router'),

    IconButton = mui.IconButton,
    CircularProgress = mui.CircularProgress,
    List = mui.List,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider,
    Avatar = mui.Avatar

var Resources = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function(){
        return {
            res: [{data: 'null'}]
        }
    },
    componentDidMount: function(){
        var self = this
        self.refs.loader.showLoader()
        superagent
            .get(localStorage.getItem('mainUrl') + '/resources')
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .timeout(10000)
            .end(function(err,res){
                self.refs.loader.hideLoader()
                if(err){
                    superagent.abort()
                    if(err.timeout==10000)
                        self.transitionTo('offline')
                }
                else{
                    self.setState({
                        res: res.body
                    })
                }
            })
    },
    render: function(){
        var self = this
        return (
            <div style={{height: '70vh', overflowY: 'scroll', overflowX: 'hidden'}}>
                {
                    (this.state.res[0].data == 'null')
                    ? <div style={{paddingTop: '20px', textAlign: 'center', fontFamily: 'RobotoRegular'}}>No resources available</div>
                    : this.state.res.map(function(element, index){
                        return (
                            <div>
                                <ListItem
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
        )
    }
})

module.exports = Resources
