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
        className=""
        style={{
          ...styles.container,
          ...videoContainerStyle,
        }}
      >
        {!!ViewFinder && <ViewFinder />}
        <video
          className=""
          muted
          id={videoId}
          style={{
            ...styles.video,
            ...videoStyle,
            ...containerStyle,
          }}
        />
      </div>
    </section>
  );
};

QrReader.displayName = "QrReader";
QrReader.defaultProps = {
  constraints: {
    facingMode: "environment",
  },
  videoId: "video",
  scanDelay: 500,
};
