
export interface TodoForm {
    idTache?: number;
    titreTache?: string | undefined | null;
    descriptionTache?: string | undefined | null;
    dateTache?: string | Date | undefined;
    isComplete?: boolean;
}
