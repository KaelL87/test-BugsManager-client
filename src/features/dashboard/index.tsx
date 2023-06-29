/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import CardBug from "./components/cardBug";
import { useAppDispatch, useAppSelector } from "src/helpers/ndex";
import { AddIcon } from "@chakra-ui/icons";
import { FaFilter } from "react-icons/fa";
import useModal from "src/hooks/useModal";
import { RootState } from "src/store";
import { useLazyGetAllBugsQuery } from "src/store/apis/bugsApiSlice";
import { setAddedBug, setIsFiltered } from "src/store/slices/bugsSlice";

const Dashboard: React.FC = () => {
  const { pushModal } = useModal();

  const dispatch = useAppDispatch();
  const [getAllBugs, { isFetching }] = useLazyGetAllBugsQuery();

  const handleAdd = async () => {
    pushModal("AddBugModal");
  };
  const handleFilters = async () => {
    if(!isFiltered) {
      pushModal("FiltersModal");
    } else {
      getAllBugs({});
      dispatch(setIsFiltered(false));      
    }
  };
  const { bugs, addedBug, isFiltered } =
    useAppSelector((state: RootState) => state.bugs) || [];
  useEffect(() => {
    getAllBugs({});
  }, []);
  useEffect(() => {
    if (addedBug) {
      getAllBugs({});
      dispatch(setAddedBug(false));
    }
  }, [addedBug]);
  return (
    <Container maxW="1500px">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ fontWeight: "400", fontSize: "16px" }}
        mb={5}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{ fontWeight: "400", fontSize: "16px" }}
          mb={5}
        >
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={handleAdd}
          >
            Add Bug
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{ fontWeight: "400", fontSize: "16px" }}
          mb={5}
        >
          <Button
            leftIcon={<FaFilter />}
            colorScheme="facebook"
            variant="solid"
            onClick={handleFilters}
          >
            {!isFiltered ? 'Filters' : 'Clear'}
          </Button>
        </Box>
      </Box>
      {!isFetching && bugs !== undefined && bugs.length > 0 ? (
        <Wrap justify="space-evenly" spacing="25px">
          {bugs.map((data) => (
            <WrapItem key={data._id}>
              <Center w="100%" h="100%">
                <CardBug data={data} />
              </Center>
            </WrapItem>
          ))}
        </Wrap>
      ) : isFetching ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="85vh"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <Heading size="2xl">No bugs found</Heading>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
