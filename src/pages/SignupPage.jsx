/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser } from "./../authentication/authenticateUser.js";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (message) => {
      reset();
      return toast({
        title: message + ", login to continue",
        status: "success",
        isClosable: true,
      });
    },
    onError: (err) => {
      return toast({
        title: err.message,
        status: "error",
        isClosable: true,
      });
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    setIsLoading(true);
    console.log(event);
    mutate(event);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isRequired
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          required={false}
          name="name"
          id="name"
          type="text"
          {...register("name")}
          disabled={isLoading}
        />
        <FormLabel htmlFor="emailAddress">Email</FormLabel>
        <Input
          required={false}
          name="email"
          id="emailAddress"
          type="email"
          {...register("email")}
          disabled={isLoading}
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          required={false}
          name="password"
          id="SignUpPassword"
          type="password"
          {...register("password")}
          disabled={isLoading}
        />
        <FormLabel htmlFor="conformPassword">Conform Password</FormLabel>
        <Input
          required={false}
          name="conformPassword"
          id="conformPassword"
          type="password"
          {...register("passwordConfirmation")}
          disabled={isLoading}
        />
        <label
          htmlFor="profileImage"
          style={{
            cursor: "pointer",
            marginTop: "1rem",
            border: "1px solid black",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          Upload profile picture
        </label>
        <input
          id="profileImage"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => console.log(e.target.files)}
          {...register("profileImage")}
          disabled={isLoading}
        />
        <Button
          colorScheme="orange"
          style={{ marginTop: "2rem", width: "10rem", marginLeft: "auto" }}
          type="submit"
          variant="solid"
          isLoading={isLoading}
          loadingText="creating"
        >
          Sign up
        </Button>
      </FormControl>
    </form>
  );
}

export default SignUpPage;
