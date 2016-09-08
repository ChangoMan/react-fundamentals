var React = require('react');
ReactRouter = require('react-router');
Link = ReactRouter.Link;
var MainContainer = require('./MainContainer');

var Home = React.createClass({
  render: function () {
    return (
      <MainContainer>
        <h1>Github Battle</h1>
        <p className="lead">Some fancy motto</p>
        <Link to='/playerOne'>
            <button className="btn btn-lg btn-success">Get Started</button>
        </Link>
      </MainContainer>
    )
  }
});

module.exports = Home;
