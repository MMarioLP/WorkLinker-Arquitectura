import { useLayoutEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import { DataStore } from "aws-amplify";
import { Producto, Proveedor } from "../../models";

import Swal from "sweetalert2";

import { Button, TextField, Card, CardHeader } from "@mui/material";
import { VisuallyHiddenInput } from "@chakra-ui/react";

import { TbCloudUpload } from "react-icons/tb";


function RegistroProductos( emailOwner ) {

  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [provedor, setProvedor] = useState({})

const PROHIBITED_CHARS = /[?*¨´_"$/\\?¿[\]{}:=^;<>+~,@'%#¡!°¬|+]+/g;
const ALPHA_NUMERIC_EXTENDED = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9()&.,-\s]{0,150}$/;
const NUMERIC = /^[0-9]+$/;

const validaciones = {
    nombreProducto: {
        maxLength: 150,
        regex: ALPHA_NUMERIC_EXTENDED,
        help: "El campo nombreProducto tiene un máximo de 150 caracteres"
    },
    descripcion: {
        maxLength: 900,
        regex: ALPHA_NUMERIC_EXTENDED,
        help: "El campo descripcion tiene un máximo de 900 caracteres"
    },
    stock: {
        regex: NUMERIC,
        maxLength: 10,
        help: "Ingrese un número de stock (hasta 10 dígitos)"
    },
    precio: {
        regex: NUMERIC,
        maxLength: 5,
        help: "Ingresa un precio válido de hasta 5 dígitos numéricos"
    },
    categoria: {
        maxLength: 50,
        regex: ALPHA_NUMERIC_EXTENDED,
        help: "El campo categoria tiene un máximo de 50 caracteres"
    }
};

const handleChange = (event) => {
    const { name, value } = event.target;
    let help = null;
    let error = false;

    if (validaciones[name]) {
        event.target.value = value.replace(PROHIBITED_CHARS, "").replace(/\s{2,}/g, " ");

        const validation = validaciones[name];
        if (!validation.regex.test(value) || value.length > validation.maxLength) {
            help = validation.help;
            error = true;
        }
    }

    // Aquí puede ir la lógica para manejar el error si existe
    if (error) {
        console.log(help);
    }


    // Verificar si existe un error antes de actualizar el estado
    setinfProducto((past) => ({
      ...past,
      [name]: event.target.value,
      error: { ...past.error, [name]: error },
      help: { ...past.help, [name]: help },
    }));
  };

  const [infProducto, setinfProducto] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenURL: '',
    categoria: '',
    error: {},
    help: {}
  });

  const inputs = [
    {
      id: 1,
      label: "Nombre del producto",
      name: "nombreProducto",
      validations: { maxLength: 250 },
      error: infProducto.error?.nombreProducto,
      helperText: infProducto.help?.nombreProducto,
      value: infProducto.nombreProducto,
    },
    {
      id: 2,
      label: "Descripcion del producto",
      name: "descripcion",
      validations: { maxLength: 900 },
      error: infProducto.error?.descripcion,
      helperText: infProducto.help?.descripcion,
      value: infProducto.descripcion,
    },
    {
      id: 3,
      label: "Precio del producto",
      name: "precio",
      error: infProducto.error?.precio,
      helperText: infProducto.help?.precio,
      value: infProducto.precio,
    },
    {
      id: 4,
      label: "Stock del producto",
      name: "stock",
      error: infProducto.error?.stock,
      helperText: infProducto.help?.stock,
      value: infProducto.stock,
    },
    {
      id: 5,
      label: "Categoria del producto",
      name: "categoria",
      error: infProducto.error?.categoria,
      helperText: infProducto.help?.categoria,
      value: infProducto.categoria,
    },
  ];

  const guardarProducto = async () => {
    try {
      const proveedores = new Producto({
        nombreProducto: infProducto.nombreProducto,
        descripcion: infProducto.descripcion,
        precio: infProducto.precio,
        stock: infProducto.stock,
        imagenURL: infProducto.imagenURL,
        categoria: infProducto.categoria,

        proveedorID: provedor.proveedorID
      })
      await DataStore.save(proveedores);
      return true
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const validateField = (field, message) => {
    if (!field || typeof field !== 'string' || field.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: message,
        confirmButtonText: 'Aceptar',
      })
      return false
    }
    return true
  }

  const validateFieldsForStepZero = () => {
    const { nombreProducto, descripcion, error } = infProducto;
  
    if (!validateField(nombreProducto, 'El campo Nombre del producto es requerido')) return false;
    if (!validateField(descripcion, 'El campo descripcion es requerido')) return false;
    if (error.nombreProducto) {
      Swal.fire({
        icon: 'error',
        title: '¡Ups! Hubo un problema',
        html: '<p>Parece que hay un error en el campo <strong>nombre del producto</strong></p>',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }
    if (error.descripcion) {
      Swal.fire({
        icon: 'error',
        title: '¡Ups! Hubo un problema',
        html: '<p>Parece que hay un error en el campo <strong>descripcion del producto</strong></p>',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }
    return true;
  };
  
  
  const handleNext = async () => {
    console.log("¿Entra a handleNext?");

    console.log("Valor de activeStep:", activeStep);
    switch (activeStep) {
      case 0:
        if (validateFieldsForStepZero()) {
          localStorage.setItem('infProducto', JSON.stringify(infProducto));
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
        break;
  
      case 2:
        const guardadoCorrectamente = await guardarProducto();
        console.log(guardadoCorrectamente);

        if (guardadoCorrectamente) {
          Swal.fire({
            title: '¡Registro completado!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            navigate('/inicio-empresa');
          });
        }  else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al guardar el registro',
            confirmButtonText: 'Aceptar',
          });
        }
        break;
      default:
        break;
    }
}

useLayoutEffect(() => {
    async function getEmpresa() {
      const proveedor = await DataStore.query(Proveedor, (c) => c.correo.eq(emailOwner));
      setProvedor(proveedor[0]);
    }
    getEmpresa();
  }, [emailOwner]);

  return (
    <div>
      <Card sx={{ justifyContent: "center", alignItems: "center", border: 0, m: 1 }} variant="outlined">
        <CardHeader className="text-center" title="Registro productos"> </CardHeader>
        <Form noValidate >
          <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-8 col-md-7 col-lg-6">
              <h6>Datos</h6>
              <div className="row p-2">
                {inputs.map((input) => (
                  <div className="col-sm-12 col-md-6 p-2" key={input.id}>
                    <TextField
                      key={input.id}
                      style={{ width: "100%" }}
                      required
                      size="normal"
                      margin="normal"
                      name={input.name}
                      label={input.label}
                      inputProps={input.validations}
                      value={input.value}
                      multiline={false}
                      onPaste={(e) => e.preventDefault()}
                      onChange={handleChange}
                      helperText={input.helperText}
                      error={input.error}
                      disabled={input.name === "email"} 
                    />
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between">
                <TextField
                  label="Imagen del producto"
                  size="normal"
                  margin="normal"
                  placeholder="Carga imagenes del producto "
                  value={infProducto?.nombreLogo ? infProducto.nombreLogo : ''} 
                  InputProps={{
                    endAdornment: (
                      <Button component="label" variant="contained" startIcon={<TbCloudUpload />}>
                        Cargar
                        <VisuallyHiddenInput type="file" onChange={"hola"} accept="image/*" />
                      </Button>
                    ),
                  }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </div>
              <div
                style={{ display: "flex", justifyContent: "center", alignItems: "center"}} >
                <div className="col-sm-12 col-md-6 p-2">
                  <Button variant="contained" onClick={handleNext} >Guardar</Button> 
                </div>
                <div>
                  <Button style={{ backgroundColor: "red" }} href="/inicio-usuarios" variant="contained">
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default RegistroProductos;