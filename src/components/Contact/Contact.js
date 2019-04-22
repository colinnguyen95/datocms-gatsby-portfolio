import React from 'react'
import './Contact.css'

const Contact = () => (
    <div name="ContactSection" className="ContactGroup">
        <div>
            <p className="brand-title">Get In Touch</p>
        </div>
        <div className="contact-container">
            <form name="contact" className="form" method="POST" netlify-honeypot="bot-field" data-netlify="true">
                <input type="hidden" name="contact" value="contact" />
                <div className="detail-wrapper">
                    <p className="text-field text1">
                        <input type="text" name="name" placeholder="Name" id="name" required/>
                    </p>
                    <p className="text-field text2">
                        <input type="email" name="email" placeholder="Email" id="email" required/>
                    </p>
                </div>
                {/* <p>
                    <input type="text" name="subject" placeholder="Subject" id="subject"/>
                </p> */}
                <p className="full">
                    <textarea name="message" rows="5" placeholder="Message" id="message"></textarea>
                </p>
                <p className="full">
                    <button type="submit">Submit</button>
                </p>
            </form>

            <div className="contact-section">
                <p className="phone"><a href="tel:408-XXX-XXXX">Phone: (408) XXX - XXXX</a></p>
                <p className="email">nguyencolinXXgmail.com</p>
                <div className="alert">Your message has been sent</div>
            </div>
        </div>
    </div>
)

export default Contact