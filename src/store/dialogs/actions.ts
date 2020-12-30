export const OPEN_MODAL_ACTION = 'modal/OPEN';
export const CLOSE_MODAL_ACTION = 'modal/CLOSE';
export const RESET_STORE = 'reset/all';

export const DIALOG_PRESENTATION = 'DIALOG_PRESENTATION';
export const DIALOG_GOVERNANCE_RULES_OF_PROPOSAL =
  'DIALOG_GOVERNANCE_RULES_OF_PROPOSAL';
export const DIALOG_GOVERNANCE_PROJECT_CREATED =
  'DIALOG_GOVERNANCE_PROJECT_CREATED';

export type KnownModal =
  | typeof DIALOG_PRESENTATION
  | typeof DIALOG_GOVERNANCE_RULES_OF_PROPOSAL
  | typeof DIALOG_GOVERNANCE_PROJECT_CREATED;

export const openModalAction = (modal: KnownModal) => ({
  type: OPEN_MODAL_ACTION,
  payload: modal,
});

export const closeModalAction = () => ({ type: CLOSE_MODAL_ACTION });

export const openPresentationModal = () => openModalAction(DIALOG_PRESENTATION);
export const openGovernanceRulesOfProposalModal = () =>
  openModalAction(DIALOG_GOVERNANCE_RULES_OF_PROPOSAL);
export const openGovernanceProjectCreatedModal = () =>
  openModalAction(DIALOG_GOVERNANCE_PROJECT_CREATED);
