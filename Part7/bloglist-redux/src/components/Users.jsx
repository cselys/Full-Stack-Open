import { Link } from 'react-router-dom'

const Users = ({ users, user }) => {
   if (user){
    return (<>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {
          user.blogs && user.blogs.map( (bl, index) => {
            return <li key={index}>{bl.title}</li>
          })
        }
      </ul>
    </>
    )
}
  return (
    <>
      <h2>Users</h2>
      <table className="table striped">
        <tbody>
          <tr>
            <td>user name </td>
            <td>blogs created</td>
          </tr>
          {users && users.map(u => (<tr key = {u.id}>
            <td> <Link to={`/users/${u.id}`}>{u.name}</Link></td>
            <td>{u.blogs.length}</td></tr>))}
        </tbody>
      </table>
    </>
  )
}

export default Users