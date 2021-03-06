import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from '../shared/BookForm'
import Layout from '../shared/Layout'

const BookEdit = (props) => {
  const [book, setBook] = useState({ title: '', author: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/books/${props.match.params.id}`)
      .then(res => setBook(res.data.book))
      .catch(console.error)
  }, [])

  // Create a handleChange function that will be run anytime an input is changed
  // ex. anytime someone types in the input
  const handleChange = event => {
    // ensure that the event's properties (especially event.target) are persisted,
    // i.e. not changed to null, after the handleChange function finishes running
    //
    // we need to do this, because the callback we pass to `this.setState`, will
    // not be called by React until after `handleChange` has finished running.
    event.persist()

    // use the updater callback function syntax, because our new state depends on
    // our previous state
    setBook(prevBook => {
      // create an object that will keep track of our updated field
      // ex. if the input's `name` is 'title' and its `value` was `1984`, then updated
      // field would be the object { 'title': '1984' }
      const updatedField = { [event.target.name]: event.target.value }

      // Copy the book properties onto the target object {}, creating a copy of `this.state.book`
      // Copy the updatedField onto the target object (our book copy)
      // return the target object as editedBook
      const editedBook = Object.assign({}, prevBook, updatedField)

      // return the new book state that will **replace** `book`
      // in this case, we set the `book` state to be the new `editedBook`
      return editedBook
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/books/${props.match.params.id}`,
      method: 'PATCH',
      data: { book }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/books/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <BookForm
        book={book}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/books/${props.match.params.id}`}
      />
    </Layout>
  )
}

export default BookEdit
