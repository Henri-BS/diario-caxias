import { Link } from "react-router-dom";
import Logo from "assets/img/logo_cx.png";

function Navbar() {


  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand nav p-2">
      <img src={Logo} alt="logo" width={36} height={36}/>
      
        <h4>Diário Caxias</h4>
      </Link>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>
            <i className="bi bi-house"/> Início 
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/projetos"}>
            <i className="bi bi-folder"/> Projetos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/categorias"}>
            <i className="bi bi-grid"/> Categorias
            </Link>
          </li>     
          <li className="nav-item">
            <Link className="nav-link" to={"/usuarios"}>
            <i className="bi bi-people"/> Usuários
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;