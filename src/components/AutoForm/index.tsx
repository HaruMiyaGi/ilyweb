import {
  Alert,
  Button,
  Card,
  Collection,
  Flex,
  Loader,
  Text,
} from "@aws-amplify/ui-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../amplify/data/resource";
import { IconEdit, IconEditOff, IconTrash } from "@tabler/icons-react";
import { ClientSchema } from "@aws-amplify/backend";

interface IParams {
  // client: V6Client<Schema>;
  keyName: string;
  CreateForm: any;
  UpdateForm: any;
  listClient: any;
  deleteClient: any;
}

export default ({ ...params }: IParams) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [`${params.keyName}`],
    queryFn: async () => {
      const { data } = await params.listClient();
      return !data ? null : data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await params.deleteClient(id);
      return data;
    },
    // When mutate is called:
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [`${params.keyName}`, id] });
      await queryClient.cancelQueries({ queryKey: [`${params.keyName}`] });

      // Snapshot the previous value
      const prevData = queryClient.getQueryData([`${params.keyName}`, id]);

      // Optimistically update to the new value
      if (prevData) {
        queryClient.setQueryData([`${params.keyName}`, id], id);
      }

      // Return a context with the previous and new realEstateProperty
      return { prevData, id };
    },
    // If the mutation fails, use the context we returned above
    onError: (err, data, context) => {
      console.error("Error deleting record:", err, data);
      if (context?.prevData) {
        queryClient.setQueryData(
          [`${params.keyName}`, context.id],
          context.prevData
        );
      }
    },
    // Always refetch after error or success:
    onSettled: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [`${params.keyName}`, data.id],
        });
        queryClient.invalidateQueries({ queryKey: [`${params.keyName}`] });
      }
    },
  });

  const [editItemId, setEditItemId] = useState<string | null>();

  return (
    <>
      <params.CreateForm
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: [`${params.keyName}`] });
        }}
        onError={() => {
          queryClient.invalidateQueries({ queryKey: [`${params.keyName}`] });
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
            <Collection key={params.keyName} items={data!} type="list">
              {(item: { id: string }, index) => (
                <Card key={`${params.keyName}-${index}`}>
                  <Flex alignItems={"center"}>
                    <pre style={{ flex: 1 }}>
                      {JSON.stringify(item, null, 2)}
                    </pre>

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
                    <params.UpdateForm
                      id={item.id}
                      onSuccess={() => {
                        queryClient.invalidateQueries({
                          queryKey: [`${params.keyName}`],
                        });
                        setEditItemId(null);
                      }}
                      onError={() => {
                        queryClient.invalidateQueries({
                          queryKey: [`${params.keyName}`],
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
};
