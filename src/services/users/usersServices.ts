import { userModel } from "./../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register service

//define interface for comming register data

interface registerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerData) => {
  //check if the user already in the database or not
  let newUser = await userModel.findOne({ email });
  if (newUser) {
    return { data: "Email is already exist", statusCode: 400 };
  } else {
    //hasing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return {
      data: generateJWT({ firstName, lastName, email }),
      statusCode: 200,
    };
  }
};

//login service

interface loginData {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginData) => {
  //check if the user already in the database or not
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Incorrect Email", statusCode: 400 };
  } else {
    //check for password correctness
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    console.log(passwordMatch);
    console.log(password);
    console.log(findUser.password);

    if (passwordMatch) {
      return {
        data: generateJWT({
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          email: findUser.email,
        }),
        statusCode: 200,
      };
    } else {
      return { data: "Incorect Password", statusCode: 400 };
    }
  }
};

//generate jwt for autorized users
const generateJWT = (data: string | object) => {
  const token = jwt.sign(
    data,
    "8ceafb6b5ef33b32339be9ed01fdff972d919f084895ef469745b505be6a5087"
  );
  return token;
};
