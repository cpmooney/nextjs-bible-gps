interface UpdateCitationFields {
  tags?: string[];
  fragment?: string;
}

export interface UpdateCitationRequest {
  id: number;
  changes: UpdateCitationFields;
}
