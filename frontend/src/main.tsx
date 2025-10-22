import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import TransactionListPage from "./pages/transaction-list-page/TransactionListPage.tsx";
import TransactionEditPage from "./pages/transaction-edit-page/TransactionEditPage.tsx";
import TransactionNewPage from "./pages/transaction-new-page/TransactionNewPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auto redirect from "/" to "/transaction" */}
        <Route index element={<Navigate to="/transaction" replace />} />

        <Route path="transaction">
          <Route index element={<TransactionListPage />} />
          <Route path="edit/:id" element={<TransactionEditPage />} />
          <Route path="new" element={<TransactionNewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
