export async function RequestHTTP(urlBackend, metodo, formData, token,) {
    try {
        const url = `http://localhost:3000${urlBackend}`;
        const params = {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(formData), 
        };
        const response = await fetch(url, params);
        const result = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            throw result
        }
        return {
            sucess: true,
            error: false,
            result
        };
    } catch (mesague) {
        return {
            sucess: false,
            error: true,
            mesague
        };
    }
}