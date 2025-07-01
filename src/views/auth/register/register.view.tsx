import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '@store';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { startTransition } from 'react';
import { toast } from 'sonner';
import { LogoLarge } from '../../../components';
import LoginImg from '../../../assets/login.jpg';
import { FieldErrors } from 'react-hook-form';
import { cn } from '../../../lib/utils';

// Definir um tipo RegisterForm sem roleId
interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

const inputClassName = (field: keyof RegisterForm, errors: FieldErrors<RegisterForm>) => {
    return cn('w-full', {
        'border-destructive': errors[field],
    });
};

export default function RegisterView() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({ defaultValues: { name: '', email: '', password: '' } });
    const [registerUser, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterForm) => {
        try {
            await registerUser({ ...data, roleId: 1 }).unwrap();
            toast.success('Registration successful!');
            startTransition(() => {
                navigate('/login');
            });
        } catch {
            toast.error('Registration failed.');
        }
    };

    function getErrorMessage(error: unknown): string {
        if (
            error &&
            typeof error === 'object' &&
            'data' in error &&
            error.data &&
            typeof error.data === 'object' &&
            'message' in error.data
        ) {
            return String((error.data as { message?: string }).message ?? 'Registration failed');
        }
        return 'Registration failed';
    }

    return (
        <div className="flex items-center h-screen p-4 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
            <img src={LoginImg} alt="Logo" className="w-1/2 h-full object-cover rounded-2xl" />
            <div className="flex flex-col w-1/2 gap-11">
                <div className="flex justify-center">
                    <LogoLarge />
                </div>
                <form className="flex flex-col items-center p-32 pt-0 gap-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                            Name*
                        </Label>
                        <Input
                            id="name"
                            className={inputClassName('name', errors)}
                            placeholder="Name"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                    </div>
                    <div className="w-full space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                            Email*
                        </Label>
                        <Input
                            id="email"
                            className={inputClassName('email', errors)}
                            placeholder="Email"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                    </div>
                    <div className="w-full space-y-2">
                        <Label htmlFor="password" className="text-foreground">
                            Password*
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            className={inputClassName('password', errors)}
                            placeholder="Password"
                            autoComplete="new-password"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <span className="text-xs text-destructive">{errors.password.message}</span>}
                    </div>
                    {error && <span className="text-xs text-destructive">{getErrorMessage(error)}</span>}
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : null}
                        Register
                    </Button>
                    <div className="w-full text-center mt-4">
                        <span className="text-sm text-muted-foreground">Already have an account? </span>
                        <Link to="/login" className="text-primary underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
