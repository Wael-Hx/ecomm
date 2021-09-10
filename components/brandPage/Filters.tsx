import { Button, Select, VStack, Text } from "@chakra-ui/react";
import { CgDollar } from "react-icons/cg";
import { BsArrowsAngleExpand } from "react-icons/bs";
import CustomSlider from "../ui/form/Slider";
import { BrandColors, BrandIcon } from "../ui/icons";
import { useState, FormEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setShopFilters,
  resetShopFilters,
  initialState,
} from "../brandPage/filtersSlice";
import FormControl from "../ui/form/FormControl";
import { FilterOptions } from "../../types";

const compareFilter = (initial: FilterOptions, target: FilterOptions) => {
  return (
    Object.entries(initial).sort().toString() ===
    Object.entries(target).sort().toString()
  );
};

const Filters = (props: FiltersProps) => {
  const dispatch = useAppDispatch();
  const shopFilters = useAppSelector((state) => state.filters);
  const [filters, setFilters] = useState(shopFilters);

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
    dispatch(setShopFilters(filters));
  };

  const resetFilters = () => {
    setFilters(initialState);
    dispatch(resetShopFilters());
  };

  return (
    <VStack as="section" spacing="6" w="100%">
      <BrandIcon
        boxSize="10vmin"
        brandName={props.name}
        fill={BrandColors[props.name]}
      />
      <VStack onSubmit={submitFilters} as="form" w="100%" spacing="4">
        <Text alignSelf="start" as="h5">
          Minimum Price:
        </Text>
        <CustomSlider
          thumbValue={filters.price}
          id="price-slider"
          focusThumbOnChange={false}
          onChange={onPriceChange}
          name="price"
          aria-label="price-slider"
          SliderThumbIcon={CgDollar}
          value={filters.price}
          max={2000}
          min={100}
        />
        <Text alignSelf="start" as="h5">
          Minimum Screen Size:
        </Text>

        <CustomSlider
          thumbValue={filters.size}
          id="screen-size-slider"
          focusThumbOnChange={false}
          onChange={onSizeChange}
          name="size"
          value={filters.size}
          aria-label="screensize-slider"
          SliderThumbIcon={BsArrowsAngleExpand}
          max={8}
          min={4}
        />
        <FormControl labelTitle="Storage">
          <Select
            value={filters.storage}
            onChange={onSelectChange}
            name="storage"
          >
            {["8", "16", "32", "64"].map((val) => (
              <option key={val} value={val}>
                {`${val} Gb`}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl labelTitle="Ram">
          <Select value={filters.ram} onChange={onSelectChange} name="ram">
            {["4", "6", "8", "12"].map((val) => (
              <option key={val} value={val}>
                {`${val} Gb`}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button
          fontFamily="Montserrat"
          fontWeight="normal"
          fontSize="0.8rem"
          w="full"
          variant="outline"
          type="submit"
          onClick={submitFilters}
        >
          APPLY
        </Button>
        <Button
          fontFamily="Montserrat"
          fontWeight="normal"
          fontSize="0.8rem"
          w="full"
          variant="outline"
          type="button"
          isDisabled={compareFilter(initialState, shopFilters)}
          onClick={resetFilters}
        >
          RESET
        </Button>
      </VStack>
    </VStack>
  );
};

export default Filters;

interface FiltersProps {
  name: string;
}
