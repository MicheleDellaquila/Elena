const logout = (_, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout avvenuto con successo" });
};

module.exports = logout;
