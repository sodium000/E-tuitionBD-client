/* eslint-disable no-unused-vars */
import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import ReviewCard from './ReviewCard';

const Review = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);

    return (
        <section className="relative py-15 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">     
            <div className="absolute inset-0 z-0 hidden dark:block pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400"
                    >
                        Testimonials
                    </motion.span>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                    >
                        People <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">Love Us!</span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-xl text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed"
                    >
                        We are proud to share the experiences of our honorable clients who have transformed their learning journey with us.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative px-4"
                >
                    <Swiper
                        loop={true}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="review-swiper pb-14!" 
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id} className="transition-transform duration-500">
                                <div className="p-4">
                                    <ReviewCard review={review} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>

            <style jsx global>{`
                .review-swiper .swiper-pagination-bullet {
                    background: #6366f1;
                    opacity: 0.2;
                }
                .review-swiper .swiper-pagination-bullet-active {
                    background: #8b5cf6;
                    opacity: 1;
                    width: 24px;
                    border-radius: 4px;
                }
            `}</style>
        </section>
    );
};

export default Review;