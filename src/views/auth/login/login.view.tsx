import { LOGIN_FORM_FIELDS } from './constants';
import { useLoginViewModel } from './hooks';
import { clsx } from 'clsx';
import { Login } from '@store';
import LoginImg from '../../../assets/login.jpg';
import { FieldErrors } from 'react-hook-form';
import { LogoLarge } from '@components';

const inputClassName = (field: keyof Login, errors: FieldErrors<Login>) => {
    return clsx('input w-full', {
        'input-error': errors[field],
    });
};

export default function LoginView() {
    const { loginForm, isLoginLoading, _handleLogin } = useLoginViewModel();

    const { register, formState, handleSubmit } = loginForm;

    const { errors } = formState;

    return (
        <div className="flex items-center h-screen p-4">
            <img src={LoginImg} alt="Logo" className="w-1/2 h-full object-cover rounded-2xl" />
            <div className="flex flex-col w-1/2 gap-11">
                <div className="flex justify-center">
                    <LogoLarge />
                </div>
                <form className="flex flex-col items-center p-32 pt-0 gap-8" onSubmit={handleSubmit(_handleLogin)}>
                    <div className="w-full">
                        <legend className="text-xs pl-2">Email*</legend>
                        <input
                            className={inputClassName(LOGIN_FORM_FIELDS.email, errors)}
                            placeholder="Email"
                            {...register(LOGIN_FORM_FIELDS.email)}
                        />
                        {errors[LOGIN_FORM_FIELDS.email] ? (
                            <span className="text-xs text-error">{errors[LOGIN_FORM_FIELDS.email]?.message}</span>
                        ) : null}
                    </div>
                    <div className="w-full">
                        <legend className="text-xs pl-2">Password*</legend>
                        <input
                            className={inputClassName(LOGIN_FORM_FIELDS.password, errors)}
                            type="password"
                            placeholder="Password"
                            {...register(LOGIN_FORM_FIELDS.password)}
                        />
                        {errors[LOGIN_FORM_FIELDS.password] ? (
                            <span className="text-xs text-error">{errors[LOGIN_FORM_FIELDS.password]?.message}</span>
                        ) : null}
                    </div>
                    <button className="btn w-full" type="submit">
                        {isLoginLoading ? <span className="loading loading-spinner" /> : null}
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
