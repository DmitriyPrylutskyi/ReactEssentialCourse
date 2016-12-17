import React from "react";

const ARTICLES = require("../articles.json");
require('./ArticlesApp.scss');

const Article = require('./Article.jsx');

class ArticlesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: ARTICLES
    };
    this.articles = ARTICLES;
  }

  handleSearch (event) {
    const searchQuery = event.target.value.toLowerCase();
    const articles = ARTICLES.filter((article) => {
      const searchValue = article.body.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    this.setState({
      articles: articles
    });
  }

  render() {
    return (
      <div className="articles">
        <input type="text" placeholder="Search..." className="search-field" onChange={(e) => this.handleSearch(e)} />
        <ul className="articles-list">
          {
             this.state.articles.map((el)=> {
              return <Article
                key={el.id}
                title={el.title}
                author={el.author}
                body={el.body}
              />;
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = ArticlesApp;

