import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?tags=front_page")
      .then((response) => response.json())
      .then((data) => {
        setStories(data.hits);
        setLoading(false);
      });
  }, []);

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Top 100 Hacker News Stories</h1>
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute top-1/2 right-4 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
          </svg>
        </div>
        {loading ? (
          <Skeleton count={10} height={50} className="mb-6" />
        ) : (
          filteredStories.map((story) => (
            <div key={story.objectID} className="p-6 mb-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-3">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {story.title}
                </a>
              </h2>
              <p className="text-gray-600 mb-3">Upvotes: {story.points}</p>
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
              >
                Read more
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Index;
