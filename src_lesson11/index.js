import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";

const Article = React.createClass({
  render: function() {
    return (
      <div className="article">
        <h3>{this.props.title}</h3>
        <h4>{this.props.author}</h4>
        <p>{this.props.body}</p>
      </div>
      )
  }
});

ReactDOM.render(
  <Article
    title = 'Atque delectus eius iste non'
    author = 'Darth Vader'
    body = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque delectus eius iste non, officia, officiis omnis porro repellat reprehenderit, rerum similique ut veritatis vero! Aliquid eius error neque suscipit voluptatibus?'
  />,
  document.getElementById('app')
);
