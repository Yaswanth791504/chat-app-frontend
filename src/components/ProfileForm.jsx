/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { updateUserProfileInfo } from "../services/user";

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  align-self: flex-end;
  width: 40rem;
  height: 23rem;
  margin-right: 2rem;
  padding: 10px;
`;

const FormDiv = styled.div`
  width: 20rem;
`;

const ProfileForm = ({ user = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const toast = useToast();

  const { mutate: updateUserForm } = useMutation({
    mutationKey: ["updatUser"],
    mutationFn: updateUserProfileInfo,
    onSuccess: (message) => {
      reset();
      toast({
        title: message.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <Form onSubmit={handleSubmit(updateUserForm)}>
      <FormGroup>
        <FormDiv>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            style={{
              color: "blue",
            }}
            type="text"
            disabled
            id="name"
            defaultValue={user && user?.name}
          />
        </FormDiv>
        <FormDiv>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            style={{
              color: "blue",
            }}
            type="email"
            id="email"
            disabled
            defaultValue={user && user?.email}
          />
        </FormDiv>
      </FormGroup>
      <FormGroup>
        <FormDiv>
          <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
          <Input
            type="password"
            id="currentPassword"
            {...register("currentPassword", {
              required: "You must specify a password",
            })}
          />
        </FormDiv>
      </FormGroup>
      <FormGroup>
        <FormDiv>
          <FormLabel htmlFor="newPassword">New Password</FormLabel>
          <Input
            type="password"
            id="newPassword"
            {...register("newPassword", {
              min: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
        </FormDiv>
        <FormDiv>
          <FormLabel htmlFor="newPasswordConformation">
            Confirm Password
          </FormLabel>
          <Input
            type="password"
            id="newPasswordConformation"
            {...register("passwordConfiramtion", {
              required: "Enter your password again",
              validate: (value) =>
                value === getValues("newPassword") ||
                "The passwords do not match",
            })}
          />
        </FormDiv>
      </FormGroup>
      <Button
        style={{ alignSelf: "end" }}
        variant="solid"
        colorScheme="orange"
        type="submit"
      >
        Save Changes
      </Button>
    </Form>
  );
};

export default ProfileForm;
