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
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Top 100 Hacker News Stories</h1>
        <input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {loading ? (
          <Skeleton count={10} height={40} className="mb-4" />
        ) : (
          filteredStories.map((story) => (
            <div key={story.objectID} className="p-4 mb-4 bg-white rounded shadow">
              <h2 className="text-2xl font-bold">{story.title}</h2>
              <p className="text-gray-600">Upvotes: {story.points}</p>
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
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
