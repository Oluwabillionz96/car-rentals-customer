"use client";

import { useParams } from "next/navigation";

const PaymentPage = () => {
  const { id } = useParams();
  return <div>PaymentPage {id}</div>;
};

export default PaymentPage;