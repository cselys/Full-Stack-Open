
const Course = ({course}) => {
	const total = course.parts.reduce((s, p) => 
		 s+=p.exercises, 0) 
	return (
		<div>
			<h1>{course.name}</h1>
			<ul>
			{course.parts.map ( part => 
			<p key={part.id}>
				{part.name}  {part.exercises}
			</p>
			)}
			</ul>
			<h3>total of {total} exercises</h3>
		</div>
	)
}

export default Course
