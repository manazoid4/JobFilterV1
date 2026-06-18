export const CLAUDE_DOCUMENT_ATOM_INSTRUCTIONS = {
  model: 'claude-sonnet-4-6',
  purpose: 'High-volume planning document classification into JobFilter opportunity atoms.',
  output: {
    type: 'json',
    schema: {
      opportunityAtoms: [
        {
          trade: 'building | roofing | electrical | hvac | plumbing | carpentry | landscaping | painting',
          atomType: 'extension | loft_dormer | roof_works | solar_ev | ashp_hvac | glazing_windows_doors | drainage_groundworks | tree_fencing_landscaping | hmo_fire_alarm_eicr | commercial_fit_out',
          evidenceText: 'short exact source phrase that proves the atom',
          sourceDocumentUrl: 'document URL supplied with the source record',
          confidence: '0..1',
          estimatedValueImpact: 'integer GBP estimate',
          urgencyImpact: '0..10',
        },
      ],
    },
  },
  rules: [
    'Return JSON only.',
    'Create no atom without source evidence text.',
    'Escalate to a more capable Claude model only when the document is too complex, scanned, or internally inconsistent.',
    'Prefer trade-specific atoms over generic construction labels.',
    'Keep evidenceText under 180 characters.',
  ],
};
