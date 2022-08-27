import Loader from "@components/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader = ({ loading, children }: WithLoaderProps) => {
  return (
    <>
      {children}
      {loading && <Loader />}
    </>
  );
};

export default WithLoader;
