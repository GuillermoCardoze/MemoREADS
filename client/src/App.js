// import React, { useEffect, useState } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import NavBar from "./NavBar";


function App() {

  return (
    <Router>
      <div>
        <NavBar />
        
      </div>
    </Router>
  );
}

export default App;







//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);
//   const [subname, setSubname] = useState("");
//   const [subpass, setSubpass] = useState("");

//   useEffect(() => {
//     fetch('/check_session').then((r) => {
//       if (r.ok) {
//         r.json().then((user) => setUser(user));
//       }
//     });
//   }, []);

//   function handleSubmit(e) {
//     e.preventDefault();
//     fetch("/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username: subname, password: subpass }),
//     })
//       .then((res) => res.json())
//       .then((data) => setUser(data));
//   }

//   function handleSignup(e) {
//     e.preventDefault();
//     fetch("/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => setUser(data));
//   }

//   function handleLogout() {
//     fetch("/logout", {
//       method: "DELETE",
//     }).then(() => setUser(null));
//   }

//   return user ? (
//     <>
//       <h1>Welcome, {user.username}</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </>
//   ) : (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h2>Username</h2>
//         <input
//           type="text"
//           value={subname}
//           onChange={(e) => setSubname(e.target.value)}
//         />
//         <h2>Password</h2>
//         <input
//           type="password"
//           value={subpass}
//           onChange={(e) => setSubpass(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <br />
//       <form onSubmit={handleSignup}>
//         <h2>Username</h2>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <h2>Password</h2>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

//export default App;
