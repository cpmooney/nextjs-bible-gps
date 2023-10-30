"use client";
import { Card } from "@/models/card";
import {trpc} from "../utilities/trpc";
import CardComponent from "app/card-component";

const ShowDeckResponse = (cards: Card[]) => {
  return (
    <div>
      {cards.map((card) => (
        <CardComponent props={card} />
      ))}
    </div>
  );
};

const Home = () => {
  const {data} = trpc.dbLoadAllProcedure.useQuery({});
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>

    </div>
  );
};

export default trpc.withTRPC(Home);
