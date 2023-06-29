import {
  Box,
  IconButton,
  Button,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";

import { CloseIcon } from "@chakra-ui/icons";
import { useAddBugMutation } from "src/store/apis/bugsApiSlice";
import { callErrorToast, callSuccessToast } from "src/helpers/toast";
import { useGetAllProjectsQuery } from "src/store/apis/projectsApiSlice";
import { IProject } from "src/store/slices/projectsSlice";
import { useGetAllUsersQuery } from "src/store/apis/usersApiSlice";
import { IUser } from "src/store/slices/usersSlice";
import { useAppDispatch } from "src/helpers/ndex";
import "./addBug.scss";
import { setAddedBug } from "src/store/slices/bugsSlice";

const AddBugModal: React.FC<{
  onClose?: any;
}> = ({ onClose }) => {

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();
  const [addBug, { isLoading }] = useAddBugMutation();

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
  const handlerAddBug = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const data = {
        user: parseInt(selectedUser),
        project: parseInt(selectedProject),
        description: description,
      };
      const res = await addBug(data).unwrap();
      dispatch(setAddedBug(res.success));
      if (res.success) {
        setDescription("");
        setSelectedProject("");
        onClose();
        callSuccessToast(res.message);
      } else {
        callErrorToast(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const handleChangeSelectedProject = (e: ChangeEvent<HTMLSelectElement>) => setSelectedProject(e.target.value);
  const handleChangeSelectedUser = (e: ChangeEvent<HTMLSelectElement>) => setSelectedUser(e.target.value);
  useEffect(() => {
    if (projects && selectedProject === "") {
      setSelectedProject(projects[0].id);
    }
  }, [projects]);
  useEffect(() => {
    if (users && selectedUser === "") {
      setSelectedUser(users[0].id);
    }
  }, [users]);

  return (
    <Box
      as="form"
      sx={{ padding: "10px 20px" }}
      noValidate
      autoComplete="off"
      className="addBug"
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
          Add Bug
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
                {!isFetchingUsers &&
                  users !== undefined &&
                  users.map((user: IUser) => (
                    <option key={user.id + user.name} value={user.id}>{user.name}</option>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControl>
              <FormLabel fontWeight="bold">Projects:</FormLabel>
              <Select onChange={handleChangeSelectedProject}>
                {!isFetchingProjects &&
                  projects !== undefined &&
                  projects.map((project: IProject) => (
                    <option key={project._id} value={project.id}>{project.name}</option>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControl>
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                value={description}
                onChange={handleChangeDescription}
                size="sm"
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
          isLoading={isLoading}
          onClick={handlerAddBug}
        >
          Accept
        </Button>
      </Box>
    </Box>
  );
};

export default AddBugModal;
