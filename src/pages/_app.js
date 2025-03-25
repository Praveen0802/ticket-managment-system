import SecureLayout from "@/components/secureLayout";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import { store } from "@/utils/redux/store";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
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
          />
        </SecureLayout>
      </Provider>
    </main>
  );
}
