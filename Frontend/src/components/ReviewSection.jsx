import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FiStar } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/pagination'

const ReviewSection = ({ reviews }) => {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkBrown mb-4">Customer Reviews</h2>
          <p className="text-brown">What our customers say about us</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={reviews.length > 3}
          breakpoints={{
            640: { slidesPerView: Math.min(2, reviews.length) },
            1024: { slidesPerView: Math.min(3, reviews.length) },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <div className="flex items-center mb-4">
                  <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-semibold text-darkBrown">{review.name}</h4>
                    <div className="flex text-caramel">
                      {[...Array(review.rating)].map((_, i) => (
                        <FiStar key={i} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-brown italic">"{review.comment}"</p>
                {review.product && (
                  <p className="text-sm text-gray-500 mt-4">Product: {review.product}</p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default ReviewSection
