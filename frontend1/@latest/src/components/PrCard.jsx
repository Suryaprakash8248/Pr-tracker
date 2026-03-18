import React from 'react';
import { Link } from 'react-router';

function PrCard({ pr, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border">
      
      <h2 className="text-xl font-semibold mb-2">{pr.workout}</h2>

      <p className="text-gray-600">Weight: <span className="font-bold">{pr.weight} kg</span></p>
      <p className="text-gray-600 mb-4">Reps: <span className="font-bold">{pr.rep}</span></p>

      <div className="flex justify-between">
        <Link to={`/updatePr/${pr._id}`}>
          <button className="bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500">
            Edit
          </button>
        </Link>

        <button
          onClick={() => onDelete(pr._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default PrCard;