import { useState } from 'react'

const Button = ({handleClick, text}) => (
	<button onClick={handleClick}>{text}</button>
)

const Anecdote = ({anecdotes, votes, index}) => (
	<div>
    	<p>{anecdotes[index]}</p>
	<p>Votes: {votes[index]}</p>
	</div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

    const count = anecdotes.length;
   
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(count).fill(0))

    const nextRandom = () => {
	const random = Math.floor(Math.random() * count);
	return setSelected(random);
    }

    const voteCurrent = () => {
	const copy = [...votes];
	copy[selected]++;
	return setVotes(copy);
    }

    const maxVotes = votes.indexOf(Math.max(...votes));
    
  return (
	  <div>
	  <h1>Anecdote of the day</h1>
	  <Anecdote index={selected} anecdotes={anecdotes} votes={votes}/>
	  <Button handleClick={voteCurrent} text="Vote"/>
      	  <Button handleClick={nextRandom} text="Next anecdote"/>
	  <h1>Most voted anecdote</h1>
	  <Anecdote index={maxVotes} anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App
