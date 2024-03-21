"use client";
import {Citation} from "@/models/citation";
import {Fragment, useMemo} from "react";
import {PromptPreference} from "../providers/user-preference-provider";

interface Props {
  preference: PromptPreference;
  citation: Citation | null;
  userHasNoCards: boolean;
}

export default function Prompt({preference, citation, userHasNoCards}: Props) {
  const promptText = useMemo(() => {
    if (!userHasNoCards && citation) {
      switch (preference) {
        case "fragment-citation":
          return citation.fragment.split("/");
        case "entire-citation":
          return [citation.entire];
      }
    }
    return ["", ""];
  }, [citation, preference, userHasNoCards]);

  const promptTextAlign = useMemo(() => {
    switch (preference) {
      case "fragment-citation":
        return "text-center";
      case "entire-citation":
        return "text-left";
    }
  }, [preference]);

  const promptTextSize = useMemo(() => {
    switch (preference) {
      case "fragment-citation":
        const fragmentLength = citation?.fragment?.length ?? 0;
        if (fragmentLength <= 53) {
          return "text-2xl";
        }
        return "text-xl";
      case "entire-citation":
        const entireLength = citation?.entire?.length ?? 0;
        if (entireLength <= 100) {
          return "text-2xl";
        }
        return "text-xl";
    }
  }, [citation, preference]);

  const promptHeight = useMemo(() => {
    switch (preference) {
      case "fragment-citation":
        return "h-16";
      case "entire-citation":
        return "h-64";
    }
  }, [preference]);

  const fadeNearBottom = useMemo(() => {
    switch (preference) {
      case "fragment-citation":
        return "fade-out";
      case "entire-citation":
        return "";
    }
  }, [preference]);

  return (
    <>
      <h2
        className={`${promptTextSize} ${promptHeight} ${promptTextAlign} mb-2 ${fadeNearBottom}`}
        style={{overflow: "hidden", textOverflow: "ellipsis"}}
      >
        {promptText.map((text, index) => (
          <Fragment key={index}>
            {text}
            {index !== text.length - 1 && <br />}
          </Fragment>
        ))}
      </h2>
    </>
  );
}
