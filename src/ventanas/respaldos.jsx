import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { fetchCollections, exportCollections } from "../Funciones/respaldosFunctions";

const Respaldos = () => {
    const [collections, setCollections] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });
    const token = localStorage.getItem("authToken");

    // Fetch collections from the API
    useEffect(() => {
        fetchCollections(token, setCollections, setAlerta);
    }, [token]);

    // Handle selection of collections
    const handleSelectCollection = (collection) => {
        setSelectedCollections((prevSelected) =>
            prevSelected.includes(collection)
                ? prevSelected.filter((col) => col !== collection)
                : [...prevSelected, collection]
        );
    };

    // Handle export
    const handleExport = () => {
        exportCollections(token, selectedCollections, setLoading, setAlerta);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col p-6">
            <Navbar bgColor="bg-blue-900" bgOpacity="opacity-100" />
            <div className="container mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
                    Respaldos de Base de Datos
                </h1>
                <p className="text-gray-700 mb-6 text-center">
                    Selecciona las colecciones que deseas exportar como respaldo.
                </p>

                {/* Alert Component */}
                {alerta.mensaje && (
                    <div
                        className={`alert ${
                            alerta.tipo === "error" ? "alert-error" : "alert-success"
                        } shadow-lg mb-4`}
                    >
                        <div>
                            <span>{alerta.mensaje}</span>
                        </div>
                    </div>
                )}

                {collections.length === 0 ? (
                    <p className="text-center text-gray-500 animate-pulse">
                        Cargando colecciones...
                    </p>
                ) : (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() =>
                                    setSelectedCollections(
                                        selectedCollections.length === collections.length
                                            ? []
                                            : collections
                                    )
                                }
                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
                            >
                                {selectedCollections.length === collections.length
                                    ? "Deseleccionar Todas"
                                    : "Seleccionar Todas"}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {collections.map((collection) => (
                                <div
                                    key={collection}
                                    className="flex items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                                >
                                    <input
                                        type="checkbox"
                                        id={collection}
                                        checked={selectedCollections.includes(collection)}
                                        onChange={() => handleSelectCollection(collection)}
                                        className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-transform transform hover:scale-110"
                                    />
                                    <label
                                        htmlFor={collection}
                                        className="text-gray-800 font-medium cursor-pointer"
                                    >
                                        {collection}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex justify-center">
                    <button
                        onClick={handleExport}
                        className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all ${
                            loading
                                ? "bg-blue-400 cursor-not-allowed opacity-75"
                                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                        }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Exportando...
                            </span>
                        ) : (
                            "Exportar Seleccionadas"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Respaldos;