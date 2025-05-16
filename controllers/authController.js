 



const User = require('../models/User'); 
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  console.log('Register Request:', req.body); 

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


 const loginUser = async (req, res) => {
   const { email, password } = req.body;


   if (!email || !password) {
     return res.status(400).json({ message: 'Please provide email and password' });
   }
   try {
  
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(400).json({ message: 'Invalid credentials' });
     }
     const isMatch = await user.matchPassword(password);
     if (!isMatch) {
       return res.status(400).json({ message: 'Invalid credentials' });
     }


     res.status(200).json({
       message: 'Login successful',
       user: {
         email: user.email,
         password:user.password
       }
     });
   } catch (error) {
     console.error('Login Error:', error.message);
     res.status(500).json({ message: 'Server error' });
   }
 };

 module.exports = { registerUser, loginUser };  