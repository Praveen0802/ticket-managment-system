import React from "react";
import { FiEye, FiEdit2, FiLink, FiClock, FiCheck } from "react-icons/fi";
import EyeHeader from "./components/eyeHeader";
import ComponentWrapper from "./components/componentWrapper";
import calendar from "../../../public/calendar-03.svg";
import Image from "next/image";
import ListView from "./components/listView";
import { IconStore } from "@/utils/helperFunctions/iconStore";

const Overview = () => {
  const myAccountValues = [
    { title: "21", desc: "Total sales" },
    { title: "21", desc: "Total sales" },
    { title: "21", desc: "Total sales" },
    { title: "21", desc: "Total sales" },
  ];

  const myTeamValues = {
    values: [
      { title: "21", desc: "Users (80)" },
      { title: "21", desc: "Users (80)" },
    ],
    listValues: [{ name: "Amir Khan" }, { name: "Hussain" }],
  };

  const txPayValues = [
    {
      title: "£ 988.32",
      desc: "Available",
      icon: <IconStore.circleTick className="stroke-green-600 size-5" />,
    },
    {
      title: "£7,400",
      desc: "Pending",
      icon: <IconStore.clock className="stroke-black size-4" />,
    },
    { title: "First Abu Dhabi Bank", desc: "Funding account" },
    { title: "First Abu Dhabi Bank", desc: "Withdrawal account" },
    { title: "Mastercard **** 6542", desc: "Default card" },
    { title: "GBP (£)", desc: "Base currency" },
  ];

  const referralValues = [
    { title: "21", desc: "Total Earnings" },
    { title: "21", desc: "Referral" },
  ];
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <ComponentWrapper>
          <div className="flex flex-col gap-3 ">
            <EyeHeader title="My account" />
            <div className="border-[1px] flex flex-col gap-2 border-[#eaeaf1] rounded-lg p-3">
              <h3 className="text-[20px] font-medium">Good afternoon, Amir</h3>
              <div className="flex items-center text-gray-500 text-[12px] gap-2">
                <span>Member Since</span>
                <Image src={calendar} width={14} height={14} />
                <span>8 September 2023</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {myAccountValues.map((item, index) => (
                <ListView
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  icon={item?.icon}
                />
              ))}
            </div>
          </div>
        </ComponentWrapper>
        <ComponentWrapper>
          <div className="flex flex-col gap-6">
            <EyeHeader title="My Team" />
            <div className="grid grid-cols-2 gap-4">
              {myTeamValues?.values?.map((item, index) => (
                <ListView
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  icon={item?.icon}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {myTeamValues?.listValues?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-[12px] border-b-[1px] pb-1 border-[#eaeaf1]  flex justify-between items-center font-medium"
                  >
                    <p> {item.name}</p>
                    <IconStore.pencilEdit className="size-3" />
                  </div>
                );
              })}
            </div>
          </div>
        </ComponentWrapper>
      </div>

      {/* Middle Row */}
      <div className="flex gap-4">
        <ComponentWrapper>
          <div className="flex flex-col gap-4">
            <EyeHeader title="TX Pay" />
            <div className="grid grid-cols-2 gap-4">
              {txPayValues.map((item, index) => (
                <ListView
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  icon={item?.icon}
                />
              ))}
            </div>
          </div>
        </ComponentWrapper>

        {/* My Referrals Card */}
        <ComponentWrapper>
          <div className="flex flex-col gap-4">
            <EyeHeader title="My Referrals" />
            <ListView
              title={"my.tixstock.com/sign-up/1edb01"}
              desc={"Share your referral link"}
              className={{ label: "text-purple-500 font-medium", root: "p-3" }}
              icon={
                <IconStore.linkTag className="size-4 stroke-2 stroke-purple-500" />
              }
            />
            <div className="grid grid-cols-2 gap-4">
              {referralValues.map((item, index) => (
                <ListView
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  icon={item?.icon}
                />
              ))}
            </div>
          </div>
        </ComponentWrapper>
      </div>

      <ComponentWrapper>
        <div className="flex flex-col gap-4">
        <EyeHeader title="System status"  hideEye={true}/>
        <ListView
          title={"Tixstock core"}
          desc={"All systems operational"}
          className={{ descClass: "text-green-500 font-medium", root: "p-3" }}
          icon={<IconStore.linkTag className="size-3 stroke-2 " />}
        />
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default Overview;
