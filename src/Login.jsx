import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faCalendar } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [edad, setEdad] = useState('');
    const [carga, setCarga] = useState('');
    const [cargaLogin, setCargaLogin] = useState(false);
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setCargaLogin(true);
        try {
            const response = await fetch('https://workspaceapi.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
                return;
            }
            if (response.ok) {
                const { _id, nombre, apellido, telefono, correo, edad, rol } = data.usuario;
                localStorage.setItem('nombre', nombre);
                localStorage.setItem('rol', rol);
                localStorage.setItem('id', _id.toString());
                localStorage.setItem('authToken', data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCargaLogin(false);
        }
    };

    const handleSubmitRegister = async (e) => {
        setCarga(true);
        e.preventDefault();
        try {
            const response = await fetch('https://workspaceapi.onrender.com/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellido, telefono, correo: email, pass: password, edad }),
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
                return;
            }
            if (response.status === 201) {
                navigate('/dashboard');
                alert("Usuario registrado con éxito");
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCarga(false);
        }
    };

    return (
        <div
            className={`flex min-h-screen transition-all duration-500 ${
                isLogin ? '' : 'flex-row-reverse'
            }`}
        >
            {/* Mitad izquierda con degradado */}
            <div className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-50 relative flex flex-col items-center justify-center">
            {/* Formas geométricas decorativas */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-white opacity-20 rounded-full"></div>
            <div className="absolute top-40 left-20 w-32 h-32 bg-white opacity-30 rounded-lg"></div>
            <div className="absolute bottom-20 left-10 w-20 h-20 bg-white opacity-25 rotate-45"></div>
            <div className="absolute bottom-10 right-10 w-28 h-28 bg-white opacity-15 rounded-full"></div>
            
            {/* Texto llamativo */}
            <h2 className="text-center text-white text-3xl font-bold mb-6 px-10">
                {isLogin
                    ? '¡Bienvenido de nuevo!'
                    : '¡Únete a nosotros!'}
            </h2>
            <p className="text-center text-white text-lg mb-8 px-10 opacity-90">
                {isLogin
                    ? 'Inicia sesión para descubrir todo lo que tenemos para ti.'
                    : 'Crea tu cuenta y disfruta de nuestros servicios exclusivos.'}
            </p>
    
        {/* Botón transparente con borde */}
        <button
            onClick={() => setIsLogin(!isLogin)}
            className="absolute bottom-10 left-10 bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-300 shadow-md"
        >
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
        </button>
</div>

            {/* Mitad derecha con el formulario */}
            <div className="w-1/2 flex items-center justify-center bg-blue-50">
                <div className="bg-blue-50 p-7 rounded-4xl shadow-md w-full max-w-md relative z-10 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 sm:text-3xl lg:text-4xl">
                        {isLogin ? 'Iniciar sesión' : 'Registro'}
                    </h2>

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="w-full text-center text-blue-500 underline mb-4 hover:text-blue-600 transition-colors duration-300"
                    >
                        {isLogin
                            ? '¿No tienes una cuenta? Regístrate'
                            : '¿Ya tienes una cuenta? Inicia sesión'}
                    </button>
                    {isLogin ? (
                        <form onSubmit={handleSubmitLogin}>
                            {/* Formulario de inicio de sesión */}
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 mb-2"
                                    htmlFor="email"
                                >
                                    Correo:
                                </label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-fuchsia-400 transition-colors duration-300">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="text-gray-500 mr-2"
                                    />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Ingresa tu correo"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 mb-2"
                                    htmlFor="password"
                                >
                                    Contraseña:
                                </label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-fuchsia-400 transition-colors duration-300">
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="text-gray-500 mr-2"
                                    />
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Ingresa tu contraseña"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 transition-colors duration-300"
                            >
                                {cargaLogin ? (
                                    <span className="loading loading-infinity loading-sm"></span>
                                ) : (
                                    <p>Iniciar sesión</p>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmitRegister}>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                <label className="block text-gray-700 mb-2" htmlFor="nombre">Nombre:</label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-blue-500 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                                    <input
                                        type="text"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Ingresa tu nombre"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4 sm:mb-0">
                                <label className="block text-gray-700 mb-2" htmlFor="apellido">Apellido:</label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-blue-500 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                                    <input
                                        type="text"
                                        id="apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Ingresa tu apellido"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="mb-4 sm:mb-0">
                                <label className="block text-gray-700 mb-2" htmlFor="telefono">Teléfono:</label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-blue-500 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-2" />
                                    <input
                                        type="text"
                                        id="telefono"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Ingresa tu teléfono"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-6 sm:mb-0">
                                <label className="block text-gray-700 mb-2" htmlFor="edad">Edad:</label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-blue-500 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faCalendar} className="text-gray-500 mr-2" />
                                    <input
                                        type="text"
                                        id="edad"
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Ingresa tu edad"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Correo:</label>
                            <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-blue-500 transition-colors duration-300">
                                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full focus:outline-none text-blue-700"
                                    placeholder="Ingresa tu correo"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña:</label>
                            <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-blue-500 transition-colors duration-300">
                                <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full focus:outline-none text-blue-700"
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                            </div>
                        </div>
                        {carga ? (
                            <span className="loading loading-infinity loading-sm"></span>
                        ) : (
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
                            >
                                Registrarse
                            </button>
                        )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;