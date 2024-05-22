
import Provider from '../models/Provider.js'


export const serchSevice = async (req, res) => {
  const serviceName = req.body.serviceName;
  if (!serchSevice) {
    res.status(400).json({ message: "Bad Request, serviceName is missing", error: "Bad Request, serviceName is required: " })
  }
  const provider = await Provider.find({ serviceName: serviceName });

  if (!provider) {
    res.status(404).json({ message: "No Provider Found", data: "null" })
  }

  const sanitizedProviders = provider.map(provider => {
    const providerObject = provider.toObject(); // Convert to plain object
    delete providerObject.password; // Remove the password key
    return providerObject; // Return the sanitized object
  });

  res.status(200).json({ message: "Data found.. ", data: sanitizedProviders });
}

export const giveRating = async (req, res) => {
  const providerId = req.body.id;
  if(!providerId){
    res.status(400).json({ message: "Bad Request, providerId is missing", error: "Bad Request, providerId is required: " });
  } 
  let rating = Number(req.body.rating);
  if(!rating){
    res.status(400).json({ message: "Bad Request, rating is missing", error: "Bad Request, rating is required: " })
  }
  let provider = await Provider.findOne({ _id: providerId });

  if(!provider){
    res.status(404).json({ message: "No Provider Found by Given Id", error: "No provider found " })
  }

  let oldnoOfrating = Number(provider.noOfRating);
  let oldrating = Number(provider.rating);

  // Correct calculation with proper parentheses
  let newRating = (oldrating * oldnoOfrating + rating) / (oldnoOfrating + 1);

  // Ensure newRating does not exceed 5
  newRating = Math.min(newRating, 5);
  try {
    let newProvider = await Provider.findByIdAndUpdate(
      providerId,  // Pass the ID directly
      { noOfRating: oldnoOfrating + 1, rating: newRating },
      { new: true }  // Optional: returns the updated document
    );
    res.status(20).send({message:"Provider Rating Updated ", data: newProvider });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error" , error:error})
  }
};
