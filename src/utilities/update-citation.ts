import {Citation} from "../models/citation";

interface UpdateCitationFields {
  tags?: string[];
  fragment?: string;
}

export interface UpdateCitationRequest {
  id: number;
  changes: UpdateCitationFields;
}

export const updateCitation = (
  citation: Citation,
  request: UpdateCitationFields
): Citation => {
  if (request.tags) {
    citation.tags = request.tags;
  }
  if (request.fragment) {
    citation.fragment = request.fragment;
  }
  return citation;
};
