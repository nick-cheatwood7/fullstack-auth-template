import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { withSessionSsr } from "../../server/auth";

export const getServerSideProps = withSessionSsr(function getServerSideProps({
  req,
}: GetServerSidePropsContext) {
  const user = req.session.user;

  if (user?.admin !== true) {
    return {
      redirect: { destination: "/unauthorized", permanent: false },
    };
  }

  return {
    props: {
      user: req.session.user,
    },
  };
});

export default function AdminPage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center text-white">
      You are viewing an Admin-only page
      {JSON.stringify(user)}
    </div>
  );
}
