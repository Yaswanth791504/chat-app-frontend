import { IconButton, Input } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { useParams } from "react-router-dom";
import { sendMessageToUser } from "../services/user";

const MessageInput = () => {
  const [openEmojiPicker, setEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState("");

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  function handleEmojis(emojis) {
    setMessage(message + emojis.emoji);
  }

  function handelEmojiPicker() {
    setEmojiPickerOpen((state) => !state);
  }

  const queryClient = useQueryClient();

  const { id } = useParams();

  const { mutate: sendMessage } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: () => sendMessageToUser(message, id),
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleOnSubmitMessage(e) {
    e.preventDefault();
    sendMessage();
  }

  return (
    <form
      onSubmit={handleOnSubmitMessage}
      style={{ display: "flex", width: "100%", height: "100%", gap: "10px" }}
    >
      <EmojiPicker
        onEmojiClick={handleEmojis}
        open={openEmojiPicker}
        style={{ position: "absolute", right: "25px", bottom: "100px" }}
      />
      <Input
        value={message}
        onChange={handleMessage}
        style={{
          height: "4rem",
          borderRadius: "20px",
          backgroundColor: "white",
          border: "none",
          outline: "none",
          boxShadow: "var(--box-shadow)",
        }}
        placeholder="Write Messages..."
        size="lg"
      />
      <IconButton
        onClick={handelEmojiPicker}
        height="100%"
        width="5rem"
        fontSize="2rem"
        color="var(--blue)"
        colorScheme="blue"
        borderRadius="20px"
        variant="outline"
        aria-label="Send email"
        boxShadow="var(--box-shadow)"
        icon={<MdEmojiEmotions />}
      />
      <IconButton
        height="100%"
        width="5rem"
        borderRadius="20px"
        fontSize="1.5rem"
        colorScheme="orange"
        aria-label="Call Segun"
        boxShadow="var(--box-shadow)"
        icon={<BsFillSendFill />}
      />
    </form>
  );
};

export default MessageInput;
