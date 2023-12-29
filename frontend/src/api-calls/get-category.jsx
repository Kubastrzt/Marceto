const URL = `${process.env.REACT_APP_PUBLIC_API_URL}/categories`

const getCategory = async (id)=>{
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export default getCategory