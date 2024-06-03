import { Spinner } from "flowbite-react";

const LoadingComponent = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Spinner
        aria-label="Extra large spinner example"
        size="xl"
        color={"pink"}
      />
    </div>
  );
};

export default LoadingComponent;
