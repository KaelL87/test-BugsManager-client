import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IBug } from "src/store/slices/bugsSlice";

const CardBug: React.FC<{ data: IBug }> = ({ data }) => {
  return (
    <Card maxW="200px" variant="filled" width="100%">
      <CardHeader>
        <Heading size="md">{data.username}</Heading>
      </CardHeader>
      <CardBody>
        <Text as="em" sx={{ fontWeight: "600" }}>
          Project:{' '}
        </Text>
        <Text as="abbr" sx={{ fontWeight: "400" }}>
          {data.project}
        </Text>
        <br />
        <Text as="em" sx={{ fontWeight: "600" }}>
          Description:{' '}
        </Text>
        <br />
        <Text as="abbr" sx={{ fontWeight: "400" }}>
          {data.description}
        </Text>
      </CardBody>
    </Card>
  );
};

export default CardBug;
