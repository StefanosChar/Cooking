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

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register: registerUser } = useAuth();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      if (data.password !== data.confirmPassword) {
        toast({
          title: 'Error',
          description: 'Passwords do not match',
          variant: 'destructive'
        });
        return;
      }

      const result = await registerUser(data.email, data.password);

      if (result.success) {
        toast({
          title: 'Registration successful',
          description: 'Your account has been created',
          variant: 'default'
        });
        navigate('/');
      } else {
        toast({
          title: 'Registration failed',
          description: result.error || 'Could not create account',
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
      <div className="container mx-auto py-10" data-id="d4ll6ir24" data-path="src/pages/RegisterPage.tsx">
        <div className="max-w-md mx-auto" data-id="smsu6wb7d" data-path="src/pages/RegisterPage.tsx">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Enter your details to create your CookBook account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} data-id="vjdjaxwcz" data-path="src/pages/RegisterPage.tsx">
              <CardContent className="space-y-4">
                <div className="space-y-2" data-id="x0u0pb5kq" data-path="src/pages/RegisterPage.tsx">
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
                  <p className="text-sm text-red-500" data-id="nh6vz3euq" data-path="src/pages/RegisterPage.tsx">{errors.email.message}</p>
                  }
                </div>
                <div className="space-y-2" data-id="8uerx3bbc" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="password">Password</Label>
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
                  <p className="text-sm text-red-500" data-id="czfh7istv" data-path="src/pages/RegisterPage.tsx">{errors.password.message}</p>
                  }
                </div>
                <div className="space-y-2" data-id="1gyop7cmp" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (val: string) => {
                        if (watch('password') !== val) {
                          return 'Passwords do not match';
                        }
                      }
                    })} />

                  {errors.confirmPassword &&
                  <p className="text-sm text-red-500" data-id="9lhgf3bfl" data-path="src/pages/RegisterPage.tsx">{errors.confirmPassword.message}</p>
                  }
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
                <p className="text-sm text-center text-muted-foreground" data-id="txwqbxdee" data-path="src/pages/RegisterPage.tsx">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>);

};

export default RegisterPage;