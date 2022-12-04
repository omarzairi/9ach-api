import Jwt from "jsonwebtoken";

const generateToken = (id, name, isAdmin) => {
  return Jwt.sign({ id, name, isAdmin }, "9ACHproject", {
    expiresIn: "30d",
  });
};
export default generateToken;
