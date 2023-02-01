import { useState } from 'react'

const StatisticLine = ({text, value}) => (
	<tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
    
    const all = good + neutral + bad;

    if (all > 0) {
	
	const average = (good - bad) / all;
	const positive = `${100 * good / all} %`;
	
	return (
		<table>
		<tbody>
		<StatisticLine text="Good" value={good}/>
		<StatisticLine text="Neutral" value={neutral}/>
		<StatisticLine text="Bad" value={bad}/>
		<StatisticLine text="All" value={all}/>
		<StatisticLine text="Average" value={average}/>
		<StatisticLine text="Positive" value={positive}/>
		</tbody>
		</table>
	)
    } 
    return (<p>No feedback given</p>)
}

const Button = ({handleClick, text}) => (
	<button onClick={handleClick}>{text}</button>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const giveFeedback = (counter, stateFunc) => {
	const increment = () => stateFunc(counter + 1);
	return increment
    }

    return (
	    <div>
	    <h1>Give feedback</h1>
	    <Button handleClick={giveFeedback(good, setGood)} text="Good"/>
	    <Button handleClick={giveFeedback(neutral, setNeutral)} text="Neutral"/>
	    <Button handleClick={giveFeedback(bad, setBad)} text="Bad"/>
	    <h1>Statistics</h1>
	    <Statistics good={good} neutral={neutral} bad={bad}/> 
	    </div>
    )
}

export default App
