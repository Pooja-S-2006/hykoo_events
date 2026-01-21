function Gallery({ limit }) {
  const galleryItems = [
    {
      image: 'https://matrimony.home.blog/wp-content/uploads/2021/09/tamil-wedding.jpg',
      title: 'Traditional Wedding',
      category: 'Wedding'
    },
    {
      image: 'https://static.wixstatic.com/media/d211f1_26a04aced1af4e63b7063cdb4cd86c56~mv2.jpg/v1/fill/w_640,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d211f1_26a04aced1af4e63b7063cdb4cd86c56~mv2.jpg',
      title: 'Birthday Celebration',
      category: 'Birthday Party'
    },
    {
      image: 'https://d397bfy4gvgcdm.cloudfront.net/153952-Jayaram-Sujani-Highlights-111-orig.jpeg',
      title: 'Anniversary Party',
      category: 'Anniversary'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQosxBhlkrGAILqHR1JAyAYsW5GKNSqTophlQ&s',
      title: 'Baby Shower',
      category: 'Baby Shower'
    },
    {
      image: 'https://makemyinvite.com/wp-content/uploads/2024/11/image-6.png',
      title: 'Engagement Ceremony',
      category: 'Engagement'
    },
    {
      image: 'https://phometo.com/images/gallery/Cradle-ceremony-photography.jpg',
      title: 'Naming Ceremony',
      category: 'Naming Ceremony'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkJHhm0mJzoZGawDPnWtlNmELP7Xzsu36jg&s',
      title: 'Mehendi Celebration',
      category: 'Mehendi Ceremony'
    },
    {
      image: 'https://media.licdn.com/dms/image/v2/C5612AQFDXzzapeJe0A/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1520196055762?e=1768435200&v=beta&t=fDBC_wIfqAeCE-d1TAhIM-M3Gw46LkEGbsJ697ClLos',
      title: 'Cultural Festival',
      category: 'Cultural Events'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8eZYDeRpNHeeAdLukfZxHC5T9s9DVIphZQ&s',
      title: 'Office Party',
      category: 'Office Party'
    },
    {
      image: 'https://www.hamaraevent.com/lib/js/kcfinder/upload/images/image5%28120%29.jpeg',
      title: 'Bachelorette Party',
      category: 'Bachelorette Party'
    },
    {
      image: 'https://www.chennaiconventioncentre.com/wp-content/uploads/2019/03/wedding-stage-decoration.jpg',
      title: 'Sangeet Night',
      category: 'Sangeet Ceremony'
    }
  ];

  const displayItems = limit ? galleryItems.slice(0, limit) : galleryItems;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Our Portfolio</h2>
        <p className="section-subtitle">
          Take a glimpse at some of our finest work and successful events
        </p>

        <div className="gallery-grid">
          {displayItems.map((item, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                width="600"
                height="400"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = '1';
                    target.src = `https://placehold.co/600x400?text=${encodeURIComponent(item.title)}`;
                  }
                }}
              />
              <div className="gallery-overlay">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
