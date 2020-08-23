import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompress';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
    return (
        <footer className = "bck_b_dark">
            <div className="container">
                <div className="logo">
                    Waves
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact Information</h2>
                        <div className="business_info">
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className = "icon"
                                />
                                <div className="info">
                                    <div>Address</div>
                                    <div>Kramer 2345</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className = "icon"
                                />
                                <div className="info">
                                    <div>Phone</div>
                                    <div>+407xx xxx xxx</div>
                                </div>
                             </div>
                             <div className="tag">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className = "icon"
                                />
                                <div className="info">
                                    <div>Working hours</div>
                                    <div>Mon-Sun/ 9am-9pm</div>
                                </div>
                             </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className = "icon"
                                />
                                <div className="info">
                                    <div>Email</div>
                                    <div>something@something.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, harum. Suscipit non officiis doloribus cupiditate culpa vel voluptate veniam nobis, fuga veritatis at minus accusantium explicabo quidem quaerat quisquam laudantium?
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;