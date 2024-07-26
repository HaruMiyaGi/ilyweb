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
import { IconEdit, IconEditOff, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import AutoForm from "@/components/AutoForm";
import TodoCreateForm from "../../ui-components/TodoCreateForm";
import TodoUpdateForm from "../../ui-components/TodoUpdateForm";
import LinksCreateForm from "../../ui-components/LinksCreateForm";
import LinksUpdateForm from "../../ui-components/LinksUpdateForm";
import NodeCreateForm from "../../ui-components/NodeCreateForm";
import NodeUpdateForm from "../../ui-components/NodeUpdateForm";

const client = generateClient<Schema>();

export default function Home() {
  const test = async () => {
    await client.models.Links.create({
      sourceId: "c18fef54-d44e-4a4a-b031-297ce2136abd",
      targetId: "8a94072d-0cd1-4912-b35d-ea475893db92",
    });
  };

  return (
    <>
      <Head>
        <title>ilyweb</title>
        <meta name="description" content="ilyweb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button onClick={() => test()}>test</Button>

      <AutoForm
        keyName="nodeKey"
        CreateForm={NodeCreateForm}
        UpdateForm={NodeUpdateForm}
        listClient={() => client.models.Node.list()}
        deleteClient={(id: string) => client.models.Node.delete({ id })}
      />

      <AutoForm
        keyName="linkKey"
        CreateForm={LinksCreateForm}
        UpdateForm={LinksUpdateForm}
        listClient={() => client.models.Links.list()}
        deleteClient={(id: string) => client.models.Links.delete({ id })}
      />

      <AutoForm
        keyName="todoKey"
        CreateForm={TodoCreateForm}
        UpdateForm={TodoUpdateForm}
        listClient={() => client.models.Todo.list()}
        deleteClient={(id: string) => client.models.Todo.delete({ id })}
      />
    </>
  );
}
