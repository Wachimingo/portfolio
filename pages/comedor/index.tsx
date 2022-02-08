import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = (redirect_status: string) => {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        !loaded
            ? toast.info('Transaccion esta siendo procesada')
            : undefined
        setLoaded(true)
    }, [])
    return (
        <>

        </>
    )
}

export default index;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     try {
//         return {
//             props: {
//                 redirect_status: context?.params?.redirect_status
//             }
//         }
//     } catch (error) {
//         return {
//             notFound: true
//         }
//     }

// }