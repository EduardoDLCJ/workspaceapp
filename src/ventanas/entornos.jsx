import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const EntornosLista = () => {
  const [nombre, setNombre] = useState('');
  const [playlist, setPlaylist] = useState('');
  const [horario, setHorario] = useState('');
  const [horarioFin, setHorarioFin] = useState('');
  const [icono, setIcono] = useState('');
  const [entornos, setEntornos] = useState([]); // Estado para almacenar los entornos
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar/ocultar el formulario
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar el índice del carrusel
  const [activeIndex, setActiveIndex] = useState(null); // Estado para el entorno activo
  const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
  const playlistsDisponibles = ['Relax', 'Workout', 'Focus', 'Sleep']; // Playlists predefinidas
  const [cargando, setCargando] = useState(false);

  // Función para obtener los entornos del usuario
  useEffect(() => {
    const fetchEntornos = async () => {
      const Usuario_idUsuario = localStorage.getItem('id');
      if (!Usuario_idUsuario || !token) {
        alert('Usuario no autenticado');
        return;
      }
      try {
        const response = await fetch(`https://workspaceapi.onrender.com/entornos/usuario/${Usuario_idUsuario}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Enviar el token en el header
          },
        });
        if (response.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          localStorage.removeItem('authToken');
          localStorage.removeItem('id');
          window.location.href = '/dashboard';
          return;
        }
        const data = await response.json();
        setEntornos(data);
      } catch (error) {
        console.error(error);
        alert('Hubo un error al obtener los entornos');
      }
    };

    fetchEntornos();
  }, []);


  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    const Usuario_idUsuario = localStorage.getItem('id');
    if (!Usuario_idUsuario || !token) {
      alert('Usuario no autenticado');
      return;
    }
    const nuevoEntorno = {
      Usuario_idUsuario,
      Nombre: nombre,
      playlist: playlist || undefined,
      horario,
      horarioFin,
      icono,
    };
    try {
      const response = await fetch('https://workspaceapi.onrender.com/entornos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar el token en el header
        },
        body: JSON.stringify(nuevoEntorno),
      });
      if (response.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('id');
        window.location.href = '/dashboard';
        return;
      }
      if (!response.ok) throw new Error('Error al crear entorno');
      const data = await response.json();
      setEntornos((prev) => [...prev, data]); // Agregar el nuevo entorno a la lista
      setMostrarFormulario(false); // Ocultar el formulario
    } catch (error) {
      console.error(error);
      alert('Hubo un error al crear el entorno');
    }
    setCargando(false);
  };

  // Función para ir al entorno anterior
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? entornos.length - 1 : prevIndex - 1
    );
  };

  // Función para ir al siguiente entorno
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === entornos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para establecer un entorno como activo
  const handleSetActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="mt-1 px-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <Navbar bgColor="bg-blue-600" bgOpacity="opacity-98" />
      <div className="max-w-5xl mx-auto bg-white 2xl rounded-2xl p-8 mb-10 mt-15">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Tus Entornos</h2>

        {/* Carrusel de entornos */}
          <div className="relative">
            {entornos.length > 0 ? (
              <div className="carousel w-full overflow-hidden rounded-2xl shadow-lg">
                <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
            {entornos.map((ent, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 ${
                  activeIndex === index ? 'border-4 border-green-500' : ''
                }`} // Agregar contorno verde si es el entorno activo
              >
                {ent.icono.startsWith('http') ? (
                  <img
              src={ent.icono}
              alt="Ícono"
              className="w-full h-96 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-80 flex items-center justify-center bg-gray-200 rounded-t-4xl">
              <span className="text-gray-500 text-6xl">{ent.icono}</span>
                  </div>
                )}
                <div className="bg-gradient-to-b from-gray-50 to-gray-100 bg-opacity-50 text-blue-900 p-6 rounded-b-2xl">
                  <p className="text-2xl font-bold">{ent.Nombre}</p>
                  <p className="text-lg">
              <span className="font-semibold">Inicio:</span>{' '}
              {new Date(ent.horario).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
                  </p>
                  <p className="text-lg">
              <span className="font-semibold">Fin:</span>{' '}
              {new Date(ent.horarioFin).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
                  </p>
                  {/* Botón para establecer como activo */}
                  <button
                    onClick={() => handleSetActive(index)}
                    className={`mt-4 py-2 px-4 rounded-lg shadow-lg ${
                      activeIndex === index
                        ? 'bg-green-500 text-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    } transition-all duration-300`}
                  >
                    {activeIndex === index ? 'Activo' : 'Establecer como Activo'}
                  </button>
                  <button
                    onClick={() => window.location.href = '/entorno'}
                    type="button"
                    className="ml-1.5 bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                  >
                    Ir a Entorno
                  </button>
                </div>
              </div>
            ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center">No tienes entornos creados.</p>
            )}

            {/* Botones de navegación del carrusel */}
            {entornos.length > 1 && (
              <>
                <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:from-indigo-600 hover:to-purple-600 transition-transform duration-300 ease-in-out"
                >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
                </button>
                <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:from-indigo-600 hover:to-purple-600 transition-transform duration-300 ease-in-out"
                >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
                </button>
              </>
            )}
          </div>

          {/* Botón para abrir el formulario */}
        <button
          onClick={() => setMostrarFormulario(true)}
          className="mb-6 mt-10 bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
        >
          Crear Nuevo Entorno
        </button>


        {/* Modal del formulario */}
        {mostrarFormulario && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Entorno</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const regex = /^[a-zA-Z0-9\s]+$/;
                  if (!regex.test(nombre)) {
                    alert('El nombre y el ícono no deben contener caracteres especiales.');
                    return;
                  }
                  handleSubmit(e);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-lg font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg text-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Playlist</label>
                  <select
                    value={playlist}
                    onChange={(e) => setPlaylist(e.target.value)}
                    className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg text-blue-800"
                  >
                    <option value="">Seleccionar Playlist (opcional)</option>
                    {playlistsDisponibles.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Horario Inicio</label>
                  <input
                    type="datetime-local"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    required
                    className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg text-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Horario Fin</label>
                  <input
                    type="datetime-local"
                    value={horarioFin}
                    onChange={(e) => setHorarioFin(e.target.value)}
                    required
                    className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg text-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Ícono</label>
                  <input
                    type="text"
                    placeholder="Ícono"
                    value={icono}
                    onChange={(e) => setIcono(e.target.value)}
                    className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg text-blue-800"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setMostrarFormulario(false)}
                    className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                  >
                  {cargando ? (
                    <span className="loading loading-infinity loading-sm"></span>
                  ) : (
                   <p>Crear Entorno </p>
                  )}
                  
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntornosLista;