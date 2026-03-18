import Pr from "../models/pr.js";

export async function getAllPr(req,res) {
  try {
    const pr = await Pr.find();
    res.json(pr);
  } catch (error) {
    console.log("Error in finding Pr",error);
    res.status(500);
    
  }
}

export async function getOnePr(req,res) {
  try {
    const specificPr = req.params.id;
    const pr = await Pr.findById(specificPr);
    res.json(pr);
  } catch (error) {
    console.log("Error in finding this Pr",error);
    res.status(500);
    
  }
}

export async function postPr(req,res) {
  try {
    const { workout, weight, rep } = req.body;
    const pr = new Pr({
      workout,
      weight,
      rep
    });
    const savedPr = await pr.save();
    res.status(201).json(savedPr);

  } catch (error) {
     console.error("Error creating PR", error);
     res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function updatePr(req,res) {
  try {
    const { workout, weight, rep } = req.body;
    const getPr = req.params.id;
    const updatedPr = await Pr.findByIdAndUpdate(getPr,{workout,weight,rep}, {new:true});
    res.status(201).json(updatedPr);
  } catch (error) {
    console.error("Error in updating PR", error);
     res.status(500).json({
      message: "Internal server error"
    });
  }
};

 export async function deletePr(req,res) {
  try {
    const getPr = req.params.id;
    const deletePr = await Pr.findByIdAndDelete(getPr);
    res.status(200).json({message:"pr deleted succesfully!"});
  } catch (error) {
    console.error("Error in deleting PR", error);
     res.status(500).json({
      message: "Internal server error"
    });
  }
};
