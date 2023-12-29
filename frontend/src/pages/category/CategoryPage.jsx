import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import getProducts from "../../api-calls/get-products";
import getSizes from "../../api-calls/get-sizes";
import getColors from "../../api-calls/get-colors";
import getCategory from "../../api-calls/get-category";
import Billboard from "../../components/Billboard/Billboard";
import Filter from "../../components/Filter/Filter";
import Container from "../../components/ui/container";
import NoResults from "../../components/NoResults/NoResults";
import ProductCard from "../../components/ProductCard/ProductCard";
import MobileFilter from "../../components/MobileFilter/MobileFilter";

const CategoryPage = ()=>{
    const params = useParams()
    const [searchParams] = useSearchParams()
    const [categoryProducts, setCategoryProducts] = useState([])
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const products = await getProducts({
                    categoryId: params.categoryId,
                    colorId: searchParams.get('colorId'),
                    sizeId: searchParams.get('sizeId')
                })

                const sizes = await getSizes()
                const colors = await getColors()
                const category = await getCategory(params.categoryId)

                setCategoryProducts(products)
                setSizes(sizes)
                setColors(colors)
                setCategory(category)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [params.categoryId]);
    return(
        <div className='bg-white'>
            <Container>
                <Billboard data={category?.banner}/>
                <div className='px-4 sm:px-6 lg:px-8 pb-24'>
                    <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
                        <MobileFilter sizes={sizes} colors={colors}/>
                        <div className='hidden lg:block'>
                            <Filter valueKey="sizeId" name='Rozmiary' data={sizes}/>
                            <Filter valueKey="colorId" name='Kolory' data={colors}/>
                        </div>
                        <div className='mt-6 lg:col-span-4 lg:mt-0'>
                            {categoryProducts.length === 0 && <NoResults/>}
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {categoryProducts.map((item)=>(
                                    <ProductCard key={item.id} data={item}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CategoryPage