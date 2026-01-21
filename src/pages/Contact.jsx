import ContactForm from '../components/ContactForm.jsx';

function Contact() {
  const contactDetails = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Our Location',
      info: 'Periyar Nagar, Bhavani, Tamil Nadu 638316'
    },
    {
      icon: 'fa-phone-alt',
      title: 'Phone Number',
      info: '+91 8015275980'
    },
    {
      icon: 'fa-envelope',
      title: 'Email Address',
      info: 'santhoshkhanmech@gmail.com'
    },
    {
      icon: 'fa-clock',
      title: 'Working Hours',
      info: 'Mon - Sat: 9:00 AM - 11:00 PM'
    }
  ];

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us to plan your perfect event</p>
        </div>
      </section>

      <section className="contact-section section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h3>Let's Create Something Amazing</h3>
              <p>
                Have a special event in mind? We'd love to hear about it! 
                Reach out to us and let's start planning your unforgettable celebration.
              </p>

              <div className="contact-details">
                {contactDetails.map((item, index) => (
                  <div className="contact-item" key={index}>
                    <div className="contact-item-icon">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div className="contact-item-text">
                      <h4>{item.title}</h4>
                      <p>{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.1234567890123!2d77.6677729!3d11.4311732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba969ca261ad495:0x8150e64e6731d5c3!2sHykoo+Events!5e0!3m2!1sen!2sin!4v1635959994646!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hykoo Events Location Map"
                ></iframe>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
