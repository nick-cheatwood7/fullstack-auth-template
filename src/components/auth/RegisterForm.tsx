import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { RegisterInput } from "../../schema/auth.schema";
import { registerSchema } from "../../schema/auth.schema";
import { api } from "../../utils/api";

export default function RegisterForm() {
  const router = useRouter();
  const mutation = api.auth.register.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      console.log("Form data:", data);
      const res = await mutation.mutateAsync({
        ...data,
      });
      console.log(res);
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
        className="flex flex-col space-y-4 rounded-md bg-gray-800 p-6"
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
        {/* Confirm Password */}
        <label className="text-gray-300">
          Confirm Password
          <span className="ml-0.5 text-sm font-medium text-red-500">*</span>
          <input
            type="password"
            placeholder="********"
            className="input-field"
            {...register("confirmPassword")}
          />
          <p className="input-field-error">{errors.confirmPassword?.message}</p>
        </label>
        {/* Log In */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Already have an account?</span>
          <Link href="/login" className="text-pink-500 underline">
            Log In
          </Link>
        </div>
        <button type="submit" className="button-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
