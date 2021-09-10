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
      <FormLabel fontFamily="Raleway" fontWeight="normal" fontSize="0.8rem">
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
