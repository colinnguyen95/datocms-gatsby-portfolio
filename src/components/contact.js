import React from 'react'
// import './Contact.css'

const Contact = () => (
    <div name="ContactSection" className="ContactGroup">
        <div className="contact-container">
            <div className="contact-section">
                <p className="brand">Looking to get in touch?</p>
                <p className="brand">We can't wait to hear from you!</p>
                <br/>
                <p className="phone"><a href="tel:408-320-7643">Phone: (408) 320 - 7643</a></p>
                <p className="email">info@lgmarketing.me</p>
                <div className="alert">Your message has been sent</div>
            </div>
            
            <form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
                <input type="hidden" name="contact" value="contact" />
                <p>
                    <input type="text" name="name" placeholder="Name" id="name" required/>
                </p>
                <p>
                    <input type="email" name="email" placeholder="Email" id="email" required/>
                </p>
                <p>
                    <input type="text" name="subject" placeholder="Subject" id="subject"/>
                </p>
                <p className="full">
                    <textarea name="message" rows="5" placeholder="Message" id="message"></textarea>
                </p>
                <p className="full">
                    <button type="submit">Submit</button>
                </p>
            </form>
        </div>
    </div>
)

export default Contact