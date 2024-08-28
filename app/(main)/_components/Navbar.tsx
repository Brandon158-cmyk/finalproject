import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import SearchInput from "@/components/SearchInput";

const Navbar = () => {
  return (
    <div className='container left-0 right-0 px-4 h-full w-full flex items-center bg-white'>
      <MobileSidebar />
      <div className='hidden md:flex w-full items-center'>
        <SearchInput className='w-full md:max-w-[500px] max-w-none' />
      </div>
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
