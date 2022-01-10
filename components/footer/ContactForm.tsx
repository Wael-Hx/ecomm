import React, { useState } from "react";
import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import FormControl from "../ui/form/FormControl";
import { BiMailSend } from "react-icons/bi";
import { RiMailCloseLine } from "react-icons/ri";
import { MdMarkEmailRead } from "react-icons/md";

interface Status {
  clrScheme: "white" | "green" | "red";
  loading: boolean;
  error: boolean;
}
interface FormData {
  email: string;
  message: string;
}
const initialFormData: FormData = {
  email: "",
  message: "",
};
const initialStatus: Status = {
  clrScheme: "white",
  loading: false,
  error: false,
};

const ContactFrom = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<Status>(initialStatus);

  const onFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!status.loading && status.clrScheme !== "white") {
      setStatus(initialStatus);
    }
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.loading || status.clrScheme !== "white") {
      return;
    }
    setStatus({ clrScheme: "white", loading: true, error: false });
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT!, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          text: formData.message.trim(),
          sender: formData.email.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();

      setStatus({
        clrScheme: "green",
        loading: false,
        error: false,
      });
    } catch (err) {
      console.log(err);
      setStatus({
        clrScheme: "red",
        error: true,
        loading: false,
      });
    } finally {
      if (!status.error) setFormData(initialFormData);
    }
  };

  return (
    <Box
      as="form"
      width="100%"
      height="100%"
      display="flex"
      flexDir="column"
      alignItems="start"
      onSubmit={onFormSubmit}
    >
      <FormControl marginTop="1rem" id="email" labelTitle="Email">
        <Input
          onChange={onFormDataChange}
          name="email"
          type="email"
          value={formData.email}
          placeholder="email"
          required
          aria-required
          variant="flushed"
          w="100%"
        />
      </FormControl>
      <FormControl marginTop="1rem" id="message" labelTitle="Message">
        <Textarea
          onChange={onFormDataChange}
          name="message"
          placeholder="message"
          value={formData.message}
          required
          aria-required
          rows={5}
          variant="flushed"
          w="100%"
        />
      </FormControl>

      <Button
        marginTop="1rem"
        fontFamily="Raleway"
        disabled={status.loading || status.clrScheme !== "white"}
        colorScheme={status.clrScheme}
        type="submit"
        isLoading={status.loading}
        variant="outline"
        minW={{
          base: "100%",
          md: "40%",
        }}
        _disabled={{
          pointerEvents: "none",
          cursor: "not-allowed",
        }}
        rightIcon={
          status.clrScheme === "green" ? (
            <MdMarkEmailRead />
          ) : status.clrScheme === "red" ? (
            <RiMailCloseLine />
          ) : (
            <BiMailSend />
          )
        }
      >
        {status.loading ? "Sending" : status.clrScheme === "green" ? "Sent" : "Send"}
      </Button>
      {status.error && (
        <Text fontFamily="Montserrat" fontSize="sm" as="em">
          messages are not available for the moment{" "}
        </Text>
      )}
    </Box>
  );
};

export default ContactFrom;
