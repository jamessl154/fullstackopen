import React, { useState } from 'react'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useParams, useHistory
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>Anecdotes</Link>
      <Link style={padding} to='/create'>Create New</Link>
      <Link style={padding} to='/about'>About</Link>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === id)
  return (
    <div>
      <p>Content: {anecdote.content}</p>
      <p>Author: {anecdote.author}</p>
      <p>Info: {anecdote.info}</p>
      <p>Votes: {anecdote.votes}</p>
      <p>ID: {anecdote.id}</p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, vote }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
          {' '}{anecdote.votes}{' '}
          <button onClick={() => vote(anecdote.id)}>Vote</button>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About Anecdote App</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // Since the state in the custom hook is initialized in this component,
  // none of the component's local state is maintained between routes 
  // which remove components to render others
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.notify(`A new anecdote: "${content.value}" created!`)
    setTimeout(() => props.notify(null), 10000)
    history.push('/')
  }
  
  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  // https://dmitripavlutin.com/javascript-object-destructuring/#5-aliases
  // rest destructuring to remove property + give unique alias
  let { reset: aliasReset1, ...newContent } = content
  let { reset: aliasReset2, ...newAuthor } = author
  let { reset: aliasReset3, ...newInfo } = info

  return (
    <div>
      <h2>Create A New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:{' '}
          <input {...newContent} />
        </div>
        <div>
          Author:{' '}
          <input {...newAuthor} />
        </div>
        <div>
          Url for more info:{' '}
          <input {...newInfo} />
        </div>
        <button type='submit'>Create</button>
        <button type='button' onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

const Notification = ({ text }) => <div>{text}</div>

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software Anecdotes</h1>
        <Menu />
        <Notification text={notification} />
        <Switch>
          <Route exact path='/anecdotes/:id'>
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route exact path='/'>
            <AnecdoteList anecdotes={anecdotes} vote={vote} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/create'>
            <CreateNew notify={setNotification} addNew={addNew} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App;