/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginuser } from "../authentication/authenticateUser";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginuser,
    onSuccess: (message) => {
      navigate("/mine/chats");
      return toast({
        title: message.message,
        status: "success",
        isClosable: true,
      });
      // return toast
    },
    onError: (err) => {
      return toast({
        title: err.message,
        status: "error",
        isClosable: true,
      });
      // return toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isRequired
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          name="email"
          required={false}
          {...register("email", {
            required: {
              value: true,
              message: "Please enter your email",
            },
          })}
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            {...register("password")}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="orange"
          style={{ marginTop: "2rem", width: "10rem", marginLeft: "auto" }}
          type="submit"
          variant="solid"
          disabled={isPending}
        >
          Log in
        </Button>
      </FormControl>
    </form>
  );
}

export default LoginPage;
