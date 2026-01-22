function Services() {
  const services = [
    {
      icon: 'fa-ring',
      image: 'https://www.v3events.in/wp-content/uploads/2020/10/Wedding-Planner-1.jpg',
      title: 'Wedding',
      description: 'Complete wedding planning and coordination for your special day.'
    },
    {
      icon: 'fa-birthday-cake',
      image: 'https://borntoparty.in/img/gallery/76.jpg',
      title: 'Birthday Party',
      description: 'Fun and memorable birthday celebrations for all ages.'
    },
    {
      icon: 'fa-heart',
      image: 'https://floweraura-blog-img.s3.ap-south-1.amazonaws.com/Balloons.jpeg',
      title: 'Anniversary',
      description: 'Romantic Anniversary Celebrations and Milestone events.'
    },
    {
      icon: 'fa-baby',
      image: 'https://img1.wsimg.com/isteam/ip/824a7eea-7a45-427d-b622-c7b1c31e37f3/IMG_1066.jpeg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25',
      title: 'Baby Shower',
      description: 'Joyful Baby Shower celebrations for expecting parents.'
    },
    {
      icon: 'fa-heart-pulse',
      image: 'https://chinchincelebration.com/wp-content/uploads/2019/12/C1.jpeg',
      title: 'Engagement',
      description: 'Beautiful engagement ceremonies and parties.'
    },
    {
      icon: 'fa-certificate',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCMd-zVn7d9wn4oj_ueroIkOCPCJ0C2CkZQ&s',
      title: 'Naming Ceremony',
      description: 'Traditional Naming Ceremonies for newborns.'
    },
    {
      icon: 'fa-hand-sparkles',
      image: 'https://www.getyourvenue.com/uploads/allied-service/36/service-main6.jpg',
      title: 'Mehendi Ceremony',
      description: 'Colorful mehendi celebrations with traditional art.'
    },
    {
      icon: 'fa-masks-theater',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/5/422758826/FJ/TB/BA/187159184/college-event-management-services.jpeg',
      title: 'Cultural Events',
      description: 'Authentic cultural events and traditional celebrations.'
    },
    {
      icon: 'fa-building',
      image: 'https://admin.hire4event.com/assets/primaryimage/d096db5922fa236acfa2cf7876393efc.jpg',
      title: 'Office Party',
      description: 'Professional office parties and corporate celebrations.'
    },
    {
      icon: 'fa-glass-cheers',
      image: 'https://cdn.togetherv.com/golden-bride-to-be-decor-theme-main_1714734671.webp',
      title: 'Bachelorette Party',
      description: 'Fun and exciting bachelorette party celebrations.'
    },
    {
      icon: 'fa-music',
      image: 'https://symphonyevents.com.au/wp-content/uploads/2023/01/DSC_6896-2-scaled.jpg',
      title: 'Sangeet Ceremony',
      description: 'Musical sangeet ceremonies filled with dance and joy.'
    }
  ];

  return (
    <section className="services section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We offer comprehensive event management solutions to make your special occasions truly memorable
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              className="service-card"
              key={index}
              style={{ padding: 0, textAlign: 'left' }}
            >
              {service.image && (
                <div
                  className="service-media"
                  style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    width="800"
                    height="600"
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1';
                        t.src = `https://placehold.co/800x600?text=${encodeURIComponent(service.title)}`;
                      }
                    }}
                  />
                </div>
              )}
              <div className="service-body" style={{ padding: '24px 24px 28px' }}>
                <h3 style={{ marginBottom: 10 }}>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
