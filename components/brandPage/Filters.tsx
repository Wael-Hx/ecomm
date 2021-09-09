import { Button, Heading, Select, VStack } from "@chakra-ui/react";
import { CgDollar } from "react-icons/cg";
import { BsArrowsAngleExpand } from "react-icons/bs";
import CustomSlider from "../ui/form/Slider";
import { BrandColors, BrandIcon } from "../ui/icons";
import { useState, FormEvent, ChangeEvent } from "react";

const Filters = (props: FiltersProps) => {
  const [filters, setFilters] = useState({
    price: 400,
    size: 5,
    ram: 0,
    storage: 0,
  });

  const onPriceChange = (val: number) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      price: val,
    }));
  };
  const onSizeChange = (val: number) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      size: val,
    }));
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [e.target.name]: parseInt(e.target.value),
    }));
  };

  const submitFilters = (e: FormEvent) => {
    e.preventDefault();
    console.log(filters);
  };

  return (
    <VStack as="section" spacing="6" w="100%">
      <BrandIcon
        boxSize="10vmin"
        brandName={props.name}
        fill={BrandColors[props.name]}
      />
      <VStack onSubmit={submitFilters} as="form" w="100%" spacing="4">
        <Heading
          alignSelf="start"
          as="h4"
          fontFamily="Montserrat"
          fontWeight="normal"
          fontSize="0.8rem"
        >
          Minimum Price:
        </Heading>
        <CustomSlider
          thumbValue={filters.price}
          id="price-slider"
          focusThumbOnChange={false}
          onChangeEnd={onPriceChange}
          name="price"
          aria-label="price-slider"
          SliderThumbIcon={CgDollar}
          defaultValue={400}
          max={2000}
          min={100}
        />
        <Heading
          alignSelf="start"
          as="h4"
          fontFamily="Montserrat"
          fontWeight="normal"
          fontSize="0.8rem"
        >
          Minimum Screen Size:
        </Heading>
        <CustomSlider
          thumbValue={filters.size}
          id="screen-size-slider"
          focusThumbOnChange={false}
          onChangeEnd={onSizeChange}
          name="size"
          aria-label="screensize-slider"
          SliderThumbIcon={BsArrowsAngleExpand}
          defaultValue={5}
          max={8}
          min={4}
        />
        <Select onChange={onSelectChange} name="storage" placeholder="storage">
          {["8", "16", "32", "64"].map((val) => (
            <option key={val} value={val}>
              {`${val} Gb`}
            </option>
          ))}
        </Select>
        <Select onChange={onSelectChange} name="ram" placeholder="Ram">
          {["4", "6", "8", "12"].map((val) => (
            <option key={val} value={val}>
              {`${val} Gb`}
            </option>
          ))}
        </Select>

        <Button
          fontFamily="Montserrat"
          fontWeight="normal"
          fontSize="0.8rem"
          w="full"
          variant="outline"
          type="submit"
        >
          Apply Filters
        </Button>
      </VStack>
    </VStack>
  );
};

export default Filters;

interface FiltersProps {
  name: string;
}
