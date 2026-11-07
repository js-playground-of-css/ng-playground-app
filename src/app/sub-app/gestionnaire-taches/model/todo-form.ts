
export interface TodoForm {
    idTache?: number;
    titreTache?: string | undefined | null;
    descriptionTache?: string | undefined | null;
    dateTache?: Date | undefined;
    isComplete?: boolean;
}
