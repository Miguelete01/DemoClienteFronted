# DemoClienteFronted
Demo Cliente Frontend

https://sweetalert2.github.io/#download

npx create-react-app Name

librerias
MaterialUI
HookForm
Axios

const axiosConfig = axios.create({
    baseURL: 'http://localhost:15972/api/'
});

export const getById = (id) => axios.get(`Cliente/${id}`);

<div className="div-form">
   <Controller
     name="nombre"
     control={control}
     rules={{ required: true }}
     render={({
        field: { onChange, onBlur, value, ref },
     }) => (
     <TextField
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        label="Nombre"
     />
     )}            
    />
</div>

para dejar pasar el cors
Allow CORS: Access-Control-Allow-Origin