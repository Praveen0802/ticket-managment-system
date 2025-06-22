import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import StadiumMap from "./mapSvg";

const PinPatchMap = ({
  onClose,
  mapData,
  svgUrl,
  displayTicketDetails,
  commonProps,
}) => {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div className="flex items-center justify-end border-b-[1px] border-[#DADBE5]">
        <div className="py-[9px] px-[12px] flex items-center gap-3">
          <div className="border-[1px] w-fit flex items-center border-[#DADBE5] rounded-4px]">
            <button
              onClick={() => zoomIn()}
              className="cursor-pointer p-[3px] border-r-[1px] border-[#DADBE5]"
            >
              <IconStore.plus className="size-4" />
            </button>
            <button
              onClick={() => zoomOut()}
              className="cursor-pointer p-[3px] "
            >
              <IconStore.minus className="size-4" />
            </button>
          </div>
          <button
            onClick={() => resetTransform()}
            className="cursor-pointer p-[3px] border-[1px] border-[#DADBE5]"
          >
            <IconStore.reload className="size-4" />
          </button>
        </div>
        <div className="px-[12px] border-l-[1px] border-[#DADBE5]">
          <button
            onClick={() => onClose()}
            className="cursor-pointer p-[3px] border-[1px] border-[#DADBE5]"
          >
            <IconStore.close className="size-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white h-full">
      <TransformWrapper
        initialScale={1}
        initialPositionX={200}
        initialPositionY={100}
      >
        {({ zoomIn, zoomOut, resetTransform, state, ...rest }) => (
          <>
            <Controls />
            <div className="w-full h-full flex items-center justify-center">
              <TransformComponent wrapperClass="!w-full !h-full ">
                <StadiumMap
                  stadiumData={mapData}
                  svgUrl={svgUrl}
                  transformState={state}
                  displayTicketDetails={displayTicketDetails}
                  commonProps={commonProps}
                />
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default PinPatchMap;
