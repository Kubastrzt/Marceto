import React, {useEffect, useState} from 'react';

const formatter = new Intl.NumberFormat("pl-pl", {
    style: 'currency',
    currency: 'PLN'
})

const Currency = ({value})=>{
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if(!isMounted) {
        return null;
    }

    return(
        <div className='font-semibold'>
            {formatter.format(Number(value))}
        </div>
    );
}

export default Currency