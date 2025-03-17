import React, { useEffect } from "react";
import LeftMenuBar from "../leftMenuBar";
import { useRouter } from "next/router";
import { hideHeaderPages, hideLeftMenuPages } from "@/utils/constants/contants";
import { useDispatch, useSelector } from "react-redux";
import { hidepageLoader, showpageLoader } from "@/utils/redux/loader/action";
import PageLoader from "../pageLoader";
import Header from "../header";

const SecureLayout = ({ children }) => {
  const router = useRouter();
  const hideLeftMenu = hideLeftMenuPages?.includes(router?.pathname);
  const hideHeader = hideHeaderPages?.includes(router?.pathname);
  const dispatch = useDispatch();
  const { pageLoader } = useSelector((state) => state.pageLoader);

  useEffect(() => {
    const handleStart = () => dispatch(showpageLoader());
    const handleComplete = () => dispatch(hidepageLoader());

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {pageLoader ? (
        <PageLoader />
      ) : (
        <div className="flex h-screen">
          {!hideLeftMenu && <LeftMenuBar />}
          <div className="flex flex-col max-md:pt-20 w-full overflow-hidden">
            {!hideHeader && <Header />}
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecureLayout;