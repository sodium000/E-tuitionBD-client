/* eslint-disable no-unused-vars */
import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from './ReviewCard';
import { motion } from 'framer-motion';

const Review = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);
    return (
        <div className='my-25 '>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className=' flex flex-col items-center gap-5'
            >
                <motion.div
                    className='text-3xl font-bold text-gray-900 dark:text-gray-100'
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    People Love Us!
                </motion.div>
                <div className='text-center mb-10 text-gray-600 dark:text-gray-300'>We are prod to share the experience of our honourable clients</div>
            </motion.div>
            <div className='bg-purple-400 dark:bg-purple-800 py-10 rounded-2xl'>
                <Swiper
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: '40%',
                        depth: 200,
                        modifier: 1,
                        scale: 0.75,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={false}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {
                        reviews.map(review => <SwiperSlide key={review.id}>
                            <ReviewCard review={review}></ReviewCard>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Review;



