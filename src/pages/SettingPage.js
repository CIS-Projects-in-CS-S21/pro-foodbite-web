import React from "react"
import Setting from "../components/Settings.js"
import { Greeting } from "./SignInPage"

export default function SettingsPage() {
    return (
      <div>
        <Greeting>This page shows your profile and settings</Greeting>
        <Setting></Setting>
      </div>
    )
  }
  