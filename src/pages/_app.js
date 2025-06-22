import SecureLayout from "@/components/secureLayout";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import { store } from "@/utils/redux/store";
import axios from "axios";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === "401") {
      window?.location?.reload()
    }
    return Promise.reject(error);
  }
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Seats Brokers</title>
        <link rel="icon" href="/template-logo.png" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={roboto.className}>
        <Provider store={store}>
          <SecureLayout>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              zIndex={99999}
            />
          </SecureLayout>
        </Provider>
      </main>
    </>
  );
}
