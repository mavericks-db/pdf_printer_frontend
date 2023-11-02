"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./messagedetails.module.css";
import HomeButton from "@/app/components/HomeButton";

interface DetailsProps {
  params: {
    message_id: String;
  };
}

const Details: React.FC<DetailsProps> = ({ params }) => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const fetchDetails = async () => {
      const dataobj = {
        id: params.message_id,
        token: token,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/messages/details`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataobj),
        },
      );
      const data = await response.json();
      setDetails(data.data);
      console.log(data.data);
    };

    fetchDetails();
  }, [params.message_id, token]);

  return (
    <div className='container flex justify-center items-center'>
      <div className={`${styles.details} flex flex-col items-center`}>
        <h1 className='text-2xl'>Message Details</h1>
        <br />
        {details &&
          Object.keys(details).map((el) => (
            <h3 key={el}>
              {el} : {details[el]}
            </h3>
          ))}
        <br />
        <HomeButton />
      </div>
    </div>
  );
};

export default Details;
