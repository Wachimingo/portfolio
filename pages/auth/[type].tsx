import type { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import AuthContext from './../../contexts/authContext';
import { getProviders, signIn } from "next-auth/react"

interface AuthProps {
  type: string,
  providers: any,
}

type Response = {
  status: string,
  token: string,
  user: {
    balance: number,
    canBorrow: boolean,
    email: string,
    name: string,
    role: string,
    tn: string,
    _id: string
  }
}

type Login = {
  email: string,
  password: string
}

type Register = {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
}

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
        setSession(router.query);
        break;
    }

  }, [type])

  const signin = (data: Login) => {
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        type: 'signin'
      })
    }).then(res => res.json()).then(res => handleResponse(res))
  }

  const signup = (data: Register) => {
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        type: 'signup'
      })
    })
    signIn("email", { email: data.email })
  }

  const handleResponse = (response: Response) => {
    console.log(response)
    if (response.user !== undefined) {
      setSession(response);
      if (router.query.page) {
        router.push(`${router.query.page}`);
      } else {
        router.push('/');
      }
    } else {
      // toast.error(response.message);
      console.log(response);
    }
  }

  return (
    <>
      <Head>
        <title>{type}</title>
        <meta name="Auth" content="Signin or Signup" />
      </Head>
      <h1 className="display-6">{type}</h1>
      <section className="vh-25 mt-5">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              {/* Start of login form */}
              <form onSubmit={type === 'signin' ? handleSubmit(signin) : handleSubmit(signup)}>

                {/**@name is only render when the auth type is signup, and it is only use to validate that password is correct*/}
                {
                  type === 'signup' ?
                    <div className="form-floating mb-3">
                      <input {...register("name", { required: true, pattern: /^[a-zA-Z ]+$/ })} type="text" id="name" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="name">Nombre</label>
                    </div>
                    : null
                }

                {/**@Email input */}
                <div className="form-floating mb-3">
                  <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" id="username" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="username">Correo electronico</label>
                </div>
                {errors.email && <p className="text-danger">El correo electronico es requerido</p>}

                {/**@Password input */}

                <div className="form-floating mb-3">
                  <input {...register("password", { required: true })} type="password" id="password" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="password">Contraseña</label>
                </div>
                {errors.password && <p className="text-danger">La contraseña es requerida</p>}

                {/**@PasswordConfirm is only render when the auth type is signup, and it is only use to validate that password is correct*/}
                {
                  type === 'signup' ?
                    <div className="form-floating mb-3">
                      <input {...register("passwordConfirm", {
                        required: true, validate: {
                          matchPassword: () => watch("password") === watch("passwordConfirm")
                        }
                      })} type="password" id="passwordConfirm" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="passwordConfirm">Repetir contraseña</label>
                    </div>
                    : null
                }
                {errors.passwordConfirm && <p className="text-danger">Las contraseñas no coinciden</p>}

                {/**@Submit button */}
                <button type="submit" className="btn btn-primary btn-lg btn-block">{type === 'signin' ? 'Ingresar' : 'Registrarse'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Other signin or signup options */}
      <h3>O ingresar con:</h3>
      <section>
        <button className='btn btn-primary btn-lg btn-block' onClick={() => signIn(providers.facebook.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
          </svg>
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
    // console.log(providers)

    return {
      props: { type, providers },
    }
  } catch (err) {

    return { props: { error: 'Something went wrong' } }
  }
}