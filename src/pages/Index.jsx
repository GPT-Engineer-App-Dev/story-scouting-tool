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
    <div className="min-h-screen p-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Top 100 Hacker News Stories</h1>
        <input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-400 rounded-lg"
        />
        {loading ? (
          <Skeleton count={10} height={50} className="mb-6" />
        ) : (
          filteredStories.map((story) => (
            <div key={story.objectID} className="p-5 mb-6 bg-gray-100 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-xl font-semibold mb-2">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {story.title}
                </a>
              </h2>
              <p className="text-gray-700 mb-2">Upvotes: {story.points}</p>
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
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
