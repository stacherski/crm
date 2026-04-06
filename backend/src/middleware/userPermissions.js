// Middleware to check User permissions

function userPermissions(permissions) {
  return (req, res, next) => {
    const user = req.user
    // console.log(user.permissions) //this logs out logged in user permissions array
    permissions.forEach(permission => {
      if (!user.permissions?.includes(permission)) {
        return res.status(403).json({ message: "User do not have sufficiens permissions" }).end()
      }
    });
    next();
  }
}

module.exports = userPermissions;