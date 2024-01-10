const URL = `${process.env.REACT_APP_PUBLIC_API_URL}/banners`

export const getBanner = async (id)=>{
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}
export const getBanners = async (id)=>{
    const res = await fetch(`${URL}`);
    return res.json();
}
