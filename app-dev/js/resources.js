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

module.exports = React.createClass({

    getInitialState: function(){
        return {
            notifs: [],
            loading: true,
            offline: false
        }
    },
    componentDidMount: function(){
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
                    console.log(res.body[0])
                }
            })
    },

    render: function(){
        var loaderStyle = {
                position: 'absolute',
                left: '0',
                right: '0',
                top: '30vh',
                margin: '0 auto',
                display: this.state.loading ? 'block' : 'none'
            }
        return (
            <div style={{height: '70vh', overflowY: 'scroll'}}>
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
        )
    }
})