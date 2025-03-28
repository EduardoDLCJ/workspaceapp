import React from "react";

const Navbar = ({ bgColor, bgOpacity }) => {
  const token = localStorage.getItem("authToken"); // Verifica si hay un token en localStorage
  const userName = localStorage.getItem("nombre"); // Obtiene el nombre del usuario
  const role = localStorage.getItem("rol"); // Obtiene el rol del usuario
  const [showMenu, setShowMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false); // Estado para el menú móvil

  return (
    <nav className={`${bgColor} ${bgOpacity} text-white shadow-md fixed top-0 left-0 w-full z-50`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logoapp">
          <a href="/dashboard" className="text-xl font-bold hover:text-gray-300">WorkSpace</a>
        </div>

        {/* Menú principal */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <div className="relative flex items-center space-x-2">
              <div className="flex space-x-6">
                {role === "admin" ? (
                  <>
                    <a href="/crud" className="hover:text-gray-300">Gestión de usuarios</a>
                    <a href="/respaldos" className="hover:text-gray-300">Respaldos</a>
                  </>
                ) : (
                  <>
                    <a href="/entornos" className="hover:text-gray-300">Lista de entornos</a>
                    <a href="#" className="hover:text-gray-300">Gestión de dispositivos</a>
                    <a href="#" className="hover:text-gray-300">Métricas</a>
                  </>
                )}
              </div>
              <a href="/perfil" className="relative">
                <div className="w-10 h-10 bg-white text-blue-700 rounded-full flex items-center justify-center shadow-md hover:bg-fuchsia-400 transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
              </a>
              <div className="relative">
                <span
                  className="text-sm font-medium cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  {userName}
                </span>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("nombre");
                        localStorage.removeItem("rol");
                        window.location.href = "/dashboard";
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <a
              href="/login"
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-300 transition-colors"
            >
              Iniciar Sesión
            </a>
          )}
        </div>

        {/* Botón del menú hamburguesa */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-blue-700 shadow-md">
          <div className="flex flex-col space-y-2 p-4">
            {token ? (
              <>

                {role === "admin" ? (
                  <>
                    <a href="/crud" className="hover:text-fuchsia-400">Gestión de usuarios</a>
                    <a href="/respaldos" className="hover:text-fuchsia-400">Respaldos</a>
                  </>
                ) : (

                  <>
                    <a href="/entornos" className="hover:text-fuchsia-400">Lista de entornos</a>
                    <a href="#" className="hover:text-fuchsia-400">Gestión de dispositivos</a>
                    <a href="#" className="hover:text-fuchsia-400">Métricas</a>
                  </>
                )}
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("nombre");
                    localStorage.removeItem("rol");
                    window.location.href = "/dashboard";
                  }}
                  className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-fuchsia-400 transition-colors"
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;