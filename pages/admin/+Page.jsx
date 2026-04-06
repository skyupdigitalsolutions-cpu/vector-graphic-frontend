/**
 * pages/admin/+Page.jsx
 *
 * Wraps ThoughtBuilder with the JWT-aware AuthProvider.
 * Any child component can call useAuth() to get token, user, login, logout, authFetch.
 */

import { AuthProvider } from "../../src/context/AuthContext";
import ThoughtBuilder   from "../../src/Components/Admin/ThoughtBuilder";

export default function Page() {
  return (
    <AuthProvider>
      <ThoughtBuilder />
    </AuthProvider>
  );
}