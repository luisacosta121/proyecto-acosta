import { useEffect, useState } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { useParams, useLocation } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import './ItemListContainer.scss';

export const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { categoryId } = useParams();
    const location = useLocation();
    
    useEffect(() => {
        setLoading(true);

        const productosRef = collection(db, 'productos');
        let q = productosRef;

        if (categoryId) {
            q = query(q, where('categoria', '==', categoryId));
        }

        if (searchTerm) {
            const normalizedSearchTerm = searchTerm.toLowerCase();
            q = query(q, where('nombre', '>=', normalizedSearchTerm), where('nombre', '<=', normalizedSearchTerm + '\uf8ff'));
        }

        getDocs(q)
            .then((resp) => {
                const docs = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });

                setProductos(docs);
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false));

    }, [categoryId, searchTerm, location.pathname]);
    
    useEffect(() => {
        setSearchTerm('');
    }, [location.pathname]);

    return (
        <div>
            {location.pathname === '/' && (
            <div className='buscador-container'>
                <input
                    className='buscador'
                    type="text"
                    placeholder="Buscar producto por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                />
            </div>
        )}
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {searchTerm ? (
                        productos.length > 0 ? (
                            <ItemList productos={productos} />
                        ) : (
                            <p>No se encontraron resultados.</p>
                        )
                    ) : (
                        <ItemList productos={productos} />
                    )}
                </div>
            )}
        </div>
    );
}
