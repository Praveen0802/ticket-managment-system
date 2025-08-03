const ZohoDocs = () => {
  const docsUrl =
    "https://sign.zoho.in/zsguest?locale=en&sign_id=234b4d535f495623c83c537b2370503ebe105343f3748c193cedca8525908e3800b4987045557d056753bb7c9ce207aa6f36a242a97f49b7386082d0e62ca5ae5643518b27336e02f47ad95032ca111dcc90ad6ee0a5e170d6f8567ca2c5c0067aca40b35ab51c371d6bc49af54e8d480347595e95e4004f8ed817f975235e8fa14409d19964c5f1&frameorigin=https://example.com";
  return (
    <>
      <div className="p-4">
        <p>Zoho Docs Embedded</p>
        <iframe src={docsUrl} width={"100%"} height={"100%"} />
      </div>
    </>
  );
};

export default ZohoDocs;
