import {
  Box,
  IconButton,
  Button,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

import { CloseIcon } from "@chakra-ui/icons";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useLazyFiltersBugsQuery } from "src/store/apis/bugsApiSlice";
import { callErrorToast } from "src/helpers/toast";
import { useGetAllProjectsQuery } from "src/store/apis/projectsApiSlice";
import { IProject } from "src/store/slices/projectsSlice";
import { useGetAllUsersQuery } from "src/store/apis/usersApiSlice";
import { IUser } from "src/store/slices/usersSlice";
import { useAppDispatch } from "src/helpers/ndex";
import { setIsFiltered, setResultsApi } from "src/store/slices/bugsSlice";
import "./filtersBugs.scss";

const FiltersBugs: React.FC<{
  onClose?: any;
}> = ({ onClose }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const dispatch = useAppDispatch();
  const [filtersBugs, { isFetching }] = useLazyFiltersBugsQuery();

  const { data: projects, isFetching: isFetchingProjects } =
    useGetAllProjectsQuery(
      {},
      {
        refetchOnMountOrArgChange: true,
      }
    );
  const { data: users, isFetching: isFetchingUsers } = useGetAllUsersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const handlerFilters = async () => {
    try {
      const data = {
        user_id: selectedUser,
        project_id: selectedProject,
        start_date: selectedDates[0].toISOString(),
        end_date: selectedDates[1] ? selectedDates[1].toISOString() : "",
      };
      console.log(data);
      const res = await filtersBugs(data).unwrap();
      console.log(res);
      if (res.length > 0) {
        dispatch(setIsFiltered(true));
        dispatch(setResultsApi(res));
        setSelectedDates([
          new Date(),
          new Date(),
        ]);
        setSelectedUser("");
        setSelectedProject("");
        onClose();
      } else {
        callErrorToast(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeSelectedProject = (e: ChangeEvent<HTMLSelectElement>) => setSelectedProject(e.target.value);
  const handleChangeSelectedUser = (e: ChangeEvent<HTMLSelectElement>) => setSelectedUser(e.target.value);

  return (
    <Box
      as="form"
      sx={{ padding: "10px 20px" }}
      noValidate
      autoComplete="off"
      className="filtersBugs"
      onSubmit={onClose}
    >
      <Box
        sx={{
          position: "absolute",
          right: "0px",
          height: "0px",
        }}
      >
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          boxSize={6}
          position="absolute"
          onClick={onClose}
          right="5px"
          minWidth="1.5rem"
          icon={<CloseIcon height="0.9em" />}
        />
      </Box>
      <Box
        justifyContent="center"
        display="flex"
        sx={{ maxWidth: "100%", margin: "0 auto" }}
      >
        <Heading id="modal-title" fontSize={18}>
          Filters
        </Heading>
      </Box>
      <Box
        sx={{ maxWidth: "100%", margin: "30px auto" }}
        display="flex"
        justifyContent="center"
      >
        <Stack width="95%">
          <Box>
            <FormControl>
              <FormLabel fontWeight="bold">Users:</FormLabel>
              <Select onChange={handleChangeSelectedUser} tabIndex={1}>
                <option value="">Select user</option>
                {!isFetchingUsers &&
                  users !== undefined &&
                  users.map((user: IUser) => (
                    <option key={user.id + user.name} value={user.id}>
                      {user.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControl>
              <FormLabel fontWeight="bold">Projects:</FormLabel>
              <Select onChange={handleChangeSelectedProject}>
                <option value="">Select project</option>
                {!isFetchingProjects &&
                  projects !== undefined &&
                  projects.map((project: IProject) => (
                    <option key={project._id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControl>
              <FormLabel fontWeight="bold">Range</FormLabel>
              <RangeDatepicker
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
                configs={{
                  dateFormat: "yyyy-MM-dd",
                }}
              />
            </FormControl>
          </Box>
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ fontWeight: "400", fontSize: "16px", margin: "10px auto" }}
      >
        <Button
          colorScheme="teal"
          variant="solid"
          isLoading={isFetching}
          onClick={handlerFilters}
        >
          Accept
        </Button>
      </Box>
    </Box>
  );
};

export default FiltersBugs;
