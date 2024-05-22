
import Provider from '../models/Provider.js'


export const serchSevice = async (req, res) => {
    const serviceName  = req.body.serviceName;
    const provider = await Provider.find({serviceName:serviceName})
    const sanitizedProviders = provider.map(provider => {
        const providerObject = provider.toObject(); // Convert to plain object
        delete providerObject.password; // Remove the password key
        return providerObject; // Return the sanitized object
      });
    res.send({sanitizedProviders});
} 

export const giveRating = async (req, res) => {
  const providerId = req.body.id;
  let rating = Number(req.body.rating);

  let provider = await Provider.findOne({ _id: providerId });

  let oldnoOfrating = Number(provider.noOfRating);
  let oldrating = Number(provider.rating);

  // Correct calculation with proper parentheses
  let newRating = (oldrating * oldnoOfrating + rating) / (oldnoOfrating + 1);
  
  // Ensure newRating does not exceed 5
  newRating = Math.min(newRating, 5);

  let newProvider = await Provider.findByIdAndUpdate(
      providerId,  // Pass the ID directly
      { noOfRating: oldnoOfrating + 1, rating: newRating },
      { new: true }  // Optional: returns the updated document
  );
  res.send({ data: newProvider });
};
