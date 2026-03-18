import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import succesSound from "../assets/success.mp3"

function CreatePr() {
  const [workout, setWorkout] = useState("");
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const navigate = useNavigate();
  const sound = new Audio(succesSound);
  function fireCrackers() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > end) return clearInterval(interval);

    confetti({
      particleCount: 50,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
  }, 200);
};

   async function handleSubmit(e) {
    e.preventDefault();
    if(workout.trim() === "" && weight === 0) {
      toast.error("fill  Every single coloumns")
    } else {
    try {
      await axios.post("http://localhost:4000/pr/", {workout:workout,weight:Number(weight),rep:Number(reps)});

      sound.play();
      fireCrackers();
      toast.success("Pr created successfully!");
      
      navigate("/")
    } catch (error) {
      console.log("failed to create pr", error);
      toast.error("Error in creating Pr");
    }

    setReps(0);
    setWeight(0);
    setWorkout("");
  }};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-4">
    
    <h1 className="text-xl font-bold text-center">Add New PR</h1>

    <input
      className="w-full border p-2 rounded"
      placeholder="Workout"
      value={workout}
      onChange={(e) => setWorkout(e.target.value)}
    />

    <input
      className="w-full border p-2 rounded"
      type="number"
      placeholder="Weight"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
    />

    <input
      className="w-full border p-2 rounded"
      type="number"
      placeholder="Reps"
      value={reps}
      onChange={(e) => setReps(e.target.value)}
    />

    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
      Submit
    </button>

  </form>
</div>
  )
}

export default CreatePr;