import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../assets/img/marvel.svg";

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({
    path: resolved.pathname,
    caseSensitive: true,
    end: false,
  });

  return (
    <Link
      className={`${match ? "underline text-red-500" : ""}`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function NavBar() {
  return (
    <div className="w-full bg-white py-4">
      <nav className="container px-4 mx-auto grid grid-cols-1 md:flex md:flex-row md:flex-wrap justify-center items-center">
        <div className="grid grid-cols-1 md:flex md:flex-row justify-center items-center">
          <img
            src={logo}
            alt="Christian Nascimento"
            className="mx-auto"
            width={130}
            height={52}
          />
        </div>
        <ul className="mx-auto uppercase font-medium md:ml-auto md:mx-0 mt-8 md:mt-0 px-4 py-2 space-x-4 flex flex-row">
          <li>
            <CustomLink to="/heroes">Heroes</CustomLink>
          </li>
          <li>
            <CustomLink to="/favorites">Favorites</CustomLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
