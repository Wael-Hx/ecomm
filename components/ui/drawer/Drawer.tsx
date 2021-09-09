import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerProps,
} from "@chakra-ui/modal";

const CustomDrawer = ({
  drawerTitle,
  children,
  ...rest
}: CustomDrawerProps) => {
  return (
    <Drawer {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader> {drawerTitle} </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;

interface CustomDrawerProps extends DrawerProps {
  drawerTitle: string;
}
