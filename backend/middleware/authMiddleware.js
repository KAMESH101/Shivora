const { getAuth, clerkClient } = require('@clerk/express');
const User = require('../models/User');

async function protect(req, res, next) {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      return res.status(401).json({ message: 'Not authorized, please sign in' });
    }

    // Check if user exists in MongoDB
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Fetch full user details from Clerk to sync with MongoDB
      const clerkUser = await clerkClient.users.getUser(userId);
      const email = clerkUser.emailAddresses[0]?.emailAddress || '';
      const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Clerk User';

      // Find by email just in case the user registered with legacy form before and is now using Google sign-in
      user = await User.findOne({ email });

      if (user) {
        // Link Clerk ID to existing user record
        user.clerkId = userId;
        await user.save();
      } else {
        // Create new User document in MongoDB
        user = await User.create({
          clerkId: userId,
          name,
          email,
        });
      }
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Error in auth middleware:', err.message);
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
}

module.exports = { protect };
