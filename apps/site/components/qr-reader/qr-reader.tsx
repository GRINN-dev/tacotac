import * as React from "react";

import { useQrReader } from "./hooks";
import { styles } from "./styles";
import { QrReaderProps } from "./types";

export const QrReader: React.FC<QrReaderProps> = ({
  videoContainerStyle,
  containerStyle,
  videoStyle,
  constraints,
  ViewFinder,
  scanDelay,
  className,
  onResult,
  videoId,
}) => {
  useQrReader({
    constraints,
    scanDelay,
    onResult,
    videoId,
  });

  return (
    <section className={className} style={{ ...styles.containerStyle }}>
      <div
        style={{
          ...styles.container,
          ...videoContainerStyle,
        }}
      >
        {!!ViewFinder && <ViewFinder />}
        <video
          className="border-8 border-gray-600 rounded-md shadow-inner border-spacing-16"
          muted
          id={videoId}
          style={{
            ...styles.video,
            ...videoStyle,
            ...containerStyle,
            transform: constraints?.facingMode === "user" && "scaleX(-1)",
          }}
        />
        {/* <div className="absolute top-0 border-black border-10 ">
          <div className="absolute left-0 w-10 h-1 bg-white"></div>
          <div className="absolute right-0 w-10 h-1 bg-white"></div>
          <div className="absolute left-0 w-10 h-1 bg-white"></div>
          <div className="absolute right-0 w-10 h-1 bg-white"></div>
          <div className="absolute w-10 h-12 bg-white "></div>
          <div className="absolute w-10 h-12 bg-white "></div>
          <div className="absolute w-10 h-12 bg-white "></div>
          <div className="absolute w-10 h-12 bg-white "></div>
        </div> */}
      </div>
    </section>
  );
};

QrReader.displayName = "QrReader";
QrReader.defaultProps = {
  constraints: {
    facingMode: "user",
  },
  videoId: "video",
  scanDelay: 500,
};
