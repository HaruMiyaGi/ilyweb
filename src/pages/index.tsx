import {
  Alert,
  Button,
  Card,
  Collection,
  Flex,
  Loader,
  Text,
} from "@aws-amplify/ui-react";
import Head from "next/head";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../amplify/data/resource";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import TodoCreateForm from "../../ui-components/TodoCreateForm";
import { IconEdit, IconEditOff, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import TodoUpdateForm from "../../ui-components/TodoUpdateForm";

const client = generateClient<Schema>();

export default function Home() {
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["todoKey"],
    queryFn: async () => {
      const { data } = await client.models.Todo.list();
      return !data ? null : data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await client.models.Todo.delete({ id });
      return data;
    },
    // When mutate is called:
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todoKey", id] });
      await queryClient.cancelQueries({ queryKey: ["todoKey"] });

      // Snapshot the previous value
      const prevData = queryClient.getQueryData(["todoKey", id]);

      // Optimistically update to the new value
      if (prevData) {
        queryClient.setQueryData(["todoKey", id], id);
      }

      // Return a context with the previous and new realEstateProperty
      return { prevData, id };
    },
    // If the mutation fails, use the context we returned above
    onError: (err, data, context) => {
      console.error("Error deleting record:", err, data);
      if (context?.prevData) {
        queryClient.setQueryData(["todoKey", context.id], context.prevData);
      }
    },
    // Always refetch after error or success:
    onSettled: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["todoKey", data.id] });
        queryClient.invalidateQueries({ queryKey: ["todoKey"] });
      }
    },
  });

  const [editItemId, setEditItemId] = useState<string | null>();

  return (
    <>
      <Head>
        <title>ilyweb</title>
        <meta name="description" content="ilyweb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoCreateForm
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["todoKey"] });
        }}
        onError={() => {
          queryClient.invalidateQueries({ queryKey: ["todoKey"] });
        }}
      />

      {isLoading ? (
        <Loader variation="linear" />
      ) : (
        <>
          {isError && (
            <Alert variation="error">
              <Text>Unexpected Error</Text>
            </Alert>
          )}

          {isSuccess && (
            <Collection items={data!} type="list">
              {(item, index) => (
                <Card key={index}>
                  <Flex alignItems={"center"}>
                    <Text flex={1}>{item.content}</Text>

                    {editItemId === item.id ? (
                      <Button //
                        size="small"
                        gap={"0.3rem"}
                        colorTheme="info"
                        onClick={() => setEditItemId(null)}
                      >
                        <IconEditOff />
                        Cancel
                      </Button>
                    ) : (
                      <Button //
                        size="small"
                        gap={"0.3rem"}
                        colorTheme="info"
                        onClick={() => setEditItemId(item.id)}
                        disabled={
                          editItemId === item.id || deleteMutation.isPending
                        }
                      >
                        <IconEdit />
                        Edit
                      </Button>
                    )}

                    <Button
                      size="small"
                      gap={"0.3rem"}
                      colorTheme="warning"
                      onClick={() => deleteMutation.mutate(item.id)}
                      disabled={
                        editItemId === item.id || deleteMutation.isPending
                      }
                    >
                      <IconTrash />
                      Remove
                    </Button>
                  </Flex>

                  {editItemId === item.id && (
                    <TodoUpdateForm
                      id={item.id}
                      onSuccess={() => {
                        queryClient.invalidateQueries({
                          queryKey: ["todoKey"],
                        });
                        setEditItemId(null);
                      }}
                      onError={() => {
                        queryClient.invalidateQueries({
                          queryKey: ["todoKey"],
                        });
                        setEditItemId(null);
                      }}
                    />
                  )}
                </Card>
              )}
            </Collection>
          )}
        </>
      )}
    </>
  );
}
