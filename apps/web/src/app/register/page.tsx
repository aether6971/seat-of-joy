"use client";
import Link from "next/link";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Header } from "../../components/header";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { graphql } from "../../gql";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RegisterMutationVariables } from "../../gql/graphql";
import { GQLClient } from "../../lib/query";
import { registerSchema } from "../../lib/validation/register";
import { useToast } from "../../components/ui/use-toast";

const registerMutation = graphql(`
  mutation Register($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      response {
        success
        errors {
          code
          path
          message
        }
      }
    }
  }
`);

type FormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const [userData, setUserData] = useState<RegisterMutationVariables>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ["register", userData],
    queryFn: async () => GQLClient.request(registerMutation, userData!),
    refetchOnWindowFocus: false,
    enabled: refetch,
  });

  const onSubmit = async (formdata: FormData, e: SubmitEvent) => {
    e.preventDefault();
    setUserData(formdata);
    setRefetch(true);
    console.log(data?.register.response.success);
    if (data?.register.response.success) {
      toast({
        title: "Register Successful",
        description: "Check your mail and verify your account.",
      });
    } else {
      data?.register.response.errors?.forEach((er) => {
        if (!["Email", "Password", "Username"].includes(er.path)) {
          toast({
            title: `${er.path} error`,
            description: er.message,
          });
        }
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
              {!data?.register.response.success &&
                data?.register.response.errors?.map(
                  (err, i) =>
                    err.path == "Email" && (
                      <p className="px-1 text-xs text-red-600" key={i}>
                        {err.message}
                      </p>
                    )
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                required
                {...register("username")}
              />
              {errors?.username && (
                <p className="px-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
              {!data?.register.response.success &&
                data?.register.response.errors?.map(
                  (err, i) =>
                    err.path == "Username" && (
                      <p className="px-1 text-xs text-red-600" key={i}>
                        {err.message}
                      </p>
                    )
                )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
              {!data?.register.response.success &&
                data?.register.response.errors?.map(
                  (err, i) =>
                    err.path == "Password" && (
                      <p className="px-1 text-xs text-red-600" key={i}>
                        {err.message}
                      </p>
                    )
                )}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/google`);
              }}
            >
              Sign Up with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col w-full h-screen justify-start items-center">
      <Header invisible={false} sticky={false} />
      <div className="mt-16 w-2/5">
        <RegisterForm />
        {/* <CreateUserForm/> */}
      </div>
    </div>
  );
}
