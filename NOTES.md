Diagram of different views:

![views whiteboard diagram](https://media.git.generalassemb.ly/user/16320/files/92d49b80-41af-11e9-873b-76cf1edcbba4)

---

Code Along for `async` and `await`:

```js
// src/components/routes/Books.js
// old promise version:
componentDidMount () {
  axios(`${apiUrl}/books`)
    .then(res => this.setState({ books: res.data.books }))
    .catch(console.error)
}
// new async/await version:
async componentDidMount() {
  try {
    const res = await axios(`${apiUrl}/books`)
    this.setState({books: res.data.books})
  } catch (err) {
    console.error(err)
  }
}
```
