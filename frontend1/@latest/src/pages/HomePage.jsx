import React, { useEffect, useState } from 'react';
import PrCard from '../components/PrCard';
import axios from 'axios';
import { Link } from "react-router";
import toast from 'react-hot-toast';

function HomePage() {
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(false);
  //const acheivementSound = new Audio(succesSound);
  useEffect(() => {
    const fetchPrs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/pr/");
        setPrs(response.data);
      } catch (error) {
        console.log("Error in fetching prs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrs();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Delete this PR?")) {
        await axios.delete(`http://localhost:4000/pr/${id}`);
        setPrs(prev => prev.filter(pr => pr._id !== id));
        toast.success("PR deleted");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏋️ PR Tracker</h1>
        <Link to="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            + Add PR
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {prs.map(pr => (
            <PrCard key={pr._id} pr={pr} onDelete={handleDelete} />
          ))}
        </div>
      )}

      
    </div>
    
  );
}

export default HomePage;