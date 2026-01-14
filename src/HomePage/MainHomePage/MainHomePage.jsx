import React from 'react';
import Banner from '../Banner/Banner';
import SearchJob from '../SearchJob/SearchJob';
import HowItWorks from '../../Component/TutorStep/HowItWorks';
import StudentWork from '../../Component/StudentWork/StudentWork';
import Brand from '../../Component/Brand/Brand';
import TuitionSelection from '../../Component/TuitionSelection/TuitionSelection';
import Updatshow from '../updatShow/updatshow'
import Review from '../../Component/Review/Review';
import CTA from '../../Component/CTA/CTA';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const MainHomePage = () => {

    return (
        <div>
            <Banner></Banner>
            <SearchJob></SearchJob>
            <Updatshow></Updatshow>
            <TuitionSelection></TuitionSelection>
            <Brand></Brand>
            <div className='grid grid-cols-1 md:grid-cols-2  '>
                <HowItWorks></HowItWorks>
                <StudentWork></StudentWork>
            </div>
            <Review reviewsPromise={reviewsPromise}></Review>
            <CTA></CTA>
        </div>
    );
};

export default MainHomePage;