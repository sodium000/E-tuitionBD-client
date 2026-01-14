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
        <div className='my-25 flex flex-col gap-10 justify-center items-center '>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='font-bold text-2xl text-gray-900 dark:text-gray-100'
            >
                We were featured on:
            </motion.div>
            <div className='flex gap-5 items-center container mx-auto '>
                <Marquee
                    autoFill={true}
                    speed={60}
                    pauseOnHover={true}
                    gradient={true}
                    gradientColor="#ffffff"
                    gradientWidth={100}
                >
                    {
                        brand.map((logo, index) => (
                            <motion.div
                                key={index}
                                className='mx-10 flex items-center w-30 h-30'
                                whileHover={{ scale: 1.2, y: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.img
                                    src={logo}
                                    alt=""
                                    className=" transition-all duration-300 "
                                    whileHover={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.div>
                        ))
                    }
                </Marquee>
            </div>
        </div>
    );
};

export default Brand;