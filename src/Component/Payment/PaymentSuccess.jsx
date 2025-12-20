import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionId) {
            setLoading(false);
            return;
        }

        const fetchPaymentInfo = async () => {
            try {
                const res = await axiosSecure.post(
                    `/payment-success?session_id=${sessionId}`
                );

                if (res.data?.message === "already exists") { 
                    Swal.fire({
                        icon: 'info',
                        title: 'Payment Already Completed',
                        text: 'This payment has already been processed.',
                        confirmButtonColor: '#3085d6',
                    });
                    setLoading(false);
                    navigate('/Tutors');
                }

                setPaymentInfo({
                    transactionId: res.data?.transactionId,
                    trackingId: res.data?.trackingId,
                });

            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Error',
                    text: 'Something went wrong while verifying your payment.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentInfo();
    }, [sessionId, axiosSecure, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
            <div className="max-w-md w-full bg-base-100 shadow-xl rounded-2xl p-8 text-center">

                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

                <h2 className="text-2xl font-bold text-green-600 mb-2">
                    Payment Successful
                </h2>

                <p className="text-gray-600 mb-6">
                    Thank you! Your payment has been completed successfully.
                </p>

                {paymentInfo ? (
                    <div className="space-y-3 text-left">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Transaction ID</p>
                            <p className="font-semibold break-all">
                                {paymentInfo.transactionId || "N/A"}
                            </p>
                        </div>

                        <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Tracking ID</p>
                            <p className="font-semibold break-all">
                                {paymentInfo.trackingId || "N/A"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">
                        No payment details found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
