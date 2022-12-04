import Jwt from "jsonwebtoken";

const generateAdminToken = (id, role) => {
  return Jwt.sign({ id, role }, "9ACHproject", {
    expiresIn: "30d",
  });
};
export default generateAdminToken;
