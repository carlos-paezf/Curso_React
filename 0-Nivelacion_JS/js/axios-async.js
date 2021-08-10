const peticionAxios = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/3');
    return data;
}
const respuesta = peticionAxios().then(console.log);