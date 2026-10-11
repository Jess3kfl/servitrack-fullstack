import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const URL = `${API_URL}/clientes`;

const crearCliente = async (cliente) => {

    const respuesta = await axios.post(
        URL,
        cliente
    );

    return respuesta.data;
};

export default {
    crearCliente
};