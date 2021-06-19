import { Request, Response } from "express";
import { SendChallengeService } from "../services/SendChallengeService";

const sendChallenge = new SendChallengeService();

export class SendChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      repository_url,
      challenge_slug,
      difficulty,
      technology,
      template_url,
    } = request.body;

    try {
      await sendChallenge.execute({
        user_id,
        repository_url,
        challenge_slug,
        difficulty,
        technology,
        template_url,
      });
    
      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}