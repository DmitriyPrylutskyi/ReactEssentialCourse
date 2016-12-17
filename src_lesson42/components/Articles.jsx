import React from "react";
import'./Articles.scss';

const ARTICLES = require("../articles.json");
const ArticlePreview = require('./ArticlePreview.jsx');

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: ARTICLES
    };
  }

  handleFullViewClick(articleId) {
    this.context.router.push(`/articles/${articleId}`);
  }

  render() {
    const { articleId: selectedArticleId } = this.props.params;
    return (
      <div className="articles">
        <ul className="articles-list">
          {
             this.state.articles.map((article)=> {
              return <ArticlePreview
                key={article.id}
                title={article.title}
                author={article.author}
                onClick={() => this.handleFullViewClick(article.id)}
                selected={article.id === selectedArticleId}
              />;
            })
          }
        </ul>
        <div className='article-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Articles.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = Articles;
