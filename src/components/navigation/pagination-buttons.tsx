import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Menu } from "@headlessui/react";

const PaginationButtons = ({
  currentPage = 0,
  setCurrentPage,
  totalPages = 0,
  pageSize = 0,
  setPageSize,
}: {
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  totalPages?: number;
  pageSize?: number;
  setPageSize?: Dispatch<SetStateAction<number>>;
}) => {
  const paginationStyle = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  const pageSizes = [5, 10, 15, 25];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage && setCurrentPage(selected);
  };

  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;

  const handlePageSizeSelect = (active: boolean, size: number) => {
    if (active && setPageSize) setPageSize(size);
  };
  return (
    <motion.div variants={paginationStyle} initial="hidden" animate="visible">
      <div className="my-8 flex items-center justify-between">
        <div className="relative grid place-items-center text-xs">
          <Menu>
            {({ open }) => (
              <>
                <div className="flex items-center space-x-2 ">
                  <span className="font-semibold text-primary uppercase tracking-wider">
                    Items per page:{" "}
                  </span>
                  <Menu.Button className="secondary-btn flex items-center">
                    <span className="mr-2">{`${pageSize}`}</span>
                    <HiChevronDown className="" />
                  </Menu.Button>
                </div>

                {open && (
                  <Menu.Items
                    as={motion.div}
                    initial={{ height: "0", opacity: "0" }}
                    animate={{ height: "auto", opacity: "1" }}
                    transition={{ duration: "0.15" }}
                    className="absolute top-5 left-32 z-10 mt-2 flex items-center divide-x-1 divide-gray-200 rounded-sm bg-gray-50 text-center text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                  >
                    {pageSizes.map((size, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <a
                            className={`${active ? "bg-gray-200" : ""
                              } block whitespace-nowrap px-3 py-1`}
                            href="#"
                            onClick={() => handlePageSizeSelect(active, size)}
                          >
                            <span>{size}</span>
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                )}
              </>
            )}
          </Menu>
        </div>
        {totalPages > 1 && (
          //@ts-ignore
          <ReactPaginate
            breakLabel={<span className="mx-1">...</span>}
            nextLabel={
              showNextButton ? (
                <span className="mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs">
                  <BsChevronRight />
                </span>
              ) : null
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={totalPages}
            previousLabel={
              showPrevButton ? (
                <span className="mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs">
                  <BsChevronLeft />
                </span>
              ) : null
            }
            containerClassName="flex items-center justify-end "
            pageClassName="block border-1 border-gray-100 hover:bg-gray-100 w-10 h-10 flex items-center justify-center mx-1 text-xs cursor-pointer rounded-full"
            activeClassName="bg-primary text-white hover:text-gray-900"
          />
        )}
      </div>
    </motion.div>
  );
};
export default PaginationButtons;
