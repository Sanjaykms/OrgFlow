import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useUserCxt } from "@/data/userContext";
import { useAuthCxt } from "@/data/authContext";


const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setisError] = useState(false);
  const Userid = useRef<any>();
  const Password = useRef<any>();
  const userCxt = useUserCxt();
  const authCxt = useAuthCxt();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setisError(false);
    const userid = Userid.current.value;
    const password = Password.current.value;
    if (!(userid && password)) {
      setisError(true);
      return;
    } else {
      const tempUser = {
        ...userCxt.usersList.find((user) => {
          return userid === user.email;
        }),
      };
      if (password === tempUser.password) {
        authCxt.loginHandler(tempUser.id, tempUser.role);
        if (tempUser.role === "admin") {
          navigate("/Admingifts");
        } else {
          navigate("/home");
        }
      } else {
        alert("Username or password is wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlNWU3ZWIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQgNGMwIDItMiA0LTQgNHMtNC0yLTQtNHptMC0zMGMwLTIgMi00IDQtNHM0IDIgNCA0YzAgMi0yIDQtNCA0cy00LTItNC00em0tMzAgMGMwLTIgMi00IDQtNHM0IDIgNCA0YzAgMi0yIDQtNCA0cy00LTItNC00em0wIDMwYzAtMiAyLTQgNC00czQgMiA0IDRjMCAyLTIgNC00IDRzLTQtMi00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="bg-card rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-primary-foreground text-3xl font-bold">?</span>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#FF6B35] rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Work Hacks Hub
          </h1>
          <p className="text-muted-foreground">Your internal knowledge hub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Corporate Email"
              className="h-12"
              ref={Userid}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="h-12"
              ref={Password}
              required
            />
          </div>
          {isSignUp && (
            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                className="h-12"
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full h-12 text-base">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          {/* {!isSignUp && (
            <a href="#" className="text-primary hover:underline text-sm">
              Forgot Password?
            </a>
          )} */}
          {/* <div className="mt-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
