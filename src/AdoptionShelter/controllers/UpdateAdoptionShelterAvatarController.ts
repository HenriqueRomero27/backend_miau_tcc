import { Request, Response } from "express";
import UpdateAdoptionShelterAvatarService from "../services/UpdateAdotionShelterAvatarService";

export default class AdoptionShelterAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateAdoptionShelterAvatarService();

    const adoptionShelter = await updateAvatar.execute({
      adoptionShelter_id: request.params.id, // Supondo que o ID vem da URL
      avatarFilename: request.file?.filename as string,
    });

    return response.json(adoptionShelter);
  }
}
