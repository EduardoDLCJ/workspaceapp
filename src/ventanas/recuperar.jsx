import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Recuperar = () => {
    const [correo, setEmail] = useState('');
    const [nuevaContrasena, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseñas
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); // 'success' o 'error'
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            verifyToken(tokenFromUrl);
        }
    }, [searchParams]);

    const verifyToken = async (token) => {
        try {
            const response = await fetch('https://workspaceapi.onrender.com/recuperar/verify-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsTokenValid(true);
                console.log('Token válido:', data);
            } else {
                setIsTokenValid(false);
                setAlertMessage('El token no es válido o ha expirado.');
                setAlertType('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setIsTokenValid(false);
            setAlertMessage('Error al verificar el token.');
            setAlertType('error');
        }
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://workspaceapi.onrender.com/recuperar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo }),
            });
            const data = await response.json();
            if (response.ok) {
                setAlertMessage('Correo enviado con éxito');
                setAlertType('success');
            } else {
                setAlertMessage(data.error || 'Ocurrió un error al enviar el correo');
                setAlertType('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Ocurrió un error al enviar el correo');
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (nuevaContrasena.length < 8) {
            setAlertMessage('La contraseña debe tener al menos 8 caracteres.');
            setAlertType('error');
            return;
        }
        if (nuevaContrasena !== confirmPassword) {
            setAlertMessage('Las contraseñas no coinciden.');
            setAlertType('error');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('https://workspaceapi.onrender.com/recuperar/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, nuevaContrasena }),
            });
            if (response.ok) {
                setAlertMessage('Contraseña cambiada con éxito.');
                setAlertType('success');
                setTimeout(() => navigate('/login'), 2000); // Redirige al login después de 2 segundos
            } else {
                const data = await response.json();
                setAlertMessage(data.error || 'Error al cambiar la contraseña.');
                setAlertType('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Error al cambiar la contraseña.');
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-600 to-blue-100 items-center justify-center">
            {/* Alerta */}
            {alertMessage && (
                <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'} shadow-lg absolute top-5 left-1/2 transform -translate-x-1/2 z-50`}>
                    <div>
                        <span>{alertMessage}</span>
                        <button
                            onClick={() => setAlertMessage('')}
                            className="ml-4 btn btn-sm btn-circle btn-outline"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Formulario */}
            <div className="bg-blue-50 p-7 rounded-4xl shadow-md w-full max-w-md relative z-10 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                {isTokenValid ? (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 sm:text-3xl lg:text-4xl">
                            Cambiar Contraseña
                        </h2>
                        <form onSubmit={handleSubmitPassword}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="password">
                                    Nueva Contraseña:
                                </label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-fuchsia-400 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={nuevaContrasena}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Ingresa tu nueva contraseña"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="ml-2 text-gray-500 focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                                    Confirmar Contraseña:
                                </label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-fuchsia-400 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Confirma tu nueva contraseña"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="ml-2 text-gray-500 focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 transition-colors duration-300"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-infinity loading-sm"></span>
                                ) : (
                                    'Cambiar Contraseña'
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 sm:text-3xl lg:text-4xl">
                            Recuperar Contraseña
                        </h2>
                        <p className="text-center text-gray-600 mb-6">
                            Ingresa tu correo para recibir un enlace de recuperación.
                        </p>
                        <form onSubmit={handleSubmitEmail}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">
                                    Correo:
                                </label>
                                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-fuchsia-400 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
                                    <input
                                        type="email"
                                        id="email"
                                        value={correo}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full focus:outline-none text-blue-700"
                                        placeholder="Ingresa tu correo"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 transition-colors duration-300"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-infinity loading-sm"></span>
                                ) : (
                                    'Enviar correo'
                                )}
                            </button>
                        </form>
                    </>
                )}
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 w-full bg-gray-500 text-white p-2 rounded-3xl hover:bg-gray-600 transition-colors duration-300"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default Recuperar;