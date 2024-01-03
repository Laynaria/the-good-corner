import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SIGN_IN = gql`
  mutation Mutation($password: String!, $email: String!) {
    signIn(password: $password, email: $email)
  }
`;

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  const [signIn] = useMutation(SIGN_IN, {
    variables: {
      email,
      password,
    },
    onCompleted(data: any) {
      localStorage.setItem("token", data.signIn);
      router.push("/");
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signIn();
  };

  return (
    <form>
      Login
      <br />
      <br />
      <label>
        Email:
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <label>
        Password:
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <button onClick={(e) => handleSubmit(e)}>Login</button>
    </form>
  );
}
