import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Footer from 'next/footer';
// import { getProviders, signIn } from "next-auth/react"
// import { getCsrfToken } from "next-auth/react";

type AuthProps = {
  type: string
}

const Auth: NextPage = ({ type }: AuthProps) => {
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
              {/**Start of login form */}
              <form method="post" action="/api/auth/callback/credentials">
                {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}

                {/**@Email input */}

                <div className="form-outline mb-4">
                  <input name="username" type="email" id="username" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="username">Correo electronico</label>
                </div>

                {/**@Password input */}

                <div className="form-outline mb-4">
                  <input name="password" type="password" id="password" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="password">Contraseña</label>
                </div>

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