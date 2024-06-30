import { Link } from "react-router-dom";
function Navbar() {


  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        <h1>Diário Caxias</h1>
      </Link>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>Início </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/usuarios"}>Usuários</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/categorias"}>Categorias</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;