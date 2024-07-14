import { Route, Routes } from "react-router-dom"
import DashboardLayouts from "./layouts/DashboardLayouts"

import SwaggerUIComponent from "./components/SwaggerUI"

import {
  ApiCall,
  Dashboard, Login,
  Confirmation,
  New,
  Pin,
  Receipt,
  Saved,
  TransferPage,
} from "./pages"
import Protected from "./components/Protected"

function App() {
  return (
    <>
      <Routes>
        <Route index element={<DashboardLayouts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" />

        <Route path="" element={<DashboardLayouts />}>
          <Route path="dashboard" element={
            <Protected>
              <Dashboard />
            </Protected>
          } />
          <Route path="transfer">
            <Route index element={
              <Protected>
                <TransferPage />
              </Protected>
            } />
            <Route path="new" element={
              <Protected>
                <New />
              </Protected>
            } />
            <Route path="saved" element={
              <Protected>
                <Saved />
              </Protected>
            } />
            <Route path="confirm" element={
              <Protected>
                <Confirmation />
              </Protected>
            } />
            <Route path="pin" element={
              <Protected>
                <Pin />  
              </Protected>
            } />
            <Route path="receipt" element={
              <Protected>
                <Receipt />
              </Protected>
            } />
          </Route>
        </Route>

        <Route path="/api">
          <Route path="example" element={<ApiCall />}></Route>
          <Route path="docs" element={<SwaggerUIComponent />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
