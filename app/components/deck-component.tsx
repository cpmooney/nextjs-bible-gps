"use client";
import CardComponent from "./card-component";
import "./globals.css";
import ScoreComponent from "./score";
import { AdditionalActionComponents } from "./additional-actions";

export const DeckComponent = () => {
  return (
    <div>
    <CardComponent />
    <ScoreComponent />
    <AdditionalActionComponents />
    </div>
    );
  };

 