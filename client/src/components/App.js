import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [subname, setSubname] = useState("")
  const [subpass, setSubpass] = useState("")

  useEffect(() => {
    fetch('/check_session').then((r)=>{
      if(r.ok){
        r.json().then((user)=> setUser(user))
      }
    })
    
},[])

function handleSubmit(e){
  e.preventDefault()
  fetch("/signin", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username: subname, password: subpass})
  })
  .then(res => res.json())
  .then(data => setUser(data))
}

function handleSignup(e){
  e.preventDefault()
  fetch("/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username: username, password: password})
  })
  .then(response => response.json())
  .then(data => setUser(data))
}

if(user){
  return (
    <>
    <h1>Welcome, {user.username}</h1>
    <button>Logout</button>
    </>
  )
}
else{
  return(
    <>
    <form onSubmit={handleSubmit}>
        <h2>Username</h2>
        <input type="text" value={subname} onChange={(e)=> setSubname(e.target.value)}></input>
        <h2>Password</h2>
        <input type="text" value={subpass} onChange={(e)=> setSubpass(e.target.value)}></input>
        <button type="submit">Login</button>
    </form>
    <br></br>
    <form onSubmit={handleSignup}>
        <h2>Username</h2>
        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}></input>
        <h2>Password</h2>
        <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
        <button type="submit">Sign Up</button>
    </form>
    </>
  )
}
 
}

export default App;