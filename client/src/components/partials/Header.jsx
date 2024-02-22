import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(u);
  }, []);

  const handleLogout = () => {
    setLoggingOut(true); // Start loading
    localStorage.clear();
    setTimeout(() => {
      navigation('/login');
      setLoggingOut(false); // Stop loading after redirection
    }, 1000); // 1000 milliseconds = 1 second
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Todo APP</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarColor02">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <ul className="navbar-nav">
              <li className="nav-item">
                {loggingOut ? (
                  <div className="nav-link">Logging Out...</div>
                ) : (
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
