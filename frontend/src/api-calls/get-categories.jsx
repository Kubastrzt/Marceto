const URL = `${process.env.REACT_APP_PUBLIC_API_URL}/categories/`

const getCategories = async ()=>{
    const res = await fetch(URL);
    return res.json();
}

export default getCategories