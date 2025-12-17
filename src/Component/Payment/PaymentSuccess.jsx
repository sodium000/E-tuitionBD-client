import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const SessionID = searchParams.get("session_id")    
    const [paymentInfo, setPaymentInfo] = useState({});
    console.log(SessionID);
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        if (SessionID) {
            axiosSecure.post(`/payment-success?session_id=${SessionID}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }

    }, [SessionID, axiosSecure]);
    return (
        <div>
            <h3>pament  succesfull</h3>
            <p>Your TransactionId: {paymentInfo.transactionId}</p>
            <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;