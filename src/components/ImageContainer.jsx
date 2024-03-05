/* eslint-disable react/prop-types */
import { Image } from "@chakra-ui/react";

const ImageContainer = ({ link, alt, size, style }) => {
  return (
    <Image
      objectFit="cover"
      borderRadius="full"
      boxSize={size}
      src={link || ""}
      alt={alt}
      style={style}
    />
  );
};

export default ImageContainer;
