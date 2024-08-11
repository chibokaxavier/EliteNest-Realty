import { UserFormValidation } from "lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const CreateUser = () => {
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async ({
    name,
    email,
    password,
  }: z.infer<typeof UserFormValidation>) => {};
  return <div></div>;
};

export default CreateUser;
