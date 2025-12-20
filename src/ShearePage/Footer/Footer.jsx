import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16">
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to={'/'} className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">eT</div>
                            <span className="text-xl font-black tracking-tighter text-slate-800">eTuition<span className='text-primary'>Bd</span></span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Connecting students with top-tier educators across Bangladesh. Excellence in learning starts with the right mentor.
                        </p>
                        <div className="flex gap-3">
                            {[FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn].map((Icon, index) => (
                                <a key={index} href="#" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h6 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Services</h6>
                        <ul className="space-y-4">
                            <li><a className="text-slate-500 hover:text-primary transition-colors text-sm">Find a Tutor</a></li>
                            <li><a className="text-slate-500 hover:text-primary transition-colors text-sm">Online Classes</a></li>
                            <li><a className="text-slate-500 hover:text-primary transition-colors text-sm">Home Tutoring</a></li>
                            <li><a className="text-slate-500 hover:text-primary transition-colors text-sm">Academic Coaching</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h6 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Company</h6>
                        <ul className="space-y-4">
                            <li><a className="text-slate-500 hover:text-primary transition-colors text-sm">About Us</a></li>
                            <li><a className="text-slate-500 hover:text-primary transition-colors text-sm">Success Stories</a></li>
                            <li><a className="text-slate-500 hover:text-primary transition-colors text-sm">Contact Support</a></li>
                            <li><a className="text-slate-500 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h6 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Stay Updated</h6>
                        <p className="text-slate-500 text-sm mb-4">Subscribe to get latest tuition circulars.</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-slate-900 transition-colors shadow-lg shadow-primary/20">
                                <FaPaperPlane size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs">
                        © {new Date().getFullYear()} <span className="font-bold text-slate-600">eTuitionBd</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-400 hover:text-primary text-xs transition-colors">Terms of Use</a>
                        <a href="#" className="text-slate-400 hover:text-primary text-xs transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;