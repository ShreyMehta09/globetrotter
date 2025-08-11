'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [user, setUser] = useState<any>(null);
  const citiesScrollRef = useRef<HTMLDivElement>(null);
  const tripsScrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = (ref: React.RefObject<HTMLDivElement>, speed: number = 1) => {
      if (!ref.current) return;
      
      const container = ref.current;
      let scrollAmount = 0;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      const scroll = () => {
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
        } else {
          scrollAmount += speed;
        }
        container.scrollLeft = scrollAmount;
      };
      
      const interval = setInterval(scroll, 50);
      return interval;
    };

    const citiesInterval = scrollContainer(citiesScrollRef, 1);
    const tripsInterval = user ? scrollContainer(tripsScrollRef, 0.8) : null;

    return () => {
      if (citiesInterval) clearInterval(citiesInterval);
      if (tripsInterval) clearInterval(tripsInterval);
    };
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Search:', { searchQuery, filterCategory, sortBy });
  };

  const handleCityClick = (cityId: string) => {
    router.push(`/city/${cityId}`);
  };

  // Mock data for previous trips (Indian destinations)
  const previousTrips = [
    {
      id: 1,
      destination: 'Goa',
      date: 'March 2024',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      duration: '7 days'
    },
    {
      id: 2,
      destination: 'Kerala Backwaters',
      date: 'January 2024',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4,
      duration: '5 days'
    },
    {
      id: 3,
      destination: 'Manali, Himachal Pradesh',
      date: 'November 2023',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      duration: '6 days'
    },
    {
      id: 4,
      destination: 'Udaipur, Rajasthan',
      date: 'September 2023',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4,
      duration: '4 days'
    },
    {
      id: 5,
      destination: 'Rishikesh, Uttarakhand',
      date: 'July 2023',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      duration: '3 days'
    }
  ];

  // Mock data for top Indian cities
  const topCities = [
    {
      id: 'delhi',
      city: 'Delhi',
      state: 'Delhi',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true,
      description: 'India\'s capital with rich history and culture',
      attractions: ['Red Fort', 'India Gate', 'Qutub Minar'],
      rating: 4.3,
      visitors: '25M+'
    },
    {
      id: 'mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true,
      description: 'Financial capital and city of dreams',
      attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves'],
      rating: 4.2,
      visitors: '20M+'
    },
    {
      id: 'jaipur',
      city: 'Jaipur',
      state: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1599661046827-dacde6976549?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true,
      description: 'The Pink City with royal palaces',
      attractions: ['Hawa Mahal', 'Amber Fort', 'City Palace'],
      rating: 4.5,
      visitors: '15M+'
    },
    {
      id: 'bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: false,
      description: 'Silicon Valley of India with pleasant weather',
      attractions: ['Lalbagh Garden', 'Bangalore Palace', 'Cubbon Park'],
      rating: 4.1,
      visitors: '12M+'
    },
    {
      id: 'kolkata',
      city: 'Kolkata',
      state: 'West Bengal',
      image: 'https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: false,
      description: 'Cultural capital with colonial architecture',
      attractions: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Temple'],
      rating: 4.0,
      visitors: '10M+'
    },
    {
      id: 'chennai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: false,
      description: 'Gateway to South India with rich traditions',
      attractions: ['Marina Beach', 'Kapaleeshwarar Temple', 'Fort St. George'],
      rating: 3.9,
      visitors: '8M+'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Globe<span className="text-blue-600">trotter</span>
                <span className="text-sm text-orange-500 ml-2">India</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Welcome, {user.firstName}!</span>
                  <Link
                    href="/dashboard"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Image */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
          }}
        ></div>
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Discover Incredible India
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Explore the diverse beauty and rich heritage of India
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white shadow-lg -mt-16 relative z-30 mx-4 sm:mx-8 lg:mx-16 rounded-2xl">
        <div className="p-8">
          <form onSubmit={handleSearch} className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Search Input */}
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Where do you want to go in India?
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cities, states, destinations..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>

              {/* Filter */}
              <div>
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by
                </label>
                <select
                  id="filter"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="heritage">Heritage</option>
                  <option value="adventure">Adventure</option>
                  <option value="spiritual">Spiritual</option>
                  <option value="beach">Beach</option>
                  <option value="hill-station">Hill Station</option>
                  <option value="wildlife">Wildlife</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                  <option value="budget">Budget Friendly</option>
                  <option value="distance">Nearest</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-12 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
              >
                🔍 Explore India
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Top Cities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top Cities in India
            </h2>
            <p className="text-xl text-gray-600">
              Discover India's most popular travel destinations
            </p>
          </div>

          {/* Auto-scrolling Container */}
          <div 
            ref={citiesScrollRef}
            className="overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex gap-6 w-max">
              {[...topCities, ...topCities].map((city, index) => (
                <div 
                  key={`${city.id}-${index}`} 
                  className="w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer flex-shrink-0"
                  onClick={() => handleCityClick(city.id)}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    {city.popular && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10 font-medium">
                        Popular
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full z-10 font-medium">
                      ⭐ {city.rating}
                    </div>
                    <Image
                      src={city.image}
                      alt={`${city.city}, ${city.state}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{city.visitors} visitors/year</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {city.city}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {city.state}
                    </p>
                    <p className="text-gray-600 mb-3 text-sm">
                      {city.description}
                    </p>
                    <p className="text-gray-500 text-xs mb-4">
                      {city.attractions.join(' • ')}
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                      Explore City 
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Previous Trips */}
      {user && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Previous Trips
              </h2>
              <p className="text-xl text-gray-600">
                Relive your amazing adventures across India
              </p>
            </div>

            {/* Auto-scrolling Container */}
            <div 
              ref={tripsScrollRef}
              className="overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div className="flex gap-6 w-max">
                {[...previousTrips, ...previousTrips].map((trip, index) => (
                  <div key={`${trip.id}-${index}`} className="w-72 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex-shrink-0">
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <Image
                        src={trip.image}
                        alt={trip.destination}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">{trip.duration}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {trip.destination}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        {trip.date}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < trip.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                          View Details
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Travel Planning Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Plan your perfect Indian adventure in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Choose Your Destination</h3>
              <p className="text-gray-600 leading-relaxed">
                Select from India's diverse destinations - from the Himalayas to beaches, 
                from heritage sites to modern cities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Detailed Information</h3>
              <p className="text-gray-600 leading-relaxed">
                Access comprehensive details about places including timings, fees, 
                best visiting times, and local insights.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Plan & Explore</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your itinerary with our recommendations and embark on 
                an unforgettable journey across incredible India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Explore India?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of travelers discovering the beauty of India
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link
              href="/register"
              className="bg-white text-orange-600 px-8 py-4 rounded-full hover:bg-gray-50 transition-colors font-semibold text-lg"
            >
              Start Planning Free
            </Link>
            <Link
              href="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-orange-600 transition-colors font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Globe<span className="text-blue-400">trotter</span>
                <span className="text-orange-400 text-sm ml-2">India</span>
              </h3>
              <p className="text-gray-400">
                Your personalized travel planning companion for incredible India.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">North India</a></li>
                <li><a href="#" className="hover:text-white">South India</a></li>
                <li><a href="#" className="hover:text-white">East India</a></li>
                <li><a href="#" className="hover:text-white">West India</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Travel Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Globetrotter India. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}