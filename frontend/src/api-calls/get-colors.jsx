const URL = `${process.env.REACT_APP_PUBLIC_API_URL}/colors/`

const getColors = async ()=>{
    const res = await fetch(URL);
    return res.json();
}

export default getColors