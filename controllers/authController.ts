import { toast } from 'react-toastify';
import { Login, Register } from '../interfaces/AuthInterface';

export const signin = async (credentials: Login, setSession: Function, router: any) => {
    const response = await fetch('/api/mainAuth', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            type: 'signin'
        })
    })
    const data = await response.json();
    if (response.ok) {
        setSession(data);
        if (router.query.page) {
            router.push(`${router.query.page}`);
        } else {
            router.push('/');
        }
    } else {
        toast.error(data.message);
    }
}

export const signup = async (input: Register, signIn: Function) => {
    const response = await fetch('/api/mainAuth', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: input.name.trim(),
            email: input.email,
            password: input.password,
            passwordConfirm: input.passwordConfirm,
            type: 'signup'
        })
    })
    const data = await response.json();
    signIn("email", { email: input.email });
}