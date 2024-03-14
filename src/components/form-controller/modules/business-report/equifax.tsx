"use client";
// @ts-ignore
import React, { useState } from "react";
import { MonitorReportForm } from "@/components/business-account-elements/monitor.report.form";
import { SubHeader } from "@/components/business-account-elements/sub.header";
import { ArrowLineText } from "@/components/business-account-elements/arrow.line.text";
import { VideoCard } from "@/components/cards/video-card";
import { ImportantInformation } from "@/components/business-account-elements/important.imformation";
import { Button, Input } from "@mui/material";
import { GeneralCard } from "@/components/cards/general.cad";
import { GotoWebsiteCard } from "@/components/cards/goto.website.card";
import { SubFormFooter } from "@/components/business-account-elements/sub.form.footer";
import { EditableContentRecord } from "@/components/business-account-elements/edaitable.content.record";
import { BlogCardLeft, BlogCustomCardLeft } from "@/components/cards/blog.card";
import { GotoWebsiteThreeCard } from "@/components/cards/goto.website.three.card";
import { SelectCard, SelectCardInvidual } from "@/components/cards/select.card";
import { Alert } from "@/components/business-account-elements/alert";
import { ApiCalls } from "@/api/calls/calls";
import { Calls } from "@/api/calls/type";
import { Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const headerContent = {
  step: "Step 2",
  title: "Establish Business Reports",
  subTitle: "BUSINESS EQUIFAX",
};

const headerString =
  "DOES YOUR BUSINESS HAVE A PROFILE WITH BUSINESS EQUIFAX YET?";

const alertContent =
  "Goal for this Step is to see if your company is listed with Equifax yet and to see if any discrepancies which can be fixed by the directions in Reporting Step";

const videoConten = {
  title: "Watch Video Transcript:",
  videoUrl: "/report/init/movie.png",
  content: "BUSINESS CREDIT EQUIFAX",
};

const contentBlogCardLeft = {
  picture: "/report/init/equifax.png",
  title: "SEE IF YOUR BUSINESS HAS A BUSINESS EQUIFAX REPORT",
  contents: [
    {
      dataString:
        "If you are unsure no need to worry, you can call Equifax 888-407-0359 (choose option 2, 2, then 4). They will ask you for your EIN number, Business name and business address then they are going to send by mail the business credit report and it should be received within 7-10 business days. If your company has a profile with Business Equifax. No need to purchase monitoring now, we will guide you in setting up monitoring in Step 4",
      dataColor: "",
      dataSize: "",
    },
  ],
};

const records = {
  title: "Required:",
  method: "Edit",
  invidualRecords: [
    {
      title: "Enter Bin(Business Identification Number):",
      icon: "/report/init/file.svg",
      contents: [
        {
          recordName: "513272519",
          iconName: "edit",
        },
      ],
    },
  ],
};

const contentSelect = {
  contents1:
    "Does business equifax list the exact same company name and business address as the secretary  of state and irs ?",
};

const informationResuorce = {
  title: "RESOURCES",
  content:
    "We hope you love the products and services we recommend! We research and update these on a regular basis. Just so you know, we may receive a commission from links on this page. We are diligent to ensure any compensation we receive does not affect the price or level of service offered to you.",
  color: "blue",
};

const footerContent = {
  content: "Return To Business Credit Builder",
  previous: true,
  next: true,
  url: "/step2/wrap",
  preUrl: "/step2/experian",
};

export const BusinessReportEquifax = () => {
  const [value, setValue] = useState<number | string | undefined | any>();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const [bsPolicyOne, setbsPolicyOne] = useState<any>("");

  const handlePolicyOne = (event: string) => {
    if (event === "1") {
      setbsPolicyOne(true);
    } else {
      setbsPolicyOne(false);
    }
  };
  const { mutateAsync, isPending } = useMutation<
    Calls.IResponse.Business,
    Error,
    Calls.IRequest.ModulesBusinessExperian
  >({
    mutationFn: async (variables) =>
      await ApiCalls.Module.businessExperian(variables),
    onSuccess: (r) => {
      toast.success(r.message);
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = await mutateAsync({
      identificationNumber: value,
      policy: bsPolicyOne,
    });
    return data;
  };
  return (
    <>
      <div className="flex flex-row w-[80%] ml-[10%] mt-10 justify-center border-2 border-blue-400 p-6 bg-[#f9f9f9] gap-6 rounded-2xl business-main business-page-rightsection-mobileview ">
        <div className="flex flex-col w-[76%] justify-start mt-6 business-page-inner-mobileview">
          <SubHeader content={headerContent} />
          <div className="flex flex-col w-full p-9 justify-center items-center content-center mt-6 bg-white business-page-namesection-mobileview" style={{boxShadow:'2px 4px 12px 0px #a3a3a324',}}>
            <ArrowLineText
              type="flex flex-col w-[auto] text-center text-gray-700 "
              content={headerString}
            />

            {/* Alert Section */}
            <Alert
              icon="/report/init/Shield-DoneVerifiedIcon.svg"
              content={alertContent}
            />

            {/* Warning section */}
            <div className="flex w-[90%] mt-4 mb-6 text-xs " style={{color:'rgba(80, 131, 193, 1)',}}>
              <p>
                If your answer is <b className=" inline-block">Yes</b> to this
                question than great job having your company already known by
                Business Equifax. We are excited to help you continue building
                your profile with them. If you aren’t sure if you do or not, no
                need to worry scroll for directions on what to do.
              </p>
            </div>

            {/* Vidio card */}
            <VideoCard videoContent={videoConten} />

            {/* Bolg section */}
            <div className="flex w-[90%] my-12">
              <BlogCustomCardLeft content={contentBlogCardLeft} />
            </div>

            {/* edit your details */}
            <div className="flex flex-col w-[85%]">
              <EditableContentRecord
                records={records}
                handleOnChange={handleOnChange}
                value={value}
              />
            </div>

            {/* import Select Card */}
            <div className="flex flex-col w-[85%] mt-0 justify-center content-center items-center">
              <SelectCardInvidual
                content={contentSelect}
                handleInput={handlePolicyOne}
                name={"business_report"}
                bsReport={bsPolicyOne}
              />
            </div>

            {/* Warning section */}
            <div className="flex w-[60%] mt-8 text-gray-500 text-xs  text-center " style={{maxWidth:'400px', color:' rgba(167, 169, 172, 1)',}}>
              If no,as long as you have it the same with the Secretary of State,
              IRS and your trade accounts, Experian will update it when your
              trade accounts report.
            </div>

            {/* save buttong */}
            <div className="flex  max-w-xs  w-full business-save-btn  mt-4 mb-8">
              <Button type="button" onClick={onSubmit} color="success">
                {isPending ? <Spinner /> : "SAVE"}
              </Button>
            </div>

            {/* general card */}
            <div className="flex  justify-center business-page-dn-number mb-8">
              <GeneralCard
                icon="/business-account/search.svg"
                content="Search for a business Equifax Report"
              />
            </div>

            {/* Resuouces importante */}
            <div className="flex w-full my-2">
              <ImportantInformation information={informationResuorce} />
            </div>

            {/* Website cards */}
            <div className="flex flex-row w-full my-12 justify-center">
              <GotoWebsiteCard
                content="Varies"
                icon="/report/init/equifaxVideocard.svg"
              />
            </div>

            {/* footer  */}
            <SubFormFooter content={footerContent} />
          </div>
        </div>
        <div className="flex w-[24%] business-page-mobileview-width">
          <MonitorReportForm />
        </div>
      </div>
    </>
  );
};
