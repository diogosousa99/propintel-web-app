import { LOGIN_FORM_FIELDS } from './constants';
import { useLoginViewModel } from './hooks';
import { Login } from '@store';
import LoginImg from '../../../assets/login.jpg';
import { FieldErrors } from 'react-hook-form';
import { LogoLarge } from '../../../components';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

const inputClassName = (field: keyof Login, errors: FieldErrors<Login>) => {
    return cn('w-full', {
        'border-destructive': errors[field],
    });
};

export default function LoginView() {
    const { loginForm, isLoginLoading, _handleLogin } = useLoginViewModel();

    const { register, formState, handleSubmit } = loginForm;

    const { errors } = formState;

    return (
        <div className="flex items-center h-screen p-4 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
            <img src={LoginImg} alt="Logo" className="w-1/2 h-full object-cover rounded-2xl" />
            <div className="flex flex-col w-1/2 gap-11">
                <div className="flex justify-center">
                    <LogoLarge />
                </div>
                <form className="flex flex-col items-center p-32 pt-0 gap-8" onSubmit={handleSubmit(_handleLogin)}>
                    <div className="w-full space-y-2">
                        <Label htmlFor={LOGIN_FORM_FIELDS.email} className="text-foreground">
                            Email*
                        </Label>
                        <Input
                            id={LOGIN_FORM_FIELDS.email}
                            className={inputClassName(LOGIN_FORM_FIELDS.email, errors)}
                            placeholder="Email"
                            {...register(LOGIN_FORM_FIELDS.email)}
                        />
                        {errors[LOGIN_FORM_FIELDS.email] ? (
                            <span className="text-xs text-destructive">{errors[LOGIN_FORM_FIELDS.email]?.message}</span>
                        ) : null}
                    </div>
                    <div className="w-full space-y-2">
                        <Label htmlFor={LOGIN_FORM_FIELDS.password} className="text-foreground">
                            Password*
                        </Label>
                        <Input
                            id={LOGIN_FORM_FIELDS.password}
                            className={inputClassName(LOGIN_FORM_FIELDS.password, errors)}
                            type="password"
                            placeholder="Password"
                            {...register(LOGIN_FORM_FIELDS.password)}
                        />
                        {errors[LOGIN_FORM_FIELDS.password] ? (
                            <span className="text-xs text-destructive">
                                {errors[LOGIN_FORM_FIELDS.password]?.message}
                            </span>
                        ) : null}
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoginLoading}>
                        {isLoginLoading ? (
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : null}
                        Login
                    </Button>
                    <div className="w-full text-center mt-4">
                        <span className="text-sm text-muted-foreground">Don't have an account? </span>
                        <Link to="/register" className="text-primary underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
