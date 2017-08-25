import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../api/BooksAPI'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  moveBook = (shelf) => {
    BooksAPI.update(this.props.book, shelf).then(response => {
      if(response) {
        this.props.book.shelf = shelf;
        window.location.reload(); //mudar para renderizar apenas o componente
      }
    })
  }

  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193,
          backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
        </div>
        <div className="book-shelf-changer">
          <select onChange={(event) => this.moveBook(event.target.value)} value={book.shelf}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(", ")}</div>
      </div>
    );
  }
}

export default Book;