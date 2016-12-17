import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";

const Article = React.createClass({
  render: function() {
    return (
      <div className="article">
        <div className="article-title"> {this.props.title} </div>
        <div className="article-author">{this.props.author} </div>
        <div className="article-body">{this.props.body} </div>
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
