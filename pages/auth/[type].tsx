import type { GetServerSideProps, NextPage } from 'next';
import { FormEvent, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import AuthContext from './../../contexts/authContext';
// import Footer from 'next/footer';

interface AuthProps {
  type: string
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

const Auth = ({ type }: AuthProps) => {
  const router = useRouter();
  const { setSession, quitSession }: any = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const signOut = () => {
    quitSession();
    router.push('/');
  }

  useEffect(() => {
    type === 'signout' ? signOut() : null;
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

  const handleResponse = (response: Response) => {
    // console.log(response)
    if (response.user !== undefined) {
      setSession(response.user);
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
      {/* {console.log(type)} */}
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
              <form onSubmit={handleSubmit(signin)}>

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
                      <input {...register("passwordConfirmation", {
                        required: true, validate: {
                          matchPassword: () => watch("password") === watch("passwordConfirmation")
                        }
                      })} type="password" id="passwordConfirmation" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="passwordConfirmation">Repetir contraseña</label>
                    </div>
                    : null
                }
                {errors.passwordConfirmation && <p className="text-danger">Las contraseñas no coinciden</p>}

                {/**@Submit button */}
                <button type="submit" className="btn btn-primary btn-lg btn-block">{type === 'signin' ? 'Ingresar' : 'Registrarse'}</button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Auth;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // const providers = await getProviders()
    // return {
    //   props: { providers },
    // }

    const type = context.query.type

    return {
      props: { type },
    }
  } catch (err) {

    return { props: { error: 'Something went wrong' } }
  }
}