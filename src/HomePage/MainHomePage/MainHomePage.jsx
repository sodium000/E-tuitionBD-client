import React from 'react';
import Banner from '../Banner/Banner';
import SearchJob from '../SearchJob/SearchJob';
import HowItWorks from '../../Component/TutorStep/HowItWorks';
import StudentWork from '../../Component/StudentWork/StudentWork';
import Brand from '../../Component/Brand/Brand';
import TuitionSelection from '../../Component/TuitionSelection/TuitionSelection';
import Updatshow from '../updatShow/updatshow'

const MainHomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <SearchJob></SearchJob>
            <Updatshow></Updatshow>
            <TuitionSelection></TuitionSelection>
            <Brand></Brand>
            <HowItWorks></HowItWorks>
            <StudentWork></StudentWork>
            
        </div>
    );
};

export default MainHomePage;