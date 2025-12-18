import React from 'react';
import amazon_vactor from '../../../src/assets/ATNbangla.png'
import amazon from '../../../src/assets/bangalnews.png'
import casio from '../../../src/assets/deshbortoman.jpg'
import moonstar from '../../../src/assets/digontonews.png'
import randstas from '../../../src/assets/independent.png'
import star from '../../../src/assets/prothoalo.png'
import star_people from '../../../src/assets/shironam.png'
import Marquee from 'react-fast-marquee';

const brand = [amazon_vactor, amazon, casio, moonstar, randstas, star, star_people]

const Brand = () => {
    return (
        <div className='my-25 flex flex-col gap-10 justify-center items-center '>
            <div className='font-bold text-2xl '>
                We were featured on:
            </div>
            <div className='flex gap-5 items-center container mx-auto '>
                <Marquee
                    autoFill={true}
                >
                    {
                        brand.map((logo, index) => <div className='mx-10  flex items-center w-30 h-30' key={index}><img src={logo} alt="" /></div>)
                    }
                </Marquee>
            </div>
        </div>
    );
};

export default Brand;