export const handleSubmitLogin = async (email, password, setCargaLogin, setAlertMessage, setAlertType, navigate) => {
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
            setAlertMessage(`Error: ${data.error}`);
            setAlertType('error');
            return;
        }
        if (response.ok) {
            const { _id, nombre, apellido, telefono, correo, edad, rol } = data.usuario;
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('rol', rol);
            localStorage.setItem('id', _id.toString());
            localStorage.setItem('authToken', data.token);
            setAlertMessage('Inicio de sesión exitoso');
            setAlertType('success');
            navigate('/dashboard');
        } else {
            setAlertMessage('Error: No se pudo iniciar sesión. Por favor, verifica tus credenciales.');
            setAlertType('error');
        }
    } catch (error) {
        console.error('Error:', error);
        setAlertMessage('Error: Ocurrió un problema al intentar iniciar sesión. Inténtalo de nuevo más tarde.');
        setAlertType('error');
    } finally {
        setCargaLogin(false);
    }
};

export const handleSubmitRegister = async (
    nombre,
    apellido,
    telefono,
    email,
    password,
    edad,
    setCarga,
    setAlertMessage,
    setAlertType,
    navigate
) => {
    setCarga(true);
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
            setAlertMessage(data.error);
            setAlertType('error');
            return;
        }
        if (response.status === 201) {
            setAlertMessage('Usuario registrado con éxito');
            setAlertType('success');
            navigate('/dashboard');
        }
    } catch (error) {
        console.error('Error:', error);
        setAlertMessage('Error: Ocurrió un problema al intentar registrarse.');
        setAlertType('error');
    } finally {
        setCarga(false);
    }
};