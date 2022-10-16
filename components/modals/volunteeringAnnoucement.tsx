import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineCorporateFare } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { EventButton } from "../eventButton";
import { MdChatBubbleOutline } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

type Props = {
  volunteeringName: string;
  orgName: string;
  city: string;
  isPaid: boolean;
  volunteeringType: string;
  volunteeringTerm: string;
  volunteeringImage: string;
  isFavorite: boolean;
  isNotifications: boolean;
  description: string;
  showVolunteeringAnnoucementModal: boolean;
  setShowVolunteeringAnnoucementModal: any;
};

export const VolunteeringAnnoucement = ({
  volunteeringName,
  orgName,
  city,
  isPaid,
  volunteeringType,
  volunteeringTerm,
  volunteeringImage,
  isFavorite,
  isNotifications,
  description,
  showVolunteeringAnnoucementModal,
  setShowVolunteeringAnnoucementModal,
}: Props) => {
  const modal = useRef<HTMLDivElement>(null);

  const [favorite, setFavorite] = useState(isFavorite);
  const [notification, setNotification] = useState(isNotifications);

  const handleNotifications = (isSelected: boolean) => {
    setNotification(isSelected);

    // there will be all the logic to handle the notifications switch
  };

  const handleFavorite = (isSelected: boolean) => {
    setFavorite(isSelected);

    // there will be all the logic to handle the favorite switch
  };

  const handleToggleModal = (value: boolean) => {
    if (modal.current) {
      if (value) modal.current.classList.toggle("hidden");
      setTimeout(() => {
        if (value) {
          modal.current!.classList.replace("opacity-0", "opacity-100");
        } else {
          modal.current!.classList.replace("opacity-100", "opacity-0");
          setTimeout(() => {
            modal.current?.classList.toggle("hidden");
          }, 500);
        }
      }, 1);
    }
  };

  useEffect(() => {
    if (showVolunteeringAnnoucementModal) {
      handleToggleModal(true);
    } else {
      handleToggleModal(false);
    }
  }, [showVolunteeringAnnoucementModal]);

  return (
    <>
      <div
        id="forgot-password-modal"
        ref={modal}
        tabIndex={-1}
        className="opacity-0 hidden transition fixed inset-0 z-[1000] font-inter"
      >
        <div
          className="fixed w-screen h-screen bg-black opacity-50"
          onClick={() => setShowVolunteeringAnnoucementModal(false)}
        ></div>
        <div className="bg-main-color rounded-lg h-2/3 w-2/3 fixed hidden opacity-0">
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 justify-end m-3">
              <button className="text-4xl text-white transition ease-in-out hover:scale-110 duration-300 delay-100">
                <AiOutlineCloseCircle />
              </button>
            </div>
            <span className="text-white text-4xl font-semibold ml-6 my-2">
              {volunteeringName}
            </span>
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-end mr-4 xl:mr-12 gap-3 text-main-color">
              <span className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex my-2 select-none">
                {isPaid ? "Płatny" : "Bezpłatny"}
              </span>
              <span className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex my-2 select-none">
                {volunteeringTerm}
              </span>
              <span className="rounded-lg bg-white w-28 px-2 py-2 text-center justify-center items-center flex my-2 select-none">
                {volunteeringType}
              </span>
            </div>

            <div className="flex flex-row text-white mx-6 my-3">
              <MdOutlineCorporateFare className="flex mr-1 my-1" />
              <span>{orgName}</span>
              <IoLocationOutline className="flex mr-1 my-1" />
              <span>{city}</span>
            </div>
            <span className="text-white mx-6">Opis</span>
            <div className="rounded-lg bg-white h-[20rem] w-2/3 xl:w-1/2 mx-6 my-2 text-main-color p-2">
              {description}
            </div>
          </div>
          <div className="flex w-full justify-center gap-3 text-main-color my-6">
            <EventButton
              icon="favorite"
              isSelected={favorite}
              handleEvent={handleFavorite}
            />
            <EventButton
              icon="notifications"
              isSelected={notification}
              handleEvent={handleNotifications}
            />
            <button className="rounded-full bg-white text-4xl p-2 transition ease-in-out hover:scale-110 duration-300">
              <MdChatBubbleOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
