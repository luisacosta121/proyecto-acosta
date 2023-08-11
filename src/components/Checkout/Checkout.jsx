import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { collection, getDocs, addDoc, documentId, writeBatch, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import { Link, Navigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import confirmacion from "./assets/confirmacion.png"
import "./Checkout.scss"

const provincias = [
    'Buenos Aires',
    'Capital Federal',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán',
]

const schema = Yup.object().shape({
    nombre: Yup.string()
                .min(3, "El nombre es demasiado corto")
                .max(20, "Máximo 20 caracteres")
                .required("Este campo es obligatorio"),
    apellido: Yup.string()
                .min(3, "El apellido es demasiado corto")
                .max(20, "Máximo 20 caracteres")
                .required("Este campo es obligatorio"),
    direccion: Yup.string()
                .min(3, "La direccion es demasiado corta")
                .max(50, "Máximo 50 caracteres")
                .required("Este campo es obligatorio"),
    localidad: Yup.string()
                .min(3, "La localidad es demasiado corta")
                .max(30, "Máximo 30 caracteres")
                .required("Este campo es obligatorio"),
    provincia: Yup.string()
                .min(3, "La provincia es demasiado corta")
                .max(30, "Máximo 30 caracteres")
                .required("Este campo es obligatorio"),
    email: Yup.string()
                .email("El email es inválido")
                .required("Este campo es obligatorio"),
    confirmacion: Yup.string()
                .oneOf([Yup.ref('email'), null], 'Los correos electrónicos no coinciden')
                .required('Este campo es obligatorio')
})

export const Checkout = () => {
    const { cart, totalCompra, vaciarCarrito } = useContext(CartContext)

    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
  
    const handleSubmit = async (values) => {
        setLoading(true)

        const orden = {
            cliente: values,
            items: cart.map(item => ({id: item.id, precio: item.precio, cantidad: item.cantidad, nombre: item.nombre})),
            total: totalCompra(),
            fyh: new Date()
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders")
        const productosRef = collection(db, "productos")
        const q = query(productosRef, where( documentId(), "in", cart.map(item => item.id) ))

        const productos = await getDocs(q)
        const outOfStock = []

        productos.docs.forEach((doc) => {
            const item = cart.find(prod => prod.id === doc.id )
            const stock = doc.data().stock

            if (stock >= item.cantidad) {
                batch.update(doc.ref, {
                    stock: stock - item.cantidad
                })

            } else {
                outOfStock.push(item)
            }
        })

        if (outOfStock.length === 0) {
            await batch.commit()
            const doc = await addDoc(ordersRef, orden)

            vaciarCarrito()
            setOrderId(doc.id)
        } else {
            const gamesWithoutStock = outOfStock.map(item => item.nombre).join(' - ');
            alert(`ESTOS JUEGOS NO TIENEN STOCK: ${gamesWithoutStock}`);
        }

        setLoading(false)
    }

    if (orderId) {
        return (
            <div className="confirmacion container my-5">
                <h2 className="text-4xl">Tu compra se registró exitosamente!!!</h2>
                <h3>(tu número de orden de compra es: <strong>{orderId}</strong>)</h3>
                <img src={confirmacion} alt="confirmacion" className="confirmacion"/>
                <br/>
                <Link className="btn btn-success" to="/">VOLVER AL INICIO</Link>
            </div>
        )
    }
    if (cart.length === 0 ) {
        return <Navigate to="/"/>
    }
    return (
        <div className="container my-5">
            <h2>Formulario de compra</h2>
            
            <Formik
                initialValues={{
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    localidad: '',
                    provincia: '',
                    email: '',
                    confirmacion: '',
                }
            }
                onSubmit={handleSubmit}
                validationSchema={schema}
            >
                {() => (
                    <Form className="formulario">
                        <Field placeholder="Escribe tu nombre" className="form-control my-2" type="text" name="nombre"/>
                        <ErrorMessage name="nombre" component="p"/>
                        <Field placeholder="Escribe tu apellido" className="form-control my-2" type="text" name="apellido"/>
                        <ErrorMessage name="apellido" component="p"/>
                        <Field placeholder="Escribe tu dirección" className="form-control my-2" type="text" name="direccion"/>
                        <ErrorMessage name="direccion" component="p"/>
                        <Field placeholder="Escribe tu localidad" className="form-control my-2" type="text" name="localidad"/>
                        <ErrorMessage name="localidad" component="p"/>
                        <div className="form-group">
                            <Field as="select" className="form-control" name="provincia">
                                <option value="" label="Selecciona una provincia" />
                                    {provincias.map((provincia, index) => (
                                <option key={index} value={provincia} label={provincia} />))} 
                            </Field>
                            <ErrorMessage name="provincia" component="p" />
                        </div>
                        <Field placeholder="Tu email" className="form-control my-2" type="email" name="email"/>
                        <ErrorMessage name="email" component="p"/>
                        <Field placeholder="Confirma tu email" className="form-control my-2" type="email" name="confirmacion"/>
                        <ErrorMessage name="confirmacion" component="p" />
                        <button className="enviar btn btn-primary" disabled={loading}>ENVIAR</button>
                        <button className="borrar btn btn-danger" type="reset">BORRAR</button>                
                    </Form>
                )}
            </Formik>
        </div>
    )
}
