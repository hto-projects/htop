import jwt from "jsonwebtoken";

const generateToken = (res, userId, tmp: boolean = false) => {
  const token = jwt.sign({ userId, tmp }, process.env.JWT_SECRET, {
    expiresIn: tmp ? "1d" : "30d"
  });

  res.cookie("jwt", token, {
    httpOnly: false,
    secure: true,
    sameSite: false,
    maxAge: tmp ? 1 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000 // 1 day or 30 days
  });
};

export default generateToken;
