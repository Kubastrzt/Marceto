const URL = `${process.env.REACT_APP_PUBLIC_API_URL}/billboards`

export const getBillboard = async (id)=>{
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}
export const getBillboards = async (id)=>{
    const res = await fetch(`${URL}`);
    return res.json();
}
