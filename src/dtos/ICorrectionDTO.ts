import { IDifficultyDTO } from "./IDifficultyDTO";

export interface ICorrectionDTO {
  user_id: string;
  challenge_slug: string;
  difficulty: IDifficultyDTO;
  technology: string;
  repository_url: string;
  template_url: string;
}
