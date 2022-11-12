import React from "react";
import { supabase } from "../SupaBaseClient";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      navigate("/");
    } else {
      alert("error");
    }
  });

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["github", "linkedin"]}
        onlyThirdPartyProviders
      />
    </div>
  );
}

export default Login;
