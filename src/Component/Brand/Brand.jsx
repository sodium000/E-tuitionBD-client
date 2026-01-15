/* eslint-disable no-unused-vars */
import React from 'react';
import amazon_vactor from '../../../src/assets/ATNbangla.png'
import amazon from '../../../src/assets/bangalnews.png'
import casio from '../../../src/assets/deshbortoman.jpg'
import moonstar from '../../../src/assets/digontonews.png'
import randstas from '../../../src/assets/independent.png'
import star from '../../../src/assets/prothoalo.png'
import star_people from '../../../src/assets/shironam.png'
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

const brand = [amazon_vactor, amazon, casio, moonstar, randstas, star, star_people]

const Brand = () => {
    return (
        <div className='h-[20vh] py-15 min-h-[350px] flex flex-col justify-center items-center bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden max-w-full'>
            
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-2 text-center"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
                        As Seen In
                    </span>
                    <h2 className='font-black text-2xl md:text-3xl text-slate-900 dark:text-white'>
                        We were featured on
                    </h2>
                </motion.div>

                <div className='w-full relative group'>
                    <div className="absolute inset-y-0 left-0 w-24 md:w-48 z-10 bg-linear-to-r from-white dark:from-slate-950 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-10 bg-linear-to-l from-white dark:from-slate-950 to-transparent pointer-events-none"></div>

                    <Marquee
                        autoFill={true}
                        speed={50}
                        pauseOnHover={true}
                        gradient={false}
                    >
                        {brand.map((logo, index) => (
                            <motion.div
                                key={index}
                                className='mx-8 md:mx-10 flex items-center justify-center w-24 h-24 md:w-32 md:h-32'
                            >
                                <motion.img
                                    src={logo}
                                    alt={`Brand ${index}`}
                                    className="max-w-full max-h-full object-contain filter transition-all duration-700 dark:brightness-200"
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default Brand;