import {
  FormControl,
  FormControlProps,
  FormLabel,
} from "@chakra-ui/form-control";

const CustomFormControl = ({
  labelTitle,
  children,
  ...rest
}: CustomFormControlProps) => {
  return (
    <FormControl {...rest}>
      <FormLabel
        fontFamily="Raleway"
        fontWeight="normal"
        fontSize="clamp(0.6rem , 0.9vmax , 1.2vmax)"
      >
        {labelTitle}
      </FormLabel>
      {children}
    </FormControl>
  );
};

export default CustomFormControl;

interface CustomFormControlProps extends FormControlProps {
  labelTitle: string;
}
