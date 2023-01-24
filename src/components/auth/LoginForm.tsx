import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { LoginInput } from "../../schema/auth.schema";
import { loginSchema } from "../../schema/auth.schema";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      console.log("Form data:", data);
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        {/* Username */}
        <label className="block text-gray-300" htmlFor="username">
          Username
          <span className="ml-0.5 text-sm font-medium text-red-500">*</span>
          <input
            id="username"
            type="text"
            placeholder="johnnyappleseed"
            className="input-field"
            aria-invalid={errors.username ? "true" : "false"}
            {...register("username")}
          />
          <p className="input-field-error">{errors.username?.message}</p>
        </label>
        {/* Password */}
        <label className="text-gray-300">
          Password
          <span className="ml-0.5 text-sm font-medium text-red-500">*</span>
          <input
            type="password"
            placeholder="********"
            className="input-field"
            {...register("password")}
          />
          <p className="input-field-error">{errors.password?.message}</p>
        </label>
        {/* Sign up */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Don&apos;t have an account?</span>
          <Link href="/signup" className="text-pink-500 underline">
            Sign Up
          </Link>
        </div>
        {/* Remember me */}
        <label className="flex w-full flex-row-reverse items-center justify-between text-gray-500">
          Remember me for 30 days
          <input
            type="checkbox"
            className="rounded-sm"
            defaultChecked
            {...register("rememberMe")}
          />
        </label>
        <button
          type="submit"
          className="rounded-md bg-pink-500 px-6 py-2 font-medium text-white shadow-md"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
