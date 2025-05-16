import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background" data-id="8wybnl01k" data-path="src/components/layout/NavBar.tsx">
      <div className="container flex h-16 items-center justify-between py-4" data-id="fex1wrgxt" data-path="src/components/layout/NavBar.tsx">
        <div className="flex items-center gap-2" data-id="w0mck1zs0" data-path="src/components/layout/NavBar.tsx">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold" data-id="q5hog4eed" data-path="src/components/layout/NavBar.tsx">CookBook</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" data-id="9ygw7gecl" data-path="src/components/layout/NavBar.tsx">
          <Link to="/recipes" className="text-sm font-medium hover:underline underline-offset-4">
            Recipes
          </Link>
          {user ?
          <>
              <Link to="/my-recipes" className="text-sm font-medium hover:underline underline-offset-4">
                My Recipes
              </Link>
              <Link to="/new-recipe" className="text-sm font-medium hover:underline underline-offset-4">
                Create Recipe
              </Link>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                Logout
              </Button>
            </> :

          <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          }
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)} data-id="vjmp0a0zh" data-path="src/components/layout/NavBar.tsx">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor" data-id="zcnljszbu" data-path="src/components/layout/NavBar.tsx">

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} data-id="preuyk49z" data-path="src/components/layout/NavBar.tsx" />

          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen &&
      <div className="md:hidden container py-4 bg-background" data-id="lvfgdjtbc" data-path="src/components/layout/NavBar.tsx">
          <nav className="flex flex-col space-y-4" data-id="qo4958dsr" data-path="src/components/layout/NavBar.tsx">
            <Link
            to="/recipes"
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={() => setIsMenuOpen(false)}>

              Recipes
            </Link>
            {user ?
          <>
                <Link
              to="/my-recipes"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}>

                  My Recipes
                </Link>
                <Link
              to="/new-recipe"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}>

                  Create Recipe
                </Link>
                <Button onClick={handleLogout} variant="ghost" size="sm" className="justify-start">
                  Logout
                </Button>
              </> :

          <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="justify-start">Sign Up</Button>
                </Link>
              </>
          }
          </nav>
        </div>
      }
    </header>);

};

export default NavBar;