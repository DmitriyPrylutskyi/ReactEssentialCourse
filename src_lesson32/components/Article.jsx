/**
 * Created by Dmitriy Prilutsky on 11.12.2016.
 */
import React from "react";

require('./Article.scss');

class Article extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  expandArticle (event) {
    this.setState({
      expand: !this.state.expand
    });
  }

  render () {
    return (
      <li className="article" onClick={()=>this.expandArticle()}>
        <div className="article-info">
          <div className="article-title"> {this.props.title} </div>
          <div className="article-author">{this.props.author} </div>
          <div className={'article-body' + (this.state.expand ? '' : ' expand')}>{this.props.body} </div>
        </div>
      </li>
    )
  }
}

module.exports = Article;
