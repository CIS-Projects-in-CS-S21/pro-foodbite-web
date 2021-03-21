import React from "react"
import Setting from "../components/Settings.js"
import { Greeting } from "./SignInPage"

export default function SettingsPage() {
    return (
      <div>
        <Greeting>Profile and Setting</Greeting>
        <Setting></Setting>
      </div>
    )
  }
  