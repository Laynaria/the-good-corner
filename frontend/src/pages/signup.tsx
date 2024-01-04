import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SIGN_UP = gql`
  mutation SignUp($password: String!, $email: String!) {
    signUp(password: $password, email: $email) {
      email
      id
    }
  }
`;

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  const [register] = useMutation(SIGN_UP, {
    variables: {
      email,
      password,
    },
    onCompleted(data: any) {
      router.push("/signin");
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    register();
  };

  return (
    <form>
      Register
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
      <button onClick={(e) => handleSubmit(e)}>Register</button>
    </form>
  );
}
