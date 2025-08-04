const ZohoDocs = () => {
  const docsUrl =
    "https://sign.zoho.in/zsguest?locale=en&sign_id=234b4d535f49562335411386e0b187167e88bd23779684ebe653db9a1ca88c71664cab4b54f74b9cecdce2d1e1b18b3d4e27104d923938563144d1cf030da6121ed530a9b1a7ed27b98f852e831631eb5e96083f1e198e66527dc7873b59d097850a61b2a6f71c7546423130c9620d5218f3a9e5415b10464a2c24bc577693d6c019566e0e6834b8&frameorigin=https://seatsbrokers.com";
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
