import { MdOutlineCorporateFare } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

type Props = {
  volunteeringName: string;
  orgName: string;
  city: string;
  isPaid: boolean;
  volunteeringType: string;
  volunteeringTerm: string;
  volunteeringImage: string;
  description: string;
  participantsCounter:number;

};

export const OrganisatorVolunteeringBox = ({
  volunteeringName,
  orgName,
  city,
  isPaid,
  volunteeringType,
  volunteeringTerm,
  description,
  participantsCounter
}: Props) => {
  return (
    <div className="font-inter flex h-screen">
      <div className="flex w-2/5 h-3/4 bg-main-color rounded-xl ">
        <div className="flex flex-col mt-3 ml-6 gap-2">
          <span className="font-semibold text-3xl text-white">
            {volunteeringName}
          </span>
          <div className="flex flex-col xl:flex-row font-regular gap-1 text-md text-white">
            <div className="flex flex-row items-center">
              <MdOutlineCorporateFare className="flex mr-1 my-1" />
              <span className="">{orgName}</span>
            </div>
            <div className="flex flex-row items-center">
              <IoLocationOutline className="flex mr-1 my-1" />
              <span className="">{city}</span>
            </div>
          </div>
          <div className="flex flex-row w-full text-md gap-2 font-regular text-main-color justify-center">
            <div className="rounded-lg bg-white text-center w-40 py-2">
              {isPaid ? "Płatny" : "Bezpłatny"}
            </div>
            <div className="rounded-lg bg-white w-40 px-2 py-2 text-center">
              {volunteeringType}
            </div>
            <div className="rounded-lg bg-white w-40 px-4 py-2 text-center ">
              {volunteeringTerm}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white">Opis</span>
            <div className="bg-white rounded-lg p-2">{description}</div>
          </div>
        <div className="flex flex-col">
            <span className="text-white">Uczestnicy: {participantsCounter}</span>
        </div>
        </div>
      </div>
    </div>
  );
};
export default OrganisatorVolunteeringBox;
