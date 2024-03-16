import { hash, genSalt } from "bcryptjs";

export type Message = {
  message: string;
};

const adminAuth = async (pass: string): Promise<Message> => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(pass, salt);
  console.log(hashedPassword);
  const res = await fetch(`/api/admin-auth`, {
    method: "POST",
    body: JSON.stringify({
      pass: hashedPassword,
    }),
  });
  const response = await res.json();
  if (res.status === 200) {
    return response;
  } else {
    throw new Error("Password is incorrect.");
  }
};
export default adminAuth;
