import React, { useEffect, useState } from 'react'
import Layout from '../shared/Layout'

const Counter = () => {
  // Call useState to get back the count state and the setCount function to update
  // the count state. The count state will start with the initial value of 0.
  // The values are returned in an array, so we use array destructuring to store
  // them in variables
  const [count, setCount] = useState(0)

  // function to run every time the button is pressed, modifies the count state
  // variable
  const increaseCount = () => {
    // We use a callback to make sure we dont have a stale count value from a
    // previous render
    setCount(prevCount => prevCount + 1)

    // This code could potentially fail if count was ever a stale value from a
    // previous render. To update state based off a previous value, use a callback
    // like above.
    // setCount(count + 1)
  }

  const resetCount = () => {
    // We can set the value without a callback, since resetting the count
    // does not depend on the previous value
    setCount(0)
  }

  // an effect hook that will run after the first render and then only run
  // again when the count state variable is modified since the dependency array
  // only has the count variable in it
  // Like componentDidMount and componentDidUpdate (when count changes)
  useEffect(() => {
    console.log('count is', count)
  }, [count])

  // an effect hook with an empty dependencies array means it will only run after
  // the first render. That's because, since it has no dependencies in the array,
  // there are no dependencies that could ever be modified to cause the effect to run.
  // Like componentDidMount
  useEffect(() => {
    console.log('First render only')
  }, [])

  // an effect hook with no dependencies array will be invoked after every render,
  // so if it modified a state variable we would get an endless loop of
  // invocations.
  // Like componentDidMount and componentDidUpdate
  useEffect(() => {
    console.log('First render and every time state changes')
  })

  useEffect(() => {
    // an effect function can return a cleanup function
    // cleanup functions are run when
    // 1. the component is unmounted
    // 2. before the second and following state updates
    // Like componentWillUnmount
    return () => {
      console.log('Cleanup function')
    }
  })

  return (
    <Layout>
      {/* Show the current count */}
      <h1>Counter</h1>
      <h2>Count: {count}</h2>
      {/* Add a button that will call increaseCount when clicked */}
      <button onClick={increaseCount}>Increase the count!</button>
      <button onClick={resetCount}>Reset the count!</button>
    </Layout>
  )
}

export default Counter
