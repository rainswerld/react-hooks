import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Book = (props) => {
  const [book, setBook] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/books/${props.match.params.id}`)
      .then(res => setBook(res.data.book))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/books/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!book) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/', state: { msg: 'Book succesfully deleted!' }
      }} />
    )
  }

  return (
    <Layout>
      <h4>{book.title}</h4>
      <p>Written by: {book.author}</p>
      <button onClick={destroy}>Delete Book</button>
      <Link to={`/books/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to='/books'>Back to all books</Link>
    </Layout>
  )
}

export default Book
