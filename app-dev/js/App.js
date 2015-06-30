var React = require('react'),
    Dash = require('./Dash.js'),
    Login = require('./Login.js'),
    Available = require('./Available.js'),
    Subscribed = require('./Subscribed.js'),
    Favourites = require('./Favourites.js'),
    Downloads = require('./Downloads.js')


var App = React.createClass({
    render: function(){
        var Child
        switch(this.props.page){
            case 'Login': Child = Login; break;
            case 'Dash': Child = Dash; break;
            case 'Available': Child = Available; break;
            case 'Subscribed': Child = Subscribed; break;
            case 'Favourites': Child = Favourites; break;
            case 'Downloads': Child = Downloads; break;
            default: Child = Login; break;
        }
        return (
            <Child />
        )
    }
})

var render = function(){
    var route = window.location.hash.substr(2)
    React.render(
        <App page={route}/>,
        document.getElementById('content')
    )
}

window.addEventListener('hashchange', render);
render()

module.exports = App;