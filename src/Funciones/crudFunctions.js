export const fetchUsuarios = async (token, setUsuarios) => {
    try {
        const response = await fetch('https://workspaceapi.onrender.com/usuarios', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 401 || response.status === 403) {
            alert('Sesión expirada o no autorizada. Por favor, inicia sesión nuevamente.');
            localStorage.removeItem('authToken');
            window.location.href = '/dashboard';
            return;
        }
        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
};

export const crearUsuario = async (token, nuevoUsuario, setUsuarios, usuarios, cerrarModal, setAlerta) => {
    try {
        const response = await fetch('https://workspaceapi.onrender.com/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(nuevoUsuario),
        });
        if (response.status === 401 || response.status === 403 || response.status === 402) {
            setAlerta({
                mensaje: 'Sesión expirada o no autorizada. Por favor, inicia sesión nuevamente.',
                tipo: 'error',
            });
            localStorage.removeItem('authToken');
            window.location.href = '/dashboard';
            return;
        }
        if (!response.ok) {
            throw new Error('Error al crear el usuario');
        }
        const data = await response.json();
        setUsuarios([...usuarios, data]);
        setAlerta({ mensaje: 'Usuario creado exitosamente', tipo: 'success' });
        cerrarModal();
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        setAlerta({ mensaje: 'Error al crear el usuario', tipo: 'error' });
    }
};

export const actualizarUsuario = async (editandoUsuario, token, setUsuarios, usuarios, cerrarModal, setAlerta) => {
    try {
        const response = await fetch(`https://workspaceapi.onrender.com/usuarios/${editandoUsuario._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editandoUsuario),
        });
        if (response.status === 401 || response.status === 403 || response.status === 402) {
            setAlerta({
                mensaje: 'Sesión expirada o no autorizada. Por favor, inicia sesión nuevamente.',
                tipo: 'error',
            });
            localStorage.removeItem('authToken');
            window.location.href = '/dashboard';
            return;
        }
        if (!response.ok) {
            throw new Error('Error al actualizar el usuario');
        }
        const data = await response.json();
        setUsuarios(usuarios.map((usuario) => (usuario._id === editandoUsuario._id ? data : usuario)));
        setAlerta({ mensaje: 'Usuario actualizado exitosamente', tipo: 'success' });
        cerrarModal();
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        setAlerta({ mensaje: 'Error al actualizar el usuario', tipo: 'error' });
    }
};

export const eliminarUsuario = async (id, token, setUsuarios, usuarios, setAlerta) => {
    try {
        const response = await fetch(`https://workspaceapi.onrender.com/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 401 || response.status === 403 || response.status === 402) {
            setAlerta({
                mensaje: 'Sesión expirada o no autorizada. Por favor, inicia sesión nuevamente.',
                tipo: 'error',
            });
            localStorage.removeItem('authToken');
            window.location.href = '/dashboard';
            return;
        }
        if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
        }
        setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
        setAlerta({ mensaje: 'Usuario eliminado exitosamente', tipo: 'success' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        setAlerta({ mensaje: 'Error al eliminar el usuario', tipo: 'error' });
    }
};