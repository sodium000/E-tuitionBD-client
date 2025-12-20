import React from 'react';
import { FiUsers, FiTarget, FiAward, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const AboutPage = () => {
    const stats = [
        { label: 'Years Experience', value: '10+' },
        { label: 'Projects Completed', value: '500+' },
        { label: 'Happy Clients', value: '300+' },
        { label: 'Team Members', value: '25+' },
    ];

    const values = [
        {
            icon: <FiTarget className="text-blue-500 w-8 h-8" />,
            title: "Our Mission",
            description: "To empower businesses through innovative digital solutions that drive real-world impact."
        },
        {
            icon: <FiUsers className="text-purple-500 w-8 h-8" />,
            title: "User Centric",
            description: "We build with the human experience at the center of every line of code we write."
        },
        {
            icon: <FiAward className="text-amber-500 w-8 h-8" />,
            title: "Quality First",
            description: "We don't just ship features; we deliver high-performance, scalable excellence."
        }
    ];

    return (
        <div className="bg-white text-gray-900 font-sans">
            <section className="relative py-20 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 pb-2 leading-tight bg-linear-to-l from-blue-700 to-purple-600 bg-clip-text text-transparent ">
                        Crafting Digital Futures
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 ">
                        We are a team of designers, developers, and strategists dedicated to pushing the boundaries of what's possible on the web.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-linear-to-l from-blue-700 to-purple-600">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <div className="text-blue-100 text-sm uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((value, idx) => (
                            <div key={idx} className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                                <div className="flex justify-center mb-6">{value.icon}</div>
                                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Meet the Leadership</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map((member) => (
                            <div key={member} className="group">
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-200 overflow-hidden ring-4 ring-white shadow-lg">
                                    {/* Replace with <img> tag */}
                                    <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400"></div>
                                </div>
                                <h4 className="text-xl font-bold">Alex Rivera</h4>
                                <p className="text-blue-600 mb-4 font-medium">Lead Developer</p>
                                <div className="flex justify-center space-x-4 text-gray-400 group-hover:text-blue-500 transition-colors">
                                    <FiTwitter className="cursor-pointer" />
                                    <FiLinkedin className="cursor-pointer" />
                                    <FiGithub className="cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;