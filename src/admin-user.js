import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const Key = ({match}) => (
  <div>
    <h2>User: {match.params.key}</h2>
  </div>
)

export default Key;
