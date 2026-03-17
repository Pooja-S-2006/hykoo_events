import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import StarRating from '@/components/StarRating';
import { Input, Textarea, Button } from '@/components/Ui';
import { toast } from 'sonner';
import { Quote } from 'lucide-react';

// Mock data - only reviews with rating > 4 are displayed
const publicReviews = [
  {
    id: 1,
    name: 'Anitha Krishnan',
    rating: 5,
    feedback: 'Absolutely amazing experience! Hykoo Events made our wedding day truly magical. Every detail was perfect, and the team was incredibly professional and caring.',
    date: '2024-12-15',
  },
  {
    id: 2,
    name: 'Ramesh Babu',
    rating: 5,
    feedback: 'We hired them for our corporate annual meet. The setup, coordination, and execution were flawless. Highly recommend their services!',
    date: '2024-11-28',
  },
  {
    id: 3,
    name: 'Priya Menon',
    rating: 5,
    feedback: 'My daughter\'s birthday party was a huge success thanks to Hykoo Events. The decorations were stunning and all the kids had a fantastic time!',
    date: '2024-11-10',
  },
  {
    id: 4,
    name: 'Karthik Sundaram',
    rating: 5,
    feedback: 'The traditional ceremony setup for our house warming was beautiful. They understood exactly what we wanted and delivered beyond expectations.',
    date: '2024-10-25',
  },
];

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    feedback: '',
  });
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState(publicReviews);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.feedback || rating === 0) {
      toast.error('Please fill in all required fields and provide a rating');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Only add to public display if rating > 4
    if (rating > 4) {
      const newReview = {
        id: Date.now(),
        name: formData.name,
        rating,
        feedback: formData.feedback,
        date: new Date().toISOString().split('T')[0],
      };
      setReviews([newReview, ...reviews]);
      toast.success('Thank you for your wonderful feedback! It has been published.');
    } else {
      toast.success('Thank you for your feedback! We appreciate your input.');
    }

    setFormData({ name: '', phone: '', email: '', feedback: '' });
    setRating(0);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Feedback & Reviews"
            subtitle="Share your experience and read what our clients say about us"
          />
        </div>
      </section>

      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Feedback Form */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border h-fit">
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">Share Your Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 80152 75980"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Rating *</label>
                <StarRating rating={rating} onRatingChange={setRating} size={32} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Feedback *</label>
                <Textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  rows={5}
                  required
                />
              </div>

              <p className="text-sm text-muted-foreground">
                * Reviews with ratings above 4 stars will be displayed publicly
              </p>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-olive-dark text-white py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </div>

          {/* Public Reviews */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">Client Reviews</h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card rounded-xl p-6 shadow-soft border border-border"
                >
                  <div className="flex items-start space-x-4">
                    <Quote className="w-10 h-10 text-primary/20 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <StarRating rating={review.rating} readonly size={18} />
                      <p className="text-muted-foreground mt-3 leading-relaxed">{review.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
