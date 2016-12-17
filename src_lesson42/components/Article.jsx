/**
 * Created by Dmitriy Prilutsky on 11.12.2016.
 */
import React from "react";
import'./Article.scss';

const ARTICLES = require("../articles.json");

class Article extends React.Component {
  constructor(props) {
    super(props);
    const { articleId } = this.props.params;
    this.state = {
      article: ARTICLES.find(article => article.id === articleId)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { articleId: prevId } = this.props.params;
    const { articleId: nextId } = nextProps.params;

    if (prevId !== nextId) {
      this.setState({
        article: ARTICLES.find(article => article.id === nextId)
      });
    }
  }

  render () {
    const {article} = this.state;
    return (
      <li className="article">
          <div className="article-title"> {article.title} </div>
          <div className="article-author">{article.author} </div>
          <div className="article-body">{article.body} </div>
      </li>
    )
  }
}

module.exports = Article;
