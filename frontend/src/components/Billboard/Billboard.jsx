import React from 'react';

const Billboard = ({data})=>{
    return(
        <div className='relative rounded-xl overflow-hidden h-[500px] flex py-10'>
            <div className='rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center h-full w-full' style={{backgroundImage: `url(${data?.imageUrl}`}}>
                <div className='flex flex-col justify-center items-center text-center gap-y-8 h-full'>
                    <div className='font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white'>
                        {data?.label === 'Homepage' ? '' : data?.label}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billboard