import React from "react"
import SignUp from "../components/SignUp.js"
import { Greeting } from "./SignInPage"

export default function SignUpPage() {
  return (
    <div>
      <Greeting>Welcome to the Sign Up Page!</Greeting>
      <SignUp></SignUp>
    </div>
  )
}
