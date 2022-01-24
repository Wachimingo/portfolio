import type { GetServerSideProps } from 'next';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import AuthContext from './../../contexts/authContext';
import { getProviders, signIn } from "next-auth/react"
import { FaFacebook } from 'react-icons/fa'
import { AuthProps, Login, Register } from '../../interfaces/AuthInterface';

const Auth = ({ type, providers }: AuthProps) => {
  const router = useRouter();
  const { setSession, quitSession }: any = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const signOut = () => {
    quitSession();
    router.push('/');
  }

  useEffect(() => {
    // type === 'signout' ? signOut() : null;
    switch (type) {
      case 'signout':
        signOut();
        break;
      case 'success':
        // console.log(router.query)
        const newSession = {
          status: 'success',
          user: {
            role: router.query.role,
            name: router.query.name,
            email: router.query.email,
            picture: router.query.picture,
          },
          token: router.query.token
        }
        setSession(newSession);
        router.push('/');
        break;
    }

  }, [type])

  const signin = async (credentials: Login) => {
    const response = await fetch('/api/auth', {
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
    // .then(res => res.json()).then(res => handleResponse(res))
    const data = await response.json();

    if (response.ok) {
      setSession(data);
      if (router.query.page) {
        router.push(`${router.query.page}`);
      } else {
        router.push('/');
      }
    } else {
      console.log(data.message);
    }
  }

  const signup = async (input: Register) => {
    const response = await fetch('/api/auth', {
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

  return (
    <>
      <Head>
        <title>{type}</title>
        <meta name="Auth" content={`${type}`} />
      </Head>
      <h1 className="xl:ml-m2vw">{type}</h1>
      <section className="">
        <div className='xl:w-3/6 xl:ml-96 sm:ml-1'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-800' onSubmit={type === 'signin' ? handleSubmit(signin) : handleSubmit(signup)}>

            {/**@name is only render when the auth type is signup, and it is only use to validate that password is correct*/}
            {
              type === 'signup' ?
                <div className="mb-4">
                  <input {...register("name", { required: true, pattern: /^[a-zA-Z ]+$/ })} type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500" />
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                </div>
                : undefined
            }

            {/**@Email input */}
            <div className="mb-4">
              <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500" />
              <label className="block text-white text-sm font-bold mb-2" htmlFor="username">Correo electronico</label>
            </div>
            {errors.email && <p className="block text-red-500 text-sm font-bold mb-2">El correo electronico es requerido</p>}

            {/**@Password input */}

            <div className="mb-4">
              <input {...register("password", { required: true })} type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500" />
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
            </div>
            {errors.password && <p className="block text-red-500 text-sm font-bold mb-2">La contraseña es requerida</p>}

            {/**@PasswordConfirm is only render when the auth type is signup, and it is only use to validate that password is correct*/}
            {
              type === 'signup' ?
                <div className="mb-4">
                  <input {...register("passwordConfirm", {
                    required: true, validate: {
                      matchPassword: () => watch("password") === watch("passwordConfirm")
                    }
                  })} type="password" id="passwordConfirm" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500" />
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="passwordConfirm">Repetir contraseña</label>
                </div>
                : undefined
            }
            {errors.passwordConfirm && <p className="block text-red-500 text-sm font-bold mb-2">Las contraseñas no coinciden</p>}

            {/**@Submit button */}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{type === 'signin' ? 'Ingresar' : 'Registrarse'}</button>
          </form>
        </div>
      </section>
      {/* Other signin or signup options */}
      <section className='xl:ml-m2vw'>
        <h3>O ingresar con:</h3>
        <button className='btn btn-primary btn-lg btn-block' onClick={() => signIn(providers.facebook.id)}>
          <FaFacebook />
        </button>
      </section>
    </>
  )
}

export default Auth;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const type = context.query.type;
    const providers = await getProviders();
    // console.log(type)

    return {
      props: { type, providers },
    }
  } catch (err) {

    return { props: { error: 'Something went wrong' } }
  }
}