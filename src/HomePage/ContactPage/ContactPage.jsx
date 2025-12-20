import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Message sent! (This is a demo)');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent pb-2">
                        Get in Touch
                    </h1>
                    <p className="text-gray-600 max-w-xl mx-auto text-lg">
                        Have a question or a project in mind? We'd love to hear from you.
                        Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                        <FiMail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Email us</p>
                                        <p className="text-gray-900 font-semibold">hello@yourbrand.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                                        <FiPhone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Call us</p>
                                        <p className="text-gray-900 font-semibold">+1 (555) 000-0000</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                        <FiMapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Visit us</p>
                                        <p className="text-gray-900 font-semibold">123 Design St, Innovation City</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-500 font-medium mb-4 uppercase tracking-wider">Follow our socials</p>
                                <div className="flex space-x-4">
                                    <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                                        <FiTwitter />
                                    </a>
                                    <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                                        <FiInstagram />
                                    </a>
                                    <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-blue-800 hover:text-white transition-all">
                                        <FiLinkedin />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="mb-6 space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="mb-8 space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="5"
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <FiSend />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;