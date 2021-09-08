import {
  Box,
  SliderFilledTrack,
  SliderTrack,
  Slider,
  SliderThumb,
  SliderProps,
  Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

const CustomSlider = ({
  SliderThumbIcon,
  thumbValue,
  ...rest
}: CustomSliderProps) => {
  return (
    <Slider {...rest}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb pos="relative" boxSize={5}>
        <Text pos="absolute" fontSize="0.65rem" top="-1.5em" left="0">
          {thumbValue}
        </Text>
        <Box as={SliderThumbIcon} />
      </SliderThumb>
    </Slider>
  );
};

export default CustomSlider;

interface CustomSliderProps extends SliderProps {
  SliderThumbIcon: IconType;
  thumbValue?: number | string;
}
