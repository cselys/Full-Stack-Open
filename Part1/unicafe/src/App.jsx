import { useState } from 'react'

const Button = (props) => <button onClick={props.handler}>{props.text}</button>

const Statistics = (props) => {
	const good = props.good
	const bad = props.bad
	const neutral = props.neutral
	
	if(good==0 && bad==0 && neutral==0){		
		return (
		<div>
			<h1>statistics</h1>
			<p>No feedback given</p>
		</div>
	)
	}
  return (
	  <div>
		<h1>statistics</h1>
		<StatisticsLine text='good' value={good}/>
		<StatisticsLine text='neutral' value={neutral}/>
		<StatisticsLine text='bad' value={bad}/>
		<StatisticsLine text='all' value={good+neutral+bad}/>
		<StatisticsLine text='average' value={(good-bad)/(good+neutral+bad)}/>
		<StatisticsLine text='positive' value={good/(good+neutral+bad)+'%'}/> 
	 </div>	  
  )
}

const StatisticsLine = (props) => <tr><td>{props.text}</td>  <td>{props.value}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseGood = ()=> setGood(good + 1)
  const increaseNeutral = ()=> setNeutral(neutral + 1)
  const increaseBad = ()=> setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
	  <p>
		<Button handler={increaseGood} text='good'/><br/>
		<Button handler={increaseNeutral} text='neutral'/>
		<Button handler={increaseBad} text='bad'/>
	  </p>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
	  
    </div>
  )
}

export default App