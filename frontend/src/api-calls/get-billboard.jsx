const URL = `${process.env.REACT_APP_PUBLIC_API_URL}/billboards`

const getBillboard = async (id)=>{
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export default getBillboard