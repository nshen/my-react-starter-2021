// 基于 https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/pagination-controlled?file=/src/App.js
import { Flex, Select, Text, VStack } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import ReactTable from '../../../buildin-components/ReactTable';
import makeData from './makeData';

// Let's simulate a large dataset on the server (outside of our component)
const serverData = makeData(10000);

function TableExample() {
  // 表格样式
  const [tableVariant, setTableVariant] = useState('striped');
  const [tableSize, setTableSize] = useState('sm');
  const [tableColorScheme, setTableColorScheme] = useState('facebook');

  const [data, setData] = React.useState([]); // 表格数据
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0); // 总页数
  const fetchIdRef = React.useRef(0);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  );

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(serverData.slice(startRow, endRow));

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(serverData.length / pageSize));

        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <Flex w="full">
      {/* sidebar */}
      <VStack
        bg="gray.100"
        direction="column"
        flex="0 0 200px"
        p="3"
        spacing="6"
      >
        <Text>variant</Text>
        <Select
          value={tableVariant}
          onChange={(e) => {
            setTableVariant(e.target.value);
          }}
        >
          <option value="simple">simple</option>
          <option value="striped">striped</option>
          <option value="unstyled">unstyled</option>
        </Select>
        <Text>Size</Text>
        <Select
          value={tableSize}
          onChange={(e) => {
            setTableSize(e.target.value);
          }}
        >
          <option value="sm">sm</option>
          <option value="md">md</option>
          <option value="lg">lg</option>
        </Select>
        <Text>ColorScheme</Text>
        <Select
          value={tableColorScheme}
          onChange={(e) => {
            setTableColorScheme(e.target.value);
          }}
        >
          <option value="whiteAlpha">whiteAlpha</option>
          <option value="blackAlpha">blackAlpha</option>
          <option value="gray">gray</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
          <option value="green">green</option>
          <option value="teal">teal</option>
          <option value="blue">blue</option>
          <option value="cyan">cyan</option>
          <option value="purple">purple</option>
          <option value="pink">pink</option>
          <option value="linkedin">linkedin</option>
          <option value="facebook">facebook</option>
          <option value="messenger">messenger</option>
          <option value="whatsapp">whatsapp</option>
          <option value="twitter">twitter</option>
          <option value="telegram">telegram</option>
        </Select>
      </VStack>

      <Flex flex="1" p="3" w="full">
        <ReactTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
          variant={tableVariant}
          size={tableSize}
          colorScheme={tableColorScheme}
          w="full"
        />
      </Flex>
    </Flex>
  );
}

export default TableExample;
