import React, {useEffect, useState} from 'react';
import getProduct from "../../api-calls/get-product";
import getProducts from "../../api-calls/get-products";
import Container from "../../components/ui/container";
import {useParams} from "react-router-dom";
import ProductsList from "../../components/ProductsList/ProductsList";
import Gallery from "../../components/Gallery/Gallery";
import Info from "../../components/Info/Info";

const ProductPage = ()=>{
    const params = useParams()
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [clickedProduct, setClickedProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await getProduct(params.productId);
                setClickedProduct(product);

                if (product) {
                    const suggestedProducts = await getProducts({
                        categoryId: product.categoryId
                    });
                    setSuggestedProducts(suggestedProducts);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [params.productId]);
    return(
        <div className='bg-white'>
            <Container>
                <div className='px-4 py-10 sm:px-6 lg:px-8'>
                    <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                        <Gallery images={clickedProduct?.images}/>
                        <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                            <Info data={clickedProduct}/>
                        </div>
                    </div>
                    <hr className='my-10'/>
                    <ProductsList title='Related products' items={suggestedProducts}/>
                </div>
            </Container>
        </div>
    );
}

export default ProductPage