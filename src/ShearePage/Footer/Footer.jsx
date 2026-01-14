import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    {/* Brand Column */}
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                        <Link to={'/'} className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all">
                                eT
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                eTuition<span className='text-purple-600 dark:text-purple-400'>Bd</span>
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                            Connecting students with top-tier educators across Bangladesh. Excellence in learning starts with the right mentor.
                        </p>
                        <div className="flex gap-3 pt-2">
                            {[FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn].map((Icon, index) => (
                                <a 
                                    key={index} 
                                    href="#" 
                                    className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-purple-600 dark:hover:bg-purple-600 hover:text-white transition-all duration-300"
                                    aria-label={`Social media link ${index + 1}`}
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h6 className="text-gray-900 dark:text-gray-100 font-bold mb-4 uppercase tracking-wider text-xs">Services</h6>
                        <ul className="space-y-3">
                            <li><Link to="/Tutors" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm block">Find a Tutor</Link></li>
                            <li><Link to="/TutionPost" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm block">Online Classes</Link></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm block">Home Tutoring</a></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm block">Academic Coaching</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h6 className="text-gray-900 dark:text-gray-100 font-bold mb-4 uppercase tracking-wider text-xs">Company</h6>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm block">About Us</Link></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm block">Success Stories</a></li>
                            <li><Link to="/contactpage" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm block">Contact Support</Link></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm block">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h6 className="text-gray-900 dark:text-gray-100 font-bold mb-4 uppercase tracking-wider text-xs">Stay Updated</h6>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Subscribe to get latest tuition circulars.</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 pl-4 pr-11 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-500 transition-all"
                            />
                            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-purple-600 dark:bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20">
                                <FaPaperPlane size={12} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-400 text-xs text-center sm:text-left">
                        © {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-gray-300">eTuitionBd</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xs transition-colors">Terms of Use</a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xs transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;