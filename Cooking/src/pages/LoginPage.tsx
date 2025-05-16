import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import MainLayout from '@/components/layout/MainLayout';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const result = await login(data.email, data.password);

      if (result.success) {
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
          variant: 'default'
        });
        navigate('/');
      } else {
        toast({
          title: 'Login failed',
          description: result.error || 'Invalid email or password',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10" data-id="wdi6rlorp" data-path="src/pages/LoginPage.tsx">
        <div className="max-w-md mx-auto" data-id="3mnt3oxdf" data-path="src/pages/LoginPage.tsx">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>
                Enter your email and password to login to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} data-id="ex8dt0521" data-path="src/pages/LoginPage.tsx">
              <CardContent className="space-y-4">
                <div className="space-y-2" data-id="nfyrtd2nm" data-path="src/pages/LoginPage.tsx">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })} />

                  {errors.email &&
                  <p className="text-sm text-red-500" data-id="1ixunv2sz" data-path="src/pages/LoginPage.tsx">{errors.email.message}</p>
                  }
                </div>
                <div className="space-y-2" data-id="8tq1jfqmm" data-path="src/pages/LoginPage.tsx">
                  <div className="flex items-center justify-between" data-id="qak6xcu1y" data-path="src/pages/LoginPage.tsx">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-muted-foreground hover:text-primary">

                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })} />

                  {errors.password &&
                  <p className="text-sm text-red-500" data-id="4ix8oejz2" data-path="src/pages/LoginPage.tsx">{errors.password.message}</p>
                  }
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <p className="text-sm text-center text-muted-foreground" data-id="n9kurh1z8" data-path="src/pages/LoginPage.tsx">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>);

};

export default LoginPage;