import { Button } from "@aws-amplify/ui-react";
import Head from "next/head";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../amplify/data/resource";
import AutoForm from "@/components/AutoForm";
import LinksCreateForm from "../../ui-components/LinksCreateForm";
import LinksUpdateForm from "../../ui-components/LinksUpdateForm";
import NodeCreateForm from "../../ui-components/NodeCreateForm";
import NodeUpdateForm from "../../ui-components/NodeUpdateForm";
import NodeLinkCreateForm from "../../ui-components/NodeLinkCreateForm";
import NodeLinkUpdateForm from "../../ui-components/NodeLinkUpdateForm";

const client = generateClient<Schema>();

export default function Home() {
  const test = async () => {
    const { data } = await client.models.Node.list({});
    console.log(await data[0].targetNodes());

    console.log(
      await client.models.NodeLink.create({
        category: "test",
        sourceId: "c18fef54-d44e-4a4a-b031-297ce2136abd",
        targetId: "8a94072d-0cd1-4912-b35d-ea475893db92",
      })
    );
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
        keyName="nodeLinkKey"
        CreateForm={NodeLinkCreateForm}
        UpdateForm={NodeLinkUpdateForm}
        listClient={() => client.models.NodeLink.list()}
        deleteClient={(id: string) => client.models.NodeLink.delete({ id })}
      />
    </>
  );
}
