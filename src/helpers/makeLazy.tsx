import { lazy, Suspense } from "react";
import { Box, Spinner } from "@chakra-ui/react";

function defaultFallback() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="transparent"
      >
        <Spinner width="80px" height="80px" color="white" />
      </Box>
    </>
  );
}

export const dynamic = (fn: any, fallback?: any) => {
  const Component = lazy(() => {
    return new Promise((resolve) => setTimeout(resolve, 5 * 1000)).then(fn);
  });

  return (props = {}) => (
    <Suspense fallback={fallback || defaultFallback()}>
      <Component {...props} />
    </Suspense>
  );
};
