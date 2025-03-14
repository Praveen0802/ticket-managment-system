import SecureLayout from "@/components/secureLayout";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import { store } from "@/utils/redux/store";
import { Roboto } from "next/font/google";

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
        </SecureLayout>
      </Provider>
    </main>
  );
}
