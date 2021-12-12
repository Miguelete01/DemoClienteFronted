import React, { useState, useEffect } from "react";
import * as apiCliente from './clienteServices';
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2'

const defaultValues = {
    nombre: '',
    apellido: '',
    edad: 0,
    direccion: ''
}

const ClienteLista = (props) => {
    
    const { handleSubmit, control, reset } = useForm({ defaultValues });
    const [dataTable, setDataTable] = useState([]);

    const getLista = () => {
      setDataTable([]);
      apiCliente.getAll().then(res => {   
        setDataTable(res.data);
      })
    }

    useEffect(() =>{        
        getLista();
    }, []);

    const onSubmit = (data) => {
      if (data?.id) {
        apiCliente.put(data).then( res => {
          Swal.fire({
            icon: 'success',
            title: 'Confirmación',
            text: 'Los datos se han guardado con éxito'
          });
          getLista();
          reset(defaultValues);
        });
      } 
      else 
      {
        apiCliente.post(data).then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Confirmación',
            text: 'Los datos se han guardado con éxito'
          });
          getLista();
          reset(defaultValues);
        });
      }
    };

    const handleDelete = (row) => {
      console.log("Row: ", row);
      Swal.fire({
        icon: 'success',
        title: 'Confirmación',
        text: 'Los cambios no se podrán recuperar',
        showDenyButton: true,
        showCancelButton: true,
      }).then( result => {
        if (result.value){
          apiCliente.remove(row.id).then(res => {
            Swal.fire('El cliente fue eliminado!', '', 'success')
            getLista();
          });
        }
        else if (result.dismiss === 'cancel')
        {
          Swal.fire('Cancelado!', '', 'error')
        }

      });
    }

    return (
        <React.Fragment>
          <h2>Agregar Cliente</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="div-form">
            <Controller
                name="apellido"
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
                    label="Apellido"
                    />
                )}            
            />
            </div>
            <div className="div-form">
                <Controller
                    name="edad"
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
                        label="Edad"
                        />
                    )}            
                />
            </div>
            <div>
                <Controller
                    name="direccion"
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
                        label="Direccion"
                        />
                    )}            
                />
            </div>
            <Button type="submit" variant="contained">Guadar</Button>            
            </form>
            <h2>Lista</h2>
            <div className="table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Edad</TableCell>
                    <TableCell>Direccion</TableCell>
                    <TableCell>Opciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTable.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.nombre}</TableCell>
                      <TableCell>{row.apellido}</TableCell>
                      <TableCell>{row.edad}</TableCell>
                      <TableCell>{row.direccion}</TableCell>
                      <TableCell>
                        <Button onClick={() => reset(row)}>Editar</Button>
                        <Button onClick={() => handleDelete(row)}>Eliminar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>                
        </React.Fragment>
    )
}
export default ClienteLista;