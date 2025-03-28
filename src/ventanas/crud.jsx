import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { fetchUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../Funciones/crudFunctions';


const CrudUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        pass: '',
        edad: ''
    });
    const [editandoUsuario, setEditandoUsuario] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const token = localStorage.getItem('authToken');
    const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' });
    
    useEffect(() => {
        fetchUsuarios(token, setUsuarios);
    }, [token]);

    const abrirModal = (usuario = null) => {
      if (usuario) {
        setEditandoUsuario(usuario);
      } else {
        setNuevoUsuario({ nombre: '', apellido: '', telefono: '', correo: '', pass: '', edad: '' });
      }
      setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setEditandoUsuario(null);
    };

    return (
      <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen mt-12">
      <Navbar bgColor="bg-blue-900" bgOpacity="opacity-100" />
      {alerta.mensaje && (
        <div
        className={`alert ${
          alerta.tipo === 'error' ? 'alert-error' : 'alert-success'
        } shadow-lg mb-4 flex justify-between items-center max-w-md mx-auto`}
        >
        <div>
          <span>{alerta.mensaje}</span>
        </div>
        <button
          onClick={() => setAlerta({ mensaje: '', tipo: '' })}
          className="text-red-500 hover:text-red-700 transition-colors duration-300"
        >
          <FaTimes />
        </button>
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 mt-6 text-blue-900">
        CRUD de Usuarios
      </h1>
      <button
        onClick={() => abrirModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 mb-6 flex items-center space-x-2"
      >
        <FaPlus /> <span>Crear Usuario</span>
      </button>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-950">Lista de Usuarios</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-200">
          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">Nombre</th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">Apellido</th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">Correo</th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">Teléfono</th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">Edad</th>
          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
          <tr key={usuario._id} className="text-center">
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">{usuario.nombre}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">{usuario.apellido}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">{usuario.correo}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">{usuario.telefono}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-blue-950">{usuario.edad}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2 space-x-2">
            <button
              onClick={() => abrirModal(usuario)}
              className="bg-yellow-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-yellow-600 transition-colors duration-300 flex items-center space-x-2"
            >
              <FaEdit /> <span>Editar</span>
            </button>
            <button
              onClick={() => eliminarUsuario(usuario._id, token, setUsuarios, usuarios, setAlerta)}
              className="bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
            >
              <FaTrash /> <span>Eliminar</span>
            </button>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </div>
      {modalAbierto && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-70 p-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-sm sm:max-w-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-950">
          {editandoUsuario ? 'Editar Usuario' : 'Crear Usuario'}
          </h2>
          <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={editandoUsuario ? editandoUsuario.nombre : nuevoUsuario.nombre}
            onChange={(e) =>
            editandoUsuario
              ? setEditandoUsuario({ ...editandoUsuario, nombre: e.target.value })
              : setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-300 text-blue-950"
          />

        <input
        type="text"
        placeholder="Apellido"
        value={editandoUsuario ? editandoUsuario.apellido : nuevoUsuario.apellido}
        onChange={(e) =>
          editandoUsuario
          ? setEditandoUsuario({ ...editandoUsuario, apellido: e.target.value })
          : setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-300 text-blue-950"
        />
        <input
        type="text"
        placeholder="Teléfono"
        value={editandoUsuario ? editandoUsuario.telefono : nuevoUsuario.telefono}
        onChange={(e) =>
          editandoUsuario
          ? setEditandoUsuario({ ...editandoUsuario, telefono: e.target.value })
          : setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-300 text-blue-950"
        />
        <input
        type="email"
        placeholder="Correo"
        value={editandoUsuario ? editandoUsuario.correo : nuevoUsuario.correo}
        onChange={(e) =>
          editandoUsuario
          ? setEditandoUsuario({ ...editandoUsuario, correo: e.target.value })
          : setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-300 text-blue-950"
        />
        <input
        type="password"
        placeholder="Contraseña"
        value={editandoUsuario ? editandoUsuario.pass : nuevoUsuario.pass}
        onChange={(e) =>
          editandoUsuario
          ? setEditandoUsuario({ ...editandoUsuario, pass: e.target.value })
          : setNuevoUsuario({ ...nuevoUsuario, pass: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-300 text-blue-950"
        />
        <input
        type="text"
        placeholder="Edad"
        value={editandoUsuario ? editandoUsuario.edad : nuevoUsuario.edad}
        onChange={(e) =>
          editandoUsuario
          ? setEditandoUsuario({ ...editandoUsuario, edad: e.target.value })
          : setNuevoUsuario({ ...nuevoUsuario, edad: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors duration-300 text-blue-950"
        />
          {/* Other input fields */}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={cerrarModal}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <FaTimes /> <span>Cancelar</span>
          </button>
          <button
    onClick={() =>
      editandoUsuario
      ? actualizarUsuario(editandoUsuario, token, setUsuarios, usuarios, cerrarModal, setAlerta)
      : crearUsuario(token, nuevoUsuario, setUsuarios, usuarios, cerrarModal, setAlerta)
    }
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
    >
    <FaSave /> <span>{editandoUsuario ? 'Guardar' : 'Crear'}</span>
    </button>
          </div>
        </div>
        </div>
      )}
      </div>
    );
};

export default CrudUsuarios;