import React, { useState, useRef, useEffect } from "react";
import { parseBlob } from "music-metadata-browser";
import { Buffer } from "buffer";
import Navbar from "./components/navbar";
window.Buffer = Buffer;


const Entorno = () => {
    const [brightness, setBrightness] = useState(50);
    const [color, setColor] = useState("#ffff00");
    const [temperature, setTemperature] = useState(24);
    const [ventilation, setVentilation] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [trackMetadata, setTrackMetadata] = useState([]);
    const audioRef = useRef(null);

    const audioFiles = [
        "/audio/1.mp3",
        "/audio/2.mp3",
        "/audio/3.mp3",
    ];

    // Cargar metadatos de las canciones
    useEffect(() => {
        const loadMetadata = async () => {
            const metadataList = [];
            for (const file of audioFiles) {
                try {
                    const response = await fetch(file);
                    const blob = await response.blob();
                    const metadata = await parseBlob(blob);
                    metadataList.push({
                        title: metadata.common.title || "Desconocido",
                        artist: metadata.common.artist || "Desconocido",
                        duration: metadata.format.duration || 0,
                        file,
                    });
                } catch (error) {
                    console.error(`Error al cargar metadatos de ${file}:`, error);
                }
            }
            setTrackMetadata(metadataList);
        };

        loadMetadata();
    }, []);

    const handleBrightnessChange = (e) => setBrightness(e.target.value);
    const handleColorChange = (e) => setColor(e.target.value);
    const handleTemperatureChange = (e) => setTemperature(e.target.value);
    const handleVentilationChange = (e) => setVentilation(e.target.value);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % trackMetadata.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(false);
    };

    const handlePreviousTrack = () => {
        const prevIndex =
            (currentTrackIndex - 1 + trackMetadata.length) % trackMetadata.length;
        setCurrentTrackIndex(prevIndex);
        setIsPlaying(false);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [currentTrackIndex]);

    const getTemperatureIcon = () => {
        if (temperature <= 18) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m0-10l-6 6m6-6l6 6m-6-6l-6-6m6 6l6-6" />
                </svg>
            );
        } else if (temperature >= 28) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m8-10h2m-16 0H2m15.364-7.364l1.414 1.414M4.222 19.778l1.414-1.414M19.778 19.778l-1.414-1.414M4.222 4.222l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10V5a2 2 0 10-4 0v5a4 4 0 104 0z" />
                </svg>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-white p-4 md:p-8">
            <Navbar bgColor="bg-blue-600" bgOpacity="opacity-98" />
            <div className="max-w-6xl mx-auto mt-18">
                <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Control de Entorno
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sección de Iluminación */}
                    <div className="card xdxd shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4 text-gray-800">Control de Iluminación</h2>
                            
                            {/* Simulación de habitación */}
                            <div className="relative w-full h-64 bg-gray-900 rounded-box overflow-hidden flex items-center justify-center mb-6 border border-gray-700">
                                {/* Lámpara en el techo */}
                                <svg className="absolute top-8" width="80" height="80" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="20"
                                        fill={color}
                                        style={{
                                            filter: `drop-shadow(0 0 ${brightness/5}px ${color})`,
                                            opacity: brightness/100,
                                        }}
                                    />
                                    <line x1="50" y1="0" x2="50" y2="30" stroke="white" strokeWidth="2" />
                                </svg>
                                
                                {/* Piso */}
                                <div className="absolute bottom-0 w-full h-16 bg-gray-800"></div>
                                
                                {/* Efecto de luz */}
                                <div 
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at center, ${color}20 0%, transparent ${brightness}%)`,
                                    }}
                                ></div>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="label">
                                        <span className="label-text text-lg mr-2 text-blue-900">{brightness}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={brightness}
                                        onChange={handleBrightnessChange}
                                        className="range range-primary range-lg"
                                    />
                                </div>
                                
                                <div>
                                    <label className="label">
                                        <span className="label-text text-lg text-blue-900">Color de la luz</span>
                                    </label>
                                    <div className="flex items-center justify-center gap-4">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={handleColorChange}
                                            className="w-16 h-16 cursor-pointer rounded-full border-2 border-gray-400"
                                        />
                                        <div className="badge badge-lg text-blue-950" style={{ backgroundColor: color }}>
                                            {color.toUpperCase()}
                                        </div>
                                    </div>
                                </div>

                                {/* Modos predefinidos */}
<div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Modos predefinidos</h3>
    <div className="flex flex-wrap gap-4">
        <button
            className="btn btn-primary"
            onClick={() => {
                setColor("#FFD700"); // Amarillo dorado
                setBrightness(80); // Brillo alto
            }}
        >
            Lectura
        </button>
        <button
            className="btn btn-secondary"
            onClick={() => {
                setColor("#FF69B4"); // Rosa
                setBrightness(50); // Brillo medio
            }}
        >
            Relajación
        </button>
        <button
            className="btn btn-accent"
            onClick={() => {
                setColor("#00FF00"); // Verde
                setBrightness(100); // Brillo máximo
            }}
        >
            Fiesta
        </button>
        <button
            className="btn btn-warning"
            onClick={() => {
                setColor("#87CEEB"); // Azul cielo
                setBrightness(30); // Brillo bajo
            }}
        >
            Noche
        </button>
    </div>
</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sección de Clima */}
                    <div className="space-y-6">
                        {/* Control de temperatura */}
                        <div className="card xdxd shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4 text-gray-800">
                                    Control de Temperatura
                                </h2>
                                
                                <div className="flex flex-col items-center mb-6">
                                    {getTemperatureIcon()}
                                    <div 
                                        className="radial-progress text-primary mt-4" 
                                        style={{
                                            "--value": ((temperature - 16) / (30 - 16)) * 100, 
                                            "--size": "8rem"
                                        }}
                                    >
                                        <span className="text-2xl font-bold text-gray-800">
                                            {temperature}°C
                                        </span>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="label">
                                        {/** <span className="label-text text-lg">
                                            Temperatura:
                                        </span>
                                        */}
                                        <span className="label-text text-lg mr-1.5 text-blue-800">
                                            {temperature}°C
                                        </span>
                                    </label>
                                    <input
                                        type="range"
                                        min="16"
                                        max="30"
                                        value={temperature}
                                        onChange={handleTemperatureChange}
                                        className="range range-secondary range-lg"
                                    />
                                    <div className="flex justify-between text-xs px-2 mt-1 text-blue-800">
                                        <span>16°C</span>
                                        <span>23°C</span>
                                        <span>30°C</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Control de ventilación */}
                        <div className="card xdxd shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4 text-blue-800">Control de Ventilación</h2>
                                
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-16 h-16 text-blue-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            style={{
                                                animation: `spin ${3 / ventilation}s linear infinite`,
                                            }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v4m0 8v4m4-4h4m-8 0H4m7.293-7.293l2.828 2.828m0 0l2.828-2.828m-2.828 2.828L9.465 9.465m4.243 4.243l2.828 2.828m0 0l-2.828 2.828m2.828-2.828l-2.828-2.828"
                                            />
                                        </svg>
                                        <div className="absolute -bottom-2 -right-2 badge badge-primary badge-lg">
                                            {ventilation}
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="label">
                                        {/** <span className="label-text text-lg">Nivel de ventilación</span> */}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={ventilation}
                                        onChange={handleVentilationChange}
                                        className="range range-accent range-lg"
                                        step="1"
                                    />
                                    <div className="flex justify-between text-xs px-1 mt-1 text-blue-800">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <span key={level}>{level}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Control de música */}
                        <div className="card xdxd shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4 text-blue-800">Control de Música</h2>

                                {trackMetadata.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-lg font-semibold text-gray-800">
                                            Canción: {trackMetadata[currentTrackIndex]?.title}
                                        </p>
                                        <p className="text-sm text-gray-800">
                                            Artista: {trackMetadata[currentTrackIndex]?.artist}
                                        </p>
                                        <p className="text-sm text-gray-800">
                                            Duración:{" "}
                                            {Math.floor(
                                                trackMetadata[currentTrackIndex]?.duration / 60
                                            )}
                                            :
                                            {Math.floor(
                                                trackMetadata[currentTrackIndex]?.duration % 60
                                            )
                                                .toString()
                                                .padStart(2, "0")}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={handlePreviousTrack}
                                        className="btn btn-secondary"
                                    >
                                        Anterior
                                    </button>
                                    <button
                                        onClick={toggleMusic}
                                        className={`btn btn-lg ${
                                            isPlaying ? "btn-error" : "btn-success"
                                        }`}
                                    >
                                        {isPlaying ? "Pausar" : "Reproducir"}
                                    </button>
                                    <button
                                        onClick={handleNextTrack}
                                        className="btn btn-secondary"
                                    >
                                        Siguiente
                                    </button>
                                </div>

                                <audio ref={audioRef} controls className="hidden">
                                    <source
                                        src={trackMetadata[currentTrackIndex]?.file}
                                        type="audio/mpeg"
                                    />
                                    Tu navegador no soporta el elemento de audio.
                                </audio>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="mt-8 text-center">
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline btn-primary"
                    >
                        Regresar a Entornos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Entorno;