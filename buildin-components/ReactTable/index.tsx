/* eslint-disable react/jsx-key */
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Progress,
  Table,
  TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { Column, usePagination, useTable } from 'react-table';

type Props = {
  columns: Column[];
  data: any[];
  fetchData: ({ pageSize, pageIndex }: any) => void; // onPageChange
  loading: boolean; // 是否为loading状态
  pageCount: number; // 总页数
  pageSize?: number; // 每页行数
  pageNeighbours?: 0 | 1 | 2;
};

const ReactTable = (props: Props & TableProps) => {
  const {
    columns,
    data,
    fetchData,
    loading,
    pageSize: p_pageSize = 10,
    pageNeighbours = 2,
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // usePagination 属性
    page, // An array of rows for the current page, determined by the current pageIndex value.
    canPreviousPage,
    canNextPage,
    pageOptions, // An array of zero-based index integers corresponding to available pages in the table.
    pageCount, // 总页数
    gotoPage, // 跳到指定页
    nextPage,
    previousPage,
    setPageSize, // 修改 state.pageSize 每页显示条数
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: p_pageSize }, // Pass our hoisted table state
      manualPagination: true,
      // 自定义分页， 需要传入 pageCount 页数
      pageCount: props.pageCount,
    },
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  /*
    Create an array of certain length and set the elements within it from
    start value to end value.
   */
  const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  // based on https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react
  const paginationRange = useMemo(() => {
    // 按钮 : 首页, <, pageNeighbours ,current, pageNeighbours ,> ,尾页
    const buttonsCount = pageNeighbours * 2 + 5;

    // 如果页数小于假定的按钮数，返回  [0..totalButtonsCount-1]
    if (pageCount <= buttonsCount) {
      return range(1, pageCount);
    }

    const currentPage = pageIndex + 1;

    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(pageCount - 1, currentPage + pageNeighbours);
    let pages = range(startPage, endPage) as (number | string)[];

    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = pageCount - endPage > 1;
    const spillOffset = buttonsCount - 2 - (pages.length + 1);

    switch (true) {
      // handle: (1) < {5 6} [7] {8 9} (10)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = ['LEFT', ...extraPages, ...pages];
        break;
      }

      // handle: (1) {2 3} [4] {5 6} > (10)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, 'RIGHT'];
        break;
      }

      // handle: (1) < {4 5} [6] {7 8} > (10)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = ['LEFT', ...pages, 'RIGHT'];
        break;
      }
    }

    return [1, ...pages, pageCount];
  }, [pageCount, pageNeighbours, pageIndex]);

  return (
    <>
      <Flex direction="column" alignItems="center" w="full">
        <Table {...getTableProps()} {...props} opacity={loading ? 0.5 : 1}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span> */}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    );
                  })}
                </Tr>
              );
            })}
            {/* <Tr> */}
            {/* {loading ? (
                // Use our custom loading state to show a loading indicator
                <Td colSpan={10000}>Loading...</Td>
              ) : (
                <Td colSpan={10000}>
                  Showing {page.length} of ~{props.pageCount * pageSize} results
                </Td>
              )} */}
            {/* </Tr> */}
          </Tbody>
        </Table>
        <Box h="1" w="full">
          <Progress
            display={loading ? 'block' : 'none'}
            colorScheme={props.colorScheme}
            size="xs"
            w="full"
            isIndeterminate
          />
        </Box>
        <HStack p="1" w="full" justify="flex-end">
          {paginationRange.map((page, index) => {
            if (page === 'LEFT')
              return (
                <IconButton
                  size="xs"
                  colorScheme={props.colorScheme}
                  aria-label=""
                  icon={<ChevronLeftIcon />}
                  onClick={() => previousPage()}
                  isDisabled={!canPreviousPage}
                />
              );
            if (page === 'RIGHT')
              return (
                <IconButton
                  size="xs"
                  colorScheme={props.colorScheme}
                  aria-label=""
                  icon={<ChevronRightIcon />}
                  onClick={() => nextPage()}
                  isDisabled={!canNextPage}
                />
              );

            return (
              <Button
                size="xs"
                colorScheme={props.colorScheme}
                onClick={() => gotoPage(Number(page) - 1)}
                isDisabled={Number(page) - 1 == pageIndex}
              >
                {page}
              </Button>
            );
          })}
          {/* <Select
            size="xs"
            w="fit-content"
            colorScheme={props.colorScheme}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select> */}
        </HStack>
      </Flex>
    </>
  );
};

export default ReactTable;
