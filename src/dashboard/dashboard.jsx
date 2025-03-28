import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { FaHome, FaBuilding, FaCalendarCheck, FaPlug, FaClock, FaBolt } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="w-full bg-gradient-to-b from-blue-300 to-emerald-100">
            <Navbar bgColor="bg-blue-600" bgOpacity="opacity-98" />
            <div className="relative h-screen bg-cover bg-center">
                <div className="opacity-45 fondo"></div>
                <div className="relative z-10 flex items-center h-full pl-8 pr-8 md:pl-16 lg:pl-32 backdrop-blur-sm">
                    <div className="text-center">
                        {/* Texto principal con animación */}
                        <p className="bg-blue-800 bg-clip-text text-4xl font-extrabold text-transparent animate-fade-in-up drop-shadow-lg">
                            Bienvenido
                        </p>
                        {/* Párrafos adicionales con animaciones */}
                        <p className="mt-4 text-lg text-gray-800 max-w-full animate-fade-in-up delay-100 sm:text-xl sm:max-w-2xl font-semibold">
                            Ofrecemos una funcionalidad inovadora que permite la automatización y el monitoreo de entornos inteligentes mediante dispositivos IoT. A través de una app y una interfaz web, los usuarios pueden configurar escenarios personalizados, optimizar el uso de recursos y mejorar la eficiencia de sus espacios. Con tecnología avanzada y un enfoque intuitivo, brindamos una solución que transforma la manera en que interactuamos con nuestro entorno.
                        </p>
                                                
                        </div>
                    </div>
                </div>
                <div className="hero bg-gradient-to-r from-blue-600 to-emerald-300 text-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 sm:p-8">
                    <h1 className="text-3xl font-bold mb-10 sm:text-4xl sm:mb-20">Optimiza tu entorno con tecnología inteligente</h1>
                    <p className="mt-15 text-base sm:text-lg">Automatiza, monitorea y controla escenarios personalizados con dispositivos IoT desde una sola plataforma.</p>
                </div>
                
            {/* Secciones Clave */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-10 px-4">
                <div className="card bg-white shadow-lg p-6 rounded-lg text-blue-950 hover:bg-blue-100 transition-colors duration-300">
                    <h2 className="text-xl font-semibold">¿Qué ofrecemos?</h2>
                    <ul className="mt-4 space-y-2">
                        <li>✔️ Control total de escenarios inteligentes.</li>
                        <li>✔️ Integración con dispositivos IoT.</li>
                        <li>✔️ Análisis y reportes de uso.</li>
                        <li>✔️ Automatización con asistentes de voz.</li>
                    </ul>
                </div>

                <div className="card bg-white shadow-lg p-6 rounded-lg text-blue-950 hover:bg-blue-100 transition-colors duration-300">
                    <h2 className="text-xl font-semibold">Beneficios del Sistema</h2>
                    <ul className="mt-4 space-y-2">
                        <li>🚀 Ahorro de energía y recursos.</li>
                        <li>📊 Monitoreo en tiempo real.</li>
                        <li>⚡ Mejora del rendimiento.</li>
                        <li>🔒 Seguridad y control personalizado.</li>
                    </ul>
                </div>

                <div className="card bg-white shadow-lg p-6 rounded-lg text-blue-950 hover:bg-blue-100 transition-colors duration-300">
                    <h2 className="text-xl font-semibold">Casos de Uso</h2>
                    <ul className="mt-4 space-y-2">
                        <li>🏡 Hogar: Iluminación, sonido y temperatura.</li>
                        <li>🏢 Oficina: Optimización de espacios.</li>
                        <li>🎭 Eventos: Experiencias interactivas.</li>
                    </ul>
                </div>

                <div className="card bg-white shadow-lg p-6 rounded-lg text-blue-950 hover:bg-blue-100 transition-colors duration-300">
                    <h2 className="text-xl font-semibold">Únete al Futuro</h2>
                    <p className="mt-4">📲 Gestiona todo desde tu app o web.</p>
                    <p>✅ Prueba nuestra plataforma y transforma tu entorno.</p>
                </div>
            </div>

                {/* Nuevo apartado para la app móvil */}
                    <div className="py-16 px-8 descarga">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start backdrop-blur-sm">
                            <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-8"></div>
                            <div className="text-left">
                                <h2 className="text-3xl font-bold mb-4 text-blue-900">Descarga nuestra App Móvil</h2>
                                <p className="text-lg mb-6 text-blue-950">
                                    Lleva el control de tus entornos inteligentes a donde vayas. Descarga nuestra app móvil desde tu tienda favorita.
                                </p>
                                <div className="flex space-x-4 ">
                                    <a
                                        href="https://play.google.com/store"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                                    >
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                            alt="Descargar en Google Play"
                                            className="h-12"
                                        />
                                    </a>
                                    <a
                                        href="https://www.apple.com/app-store/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-900 transition-colors"
                                    >
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                            alt="Descargar en App Store"
                                            className="h-12"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>


                            <div className="my-16">
                                {/* Contenedor de la cuadrícula */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                    {/* Grupo 1 */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-300">
                            <img src="https://previews.123rf.com/images/edgecreative01/edgecreative012111/edgecreative01211100143/176909352-ilustraci%C3%B3n-de-informaci%C3%B3n-de-datos-hombre-y-ni%C3%B1a-evaluando-la-presentaci%C3%B3n-trabajo-de-oficina.jpg" alt="Información de la Empresa" className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Información de la Empresa</h2>
                                <p className="text-gray-700 text-center">
                                    Nuestra empresa se dedica a proporcionar soluciones innovadoras para mejorar la calidad de vida de nuestros clientes.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-400">
                            <img src="https://static.vecteezy.com/system/resources/previews/006/731/534/non_2x/strategic-business-mission-achievement-and-planning-illustration-flat-design-suitable-for-many-purposes-vector.jpg" alt="Misión" className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Misión</h2>
                                <p className="text-gray-700 text-center">
                                    Nuestra misión es ofrecer productos y servicios de alta calidad que superen las expectativas de nuestros clientes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Grupo 2 */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-500">
                            <img src="https://sellnowinc.com/wp-content/uploads/2023/09/vision3-1.jpg" alt="Visión" className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Visión</h2>
                                <p className="text-gray-700 text-center">
                                    Ser reconocidos como líderes en innovación y excelencia en nuestro sector, contribuyendo al bienestar de la sociedad.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-600">
                            <img src="https://www.lifeder.com/wp-content/uploads/2018/04/objetivos-de-una-empresa-lifeder-min-1024x724.jpg" alt="Objetivo" className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Objetivo</h2>
                                <p className="text-gray-700 text-center">
                                    Nuestro objetivo es expandir nuestra presencia en el mercado global y establecer relaciones duraderas con nuestros clientes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Dashboard;