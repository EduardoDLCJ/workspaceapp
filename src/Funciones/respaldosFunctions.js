export const fetchCollections = async (token, setCollections, setAlerta) => {
    try {
        const response = await fetch("https://workspaceapi.onrender.com/collections", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401 || response.status === 403) {
            setAlerta({
                mensaje: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
                tipo: "error",
            });
            localStorage.removeItem("authToken");
            window.location.href = "/dashboard";
            return;
        }

        const data = await response.json();
        setCollections(Object.keys(data)); // Obtener los nombres de las colecciones
    } catch (error) {
        console.error("Error fetching collections:", error);
        setAlerta({
            mensaje: "Error al cargar las colecciones.",
            tipo: "error",
        });
    }
};

export const exportCollections = async (token, selectedCollections, setLoading, setAlerta) => {
    if (selectedCollections.length === 0) {
        setAlerta({
            mensaje: "Por favor, selecciona al menos una colección para exportar.",
            tipo: "error",
        });
        return;
    }

    setLoading(true);

    try {
        const response = await fetch("https://workspaceapi.onrender.com/collections/export", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ collections: selectedCollections }),
        });

        if (response.status === 401 || response.status === 403) {
            setAlerta({
                mensaje: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
                tipo: "error",
            });
            localStorage.removeItem("authToken");
            window.location.href = "/dashboard";
            return;
        }

        if (!response.ok) {
            throw new Error("Error al exportar las colecciones.");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "respaldos.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();

        setAlerta({
            mensaje: "Colecciones exportadas exitosamente.",
            tipo: "success",
        });
    } catch (error) {
        console.error("Error exporting collections:", error);
        setAlerta({
            mensaje: "Hubo un error al exportar las colecciones.",
            tipo: "error",
        });
    } finally {
        setLoading(false);
    }
};