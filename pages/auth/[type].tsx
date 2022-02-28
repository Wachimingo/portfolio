import type { GetServerSideProps } from 'next';
import { memo, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import AuthContext from './../../contexts/authContext';
import { signIn } from "next-auth/react"
import { FaFacebook } from 'react-icons/fa'
import { AuthProps } from '../../interfaces/AuthInterface';
import { signin, signup } from '../../controllers/authController';

const Auth = memo(({ type, content }: AuthProps) => {
  const router = useRouter();
  const { setSession, quitSession }: any = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const authActions: any = {
    "signout": () => {
      quitSession();
      router.replace('/');
    },
    "success": () => {
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
    },
    "signin": () => { }
  }

  useEffect(() => {
    authActions[type] ? authActions[type]() : console.log('Query did not match', router.query)
  }, [type])

  return (
    <>
      <Head>
        <title>{type}</title>
        <meta name="Auth" content={`${type}`} />
      </Head>

      <section className="inline-block w-max">
        <h1 className="text-2xl">{type}</h1>
        <br />
        <div className='xsm:w-screen lg:w-80'>
          <form
            className='bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-800'
            onSubmit={
              type === 'signin'
                ? handleSubmit((data: any) => signin(data, setSession, router))
                : handleSubmit((data: any) => signup(data, signIn))}
          >

            {/**@name is only render when the auth type is signup, and it is only use to validate that password is correct*/}
            {
              type === 'signup' ?
                <div className="mb-4">
                  <input {...register("name", { required: true, pattern: /^[a-zA-Z ]+$/ })} type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500" />
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="name">{content.name}</label>
                </div>
                : undefined
            }

            {/**@Email input */}
            <div className="mb-4">
              <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500" />
              <label className="block text-white text-sm font-bold mb-2" htmlFor="username">{content.email}</label>
            </div>
            {errors.email && <p className="block text-red-500 text-sm font-bold mb-2">{content.emailWarning}</p>}

            {/**@Password input */}

            <div className="mb-4">
              <input {...register("password", { required: true })} type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500" />
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">{content.password}</label>
            </div>
            {errors.password && <p className="block text-red-500 text-sm font-bold mb-2">{content.passwordWarning}</p>}

            {/**@PasswordConfirm is only render when the auth type is signup, and it is only use to validate that password is correct*/}
            {
              type === 'signup' ?
                <div className="mb-4">
                  <input {...register("passwordConfirm", {
                    required: true, validate: {
                      matchPassword: () => watch("password") === watch("passwordConfirm")
                    }
                  })} type="password" id="passwordConfirm" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500" />
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="passwordConfirm">{content.passwordConfirm}</label>
                </div>
                : undefined
            }
            {errors.passwordConfirm && <p className="block text-red-500 text-sm font-bold mb-2">{content.passwordConfirmWarning}</p>}

            {/**@Submit button */}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{type === 'signin' ? 'Ingresar' : 'Registrarse'}</button>
          </form>
        </div>
      </section>
      {/* Other signin or signup options */}
      <section className='inline'>
        <h3>{content.loginOptions}</h3>
        <button className='btn btn-primary btn-lg btn-block' onClick={() => signIn('facebook')}>
          <FaFacebook />
        </button>
      </section>
    </>
  )
})

export default Auth;

import "../../utils/dbConnection";
import Locale from "../../models/localeModel";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const type = context.query.type;
    // const providers = await getProviders();
    // console.log(type)
    const locale = await Locale.find({}).where('locale').equals(context.locale).where('pageName').equals('auth').select('-__v');
    return {
      props: {
        type,
        content: locale[0].content
      },
    }
  } catch (err) {

    return { props: { error: 'Something went wrong' } }
  }
}