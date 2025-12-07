import React from 'react';
import Banner from '../Banner/Banner';
import SearchJob from '../SearchJob/SearchJob';
import Registration from '../../AuthPage/Registration/Registration';

const MainHomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <SearchJob></SearchJob>
            <Registration></Registration>
        </div>
    );
};

export default MainHomePage;