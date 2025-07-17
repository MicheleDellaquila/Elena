const logout = (_, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ ok: true });
};

module.exports = logout;
