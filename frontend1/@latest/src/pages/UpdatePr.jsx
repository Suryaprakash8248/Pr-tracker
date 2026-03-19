import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import successSound from "../assets/success.mp3";
function UpdatePr() {
  const [workout, setWorkout] = useState("");
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [oldWeight,setOldWeight] = useState();
  const [oldWorkout, setOldWorkout] = useState();
  const [oldReps, setOldReps] = useState();
  const {id} = useParams();
  const sound = new Audio(successSound);
  const navigate = useNavigate();


    function fireCrackers() {
    sound.play();
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
  

  useEffect(()=> {
    const fetchThisPr = async ()=> {
      try {
        const res = await axios.get(`https://pr-tracker-2.onrender.com/pr/${id}`);
        setWorkout(res.data.workout);
        setWeight(res.data.weight);
        setReps(res.data.reps);
        setOldWorkout(res.data.workout);
        setOldWeight(res.data.weight);
        setOldReps(res.data.reps);
        
      } catch (error) {
        console.log("Error in getting this pr", error);
        toast.error("failed")
      }
      
    }; fetchThisPr()
  },[id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(weight === oldWeight && reps === oldReps && oldWorkout===workout) {
      toast.error("you didn't change anything");
    } else {

    try {
      await axios.put(`https://pr-tracker-2.onrender.com/pr/${id}`, {
        workout,
        weight,
        rep:reps
      });

      fireCrackers();
      toast.success("Congrats new Pr!");
      navigate("/");

    } catch (error) {
      console.log("failed to update Pr", error);
      toast.error("failed to update Pr");
    }
  }};

   return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-5"
    >
      
      <h1 className="text-2xl font-bold text-center">
        Update PR
      </h1>

      <div>
        <label className="block mb-1 text-gray-600">Workout</label>
        <input
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={workout}
          type="text"
          onChange={(e) => setWorkout(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Weight (kg)</label>
        <input
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={weight}
          type="number"
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Reps</label>
        <input
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={reps}
          type="number"
          onChange={(e) => setReps(e.target.value)}
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Update PR
      </button>

    </form>

  </div>
);
}

export default UpdatePr;