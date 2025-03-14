export default function Home() {
  return <div className=""></div>;
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
}
